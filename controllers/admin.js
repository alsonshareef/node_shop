/**
 * ADMIN USER CONTROLLER METHODS
 */

const Product = require('../models/product');

// GET page to add a new product to store.
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

// POST new product to store.
exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.imageURL,
    req.body.description,
    req.body.price
  );
  product.save();
  res.redirect('/products');
};

// GET admin version of page displaying current products in store.
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/admin-product-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/admin-product-list',
    });
  });
};

// GET edit page for products that only admin can access.
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.findProductById(prodId, (product) => {
    if (!product) {
      res.redirect('/');
      console.log('The product you are trying to edit does not exist.');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: 'admin/edit-product',
      editing: editMode,
      product: product,
    });
  });
};

// POST new product to store.
exports.postEditProduct = (req, res, next) => {
  const editedProduct = new Product(
    req.body.productId,
    req.body.title,
    req.body.imageURL,
    req.body.description,
    req.body.price
  );
  editedProduct.save();
  res.redirect('/admin/admin-product-list');
};

// POST delete a product from the store..
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteProductById(prodId);
  res.redirect('/admin/admin-product-list');
};
