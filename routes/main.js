const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    let fakeStarterReview = {userName: faker.internet.userName(), text: 'Fake review text'}

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [fakeStarterReview]

    product.save().then((__, err) => {
        if (err) {
            throw err
        }
    })
  }
  res.end();
});

router.get("/products", (req, res, next) => {
    //TODO check if page query is greater than number of pages needed for products, if so show last page
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

router.get("/products/:product", (req, res, next) => {
    //TODO send status codes with responses
    const {product} = req.params
    Product.findById(product).exec().then((product) => {
        res.send(product)
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    });
});

router.get("/products/:product/reviews", (req, res, next) => {
    //TODO send status codes with responses
    const perPage = 4
    let {page} = req.query 
    if (!page) {
        page = 1
    }
    let skipNum
    
    const {product} = req.params
    Product.findById(product, 'reviews').exec().then((product) => {
        const maxPage = Math.ceil(product.reviews.length / perPage)
        if (maxPage < page) {
            skipNum = (maxPage - 1) * perPage
        } else {
            skipNum = (page - 1) * perPage
      }
      res.send(product.reviews.slice(skipNum, skipNum + perPage))
      res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    });
  });

router.post('/products', (req, res, next) => {
    //TODO add status codes
    //? Validate with schema or using zod
    //? Validate if product already exists in db
    if (!req.body) {
        res.status(400).send({error: 'Failed to supply product in body of request'})
        return res.end()
    }
    const product = req.body
    const newProduct = new Product(product)
    newProduct.save().then(doc => {
        res.status(201).send(doc)
        console.log('Product saved successfully')
        return res.end()
    })
    .catch(err => {
        console.error(err)
        res.status(500).send({error: 'Failed to save product to database'})
        return res.end()
    })
})

module.exports = router;