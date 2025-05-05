import { Router } from 'express';
import faker from 'faker';
import Product, { reviewSchema, productSchema } from '../models/product.js';

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
      return res
        .status(400)
        .send({ error: 'Price query must be "highest" or "lowest"' });
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
      res.status(400).send({ error: `Unable to get products: ${err.message}` });
    });
});

router.get('/products/:product', (req, res, next) => {
  const { product } = req.params;
  Product.findById(product)
    .exec()
    .then((dbProduct) => {
      if (!dbProduct) {
        return res
          .status(404)
          .send({ error: 'Failed to find product in database' });
      }
      res.status(200).send(dbProduct);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: `Failed to get product: ${err.message}` });
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
        return res
          .status(404)
          .send({ error: 'Failed to find product in database' });
      }
      const totalReviews = dbProduct.reviews.length;
      const maxPage = Math.ceil(totalReviews / perPage);
      if (page > maxPage && maxPage !== 0) {
        page = maxPage;
      }
      const skipNum = (page - 1) * perPage;

      res.status(200).send({
        reviews: dbProduct.reviews.slice(skipNum, skipNum + perPage),
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
      res.status(500).send({ error: `Failed to get product: ${err.message}` });
    });
});

router.post('/products', (req, res, next) => {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({ error: 'Invalid product data' });
  }

  const product = req.body;

  Product.findOne({ name: product.name })
    .exec()
    .then((existingProduct) => {
      if (existingProduct) {
        return res.status(409).send({ error: 'Product name already exists' });
      }

      const newProduct = new Product(product);

      return newProduct.save().then((doc) => {
        console.log('Product saved successfully');
        res.status(201).send(doc);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: `Failed to save product: ${err.message}` });
    });
});

router.post('/products/:product/reviews', (req, res, next) => {
  const result = reviewSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({ error: 'Invalid review data' });
  }

  const review = req.body;
  const { product } = req.params;

  Product.findById(product)
    .exec()
    .then((dbProduct) => {
      if (!dbProduct) {
        return res
          .status(404)
          .send({ error: 'Failed to find product in database' });
      }
      if (
        dbProduct.reviews.some(
          (rev) => rev.userName === review.userName && rev.text === review.text,
        )
      ) {
        return res.status(409).send({ error: 'Review already exists' });
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
      res.status(500).send({ error: `Failed to add review: ${err.message}` });
    });
});

router.delete('/products/:product', (req, res, next) => {
  const { product } = req.params;
  Product.findByIdAndDelete(product)
    .exec()
    .then((dbProduct) => {
      if (!dbProduct) {
        return res
          .status(404)
          .send({ error: 'Failed to find product in database' });
      }
      console.log('Product deleted successfully');
      res.status(200).send(dbProduct);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send({ error: `Failed to delete product: ${err.message}` });
    });
});

router.delete('/reviews/:review', (req, res, next) => {
  const { review } = req.params;
  Product.findOne({ 'reviews._id': review })
    .exec()
    .then((product) => {
      if (!product) {
        return res
          .status(404)
          .send({ error: 'Failed to find product in database' });
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
      res.status(500).send({
        error: `Failed to delete review: ${err.message}`,
      });
    });
});

export default router;
