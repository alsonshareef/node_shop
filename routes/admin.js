const path = require('path');

const express = require('express');

const productController = require('../controllers/products');

const router = express.Router();

// GET add product page.
router.get('/add-product', productController.getAddProduct);

// POST new product.
router.post('/add-product', productController.postAddProduct);

module.exports = router;
