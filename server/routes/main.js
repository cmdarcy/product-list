import { Router } from 'express';
import faker from 'faker';
import Product from '../models/product.js';

const router = Router();

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i += 1) {
    const product = new Product();
    const fakeStarterReview = {
      userName: faker.internet.userName(),
      text: 'Fake review text',
    };

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';
    product.reviews = [fakeStarterReview];

    product.save().then((__, err) => {
      if (err) {
        throw err;
      }
    });
  }
  res.end();
});

router.get('/products', (req, res, next) => {
  const perPage = 9;
  let { page = 1, category, price, query } = req.query;

  const dbQuery = Product.find();

  if (category) {
    dbQuery.find({ category });
  }

  if (price) {
    if (price === 'highest') {
      dbQuery.sort({ price: 'desc' });
    } else if (price === 'lowest') {
      dbQuery.sort({ price: 'asc' });
    } else {
      throw new Error('Price query must be "highest" or "lowest"');
    }
  }

  if (query) {
    dbQuery.find({ name: { $regex: query, $options: 'i' } });
  }

  Product.countDocuments(dbQuery.getQuery())
    .then((totalProducts) => {
      const maxPage = Math.ceil(totalProducts / perPage);
      if (page > maxPage && maxPage !== 0) {
        page = maxPage;
      }
      const skip = (page - 1) * perPage;

      return Product.distinct('category').then((categories) =>
        dbQuery
          .skip(skip)
          .limit(perPage)
          .exec()
          .then((dbProducts) => {
            res.status(200).send({
              products: dbProducts,
              pagination: {
                currentPage: page,
                totalPages: maxPage,
                totalProducts,
                perPage,
              },
              categories,
            });
          }),
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(`Unable to get products: ${err.message}`);
    });
});

router.get('/products/:product', (req, res, next) => {
  const { product } = req.params;
  Product.findById(product)
    .exec()
    .then((dbProduct) => {
      if (!dbProduct) {
        throw new Error('Product not found');
      }
      res.status(200).send(dbProduct);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send({ error: `Failed to get product: ${err.message}` });
    });
});

router.get('/products/:product/reviews', (req, res, next) => {
  const perPage = 4;
  let { page = 1 } = req.query;

  const { product } = req.params;
  Product.findById(product, 'reviews')
    .exec()
    .then((dbProduct) => {
      if (!dbProduct) {
        throw new Error('Product not found');
      }
      const totalReviews = dbProduct.reviews.length;
      const maxPage = Math.ceil(totalReviews / perPage);
      if (page > maxPage) {
        page = maxPage;
      }
      const skipNum = (page - 1) * perPage;

      res.status(200).send({
        products: dbProduct.reviews.slice(skipNum, skipNum + perPage),
        pagination: {
          currentPage: page,
          totalPages: maxPage,
          totalReviews,
          perPage,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send({ error: `Failed to get product: ${err.message}` });
    });
});

router.post('/products', (req, res, next) => {
  // ? Validate with schema or using zod
  // ? Validate if product already exists in db
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ error: 'Failed to supply product in body of request' });
  }
  const product = req.body;
  const newProduct = new Product(product);
  newProduct
    .save()
    .then((doc) => {
      console.log('Product saved successfully');
      res.status(201).send(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: 'Failed to save product to database' });
    });
});

router.post('/products/:product/reviews', (req, res, next) => {
  // ? Validate if review already exists in db
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ error: 'Failed to supply review in body of request' });
  }
  const review = req.body;
  const { product } = req.params;

  Product.findById(product)
    .exec()
    .then((dbProduct) => {
      if (!dbProduct) {
        throw new Error('Product not found');
      }
      dbProduct.reviews.push(review);
      return dbProduct.save();
    })
    .then((updatedProduct) => {
      console.log('Review saved successfully');

      const newReview =
        updatedProduct.reviews[updatedProduct.reviews.length - 1];
      res.status(201).send(newReview);
    })
    .catch((err) => {
      console.error(err);
      if (err.message === 'Product not found') {
        return res
          .status(404)
          .send({ error: 'Failed to find product in database' });
      }

      res.status(500).send({ error: 'Failed to save review to database' });
    });
});

router.delete('/products/:product', (req, res, next) => {
  const { product } = req.params;
  Product.findByIdAndDelete(product)
    .exec()
    .then((dbProduct) => {
      if (!dbProduct) {
        throw new Error('Product not found');
      }
      console.log('Product deleted successfully');
      res.status(200).send(dbProduct);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(404)
        .send({ error: `Failed to delete product: ${err.message}` });
    });
});

router.delete('/reviews/:review', (req, res, next) => {
  const { review } = req.params;
  Product.findOne({ 'reviews._id': review })
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error('Product not found');
      }

      product.reviews = product.reviews.filter(
        (rev) => !rev._id.equals(review),
      );
      return product.save();
    })
    .then((updatedProduct) => {
      console.log('Review deleted successfully');
      res.status(200).send(updatedProduct);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send({
        error: `Failed to delete review: ${err.message}`,
      });
    });
});

export default router;
