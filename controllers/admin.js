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
  const { title, imageURL, description, price } = req.body;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageURL: imageURL,
      description: description,
      userId: req.user.id,
    })
    .then(() => {
      console.log('Product created!');
      res.redirect('/admin/admin-product-list');
    })
    .catch((error) => console.log(error));
};

// GET admin version of page displaying current products in store.
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render('admin/admin-product-list', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/admin-product-list',
      });
    })
    .catch((err) => console.log(err));
};

// GET edit page for products that only admin can access.
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
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
    })
    .then((err) => console.log(err));
};

// POST new product to store.
exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageURL = req.body.imageURL;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.imageURL = updatedImageURL;
      product.description = updatedDescription;
      product.price = updatedPrice;
      return product.save();
    })
    .then((result) => {
      console.log('Updated product!');
      res.redirect('/admin/admin-product-list');
    })
    .catch((err) => console.log(err));
};

// POST delete a product from the store..
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => console.log('Deleted product'))
    .catch((err) => console.log(err));
  res.redirect('/admin/admin-product-list');
};
