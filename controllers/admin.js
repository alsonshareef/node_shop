/**
 * ADMIN USER CONTROLLER METHODS
 */

const Product = require('../models/product');

// GET page to add a new product to store.
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

// GET admin version of page displaying current products in store.
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/admin-product-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin-product-list',
    });
  });
};

// POST new product to store.
exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/products');
};
