/**
 * SHOP CONTROLLER METHODS
 */

const Product = require('../models/product');

// GET index page of shop.
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

// GET page display current products in store.
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
      path: '/products',
    });
  });
};

// GET shopping cart page.
exports.getCart = (req, res, next) => {
  res.render('shop/shopping-cart', {
    pageTitle: 'Shopping Cart',
    path: '/cart',
  });
};

// GET checkout page.
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
