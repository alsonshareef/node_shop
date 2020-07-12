/**
 * SHOP CONTROLLER METHODS
 */

const Product = require('../models/product');
const Cart = require('../models/cart');

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

// GET page displaying current products in store.
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
      path: '/products',
    });
  });
};

// GET page displaying details of a selected product.
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductById(productId, (product) =>
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    })
  );
};

// GET shopping cart page.
exports.getCart = (req, res, next) => {
  res.render('shop/shopping-cart', {
    pageTitle: 'Shopping Cart',
    path: '/cart',
  });
};

// POST item to shopping cart.
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProductById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

// GET orders page.
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
};

// GET checkout page.
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
