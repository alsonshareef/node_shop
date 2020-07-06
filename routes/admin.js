const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// GET add product page.
router.get('/add-product', adminController.getAddProduct);

// GET admin version of products page.
router.get('/admin-product-list', adminController.getProducts);

// GET edit product page for admins.
router.get('/edit-product', adminController.getEditProduct);

// POST new product.
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
