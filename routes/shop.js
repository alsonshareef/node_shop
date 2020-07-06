const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// GET index Page.
router.get('/', shopController.getIndex);

// GET products page.
router.get('/products', shopController.getProducts);

// GET items currently added to shopping cart.
router.get('/cart', shopController.getCart);

// GET orders page.
router.get('/orders', shopController.getOrders);

// GET checkout page for purchasing items in shopping cart.
router.get('/checkout', shopController.getCheckout);

module.exports = router;
