const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');

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
  // ? paginate based on mongoose chain operators or promise result logic???
  const perPage = 9;
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  let skipNum;
  Product.find()
    // .skip(skipNum)
    // .limit(perPage)
    .exec()
    .then((dbProducts) => {
      const maxPage = Math.ceil(dbProducts.length / perPage);
      if (maxPage < page) {
        skipNum = (maxPage - 1) * perPage;
      } else {
        skipNum = (page - 1) * perPage;
      }
      res.status(200).send(dbProducts.slice(skipNum, skipNum + perPage));
      return res.end();
    });
});

router.get('/products/:product', (req, res, next) => {
  const { product } = req.params;
  Product.findById(product)
    .exec()
    .then((dbProduct) => {
      res.status(200).send(dbProduct);
      return res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: 'Failed to find product in database' });
      return res.end();
    });
});

router.get('/products/:product/reviews', (req, res, next) => {
  const perPage = 4;
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  let skipNum;

  const { product } = req.params;
  Product.findById(product, 'reviews')
    .exec()
    .then((dbProduct) => {
      const maxPage = Math.ceil(dbProduct.reviews.length / perPage);
      if (maxPage < page) {
        skipNum = (maxPage - 1) * perPage;
      } else {
        skipNum = (page - 1) * perPage;
      }
      res.status(200).send(dbProduct.reviews.slice(skipNum, skipNum + perPage));
      return res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: 'Failed to find product in database' });
      return res.end();
    });
});

router.post('/products', (req, res, next) => {
  // ? Validate with schema or using zod
  // ? Validate if product already exists in db
  if (!req.body) {
    res
      .status(400)
      .send({ error: 'Failed to supply product in body of request' });
    return res.end();
  }
  const product = req.body;
  const newProduct = new Product(product);
  newProduct
    .save()
    .then((doc) => {
      res.status(201).send(doc);
      console.log('Product saved successfully');
      return res.end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: 'Failed to save product to database' });
      return res.end();
    });
});

module.exports = router;
