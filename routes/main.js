const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save().then((__, err) => {
        if (err) {
            throw err
        }
    })
  }
  res.end();
});

router.get("/products", (req, res, next) => {
    const perPage = 9
    let {page} = req.query 
    if (!page) {
        page = 1
    }
    const skipNum = (page - 1) * perPage
    Product.find().skip(skipNum).limit(perPage).exec().then((products) => {
      res.send(products)
    });
  });

module.exports = router;