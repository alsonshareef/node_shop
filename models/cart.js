/**
 * SHOPPING CART MODAL
 */

const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/root_dir');

const productDataPath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static getCart(callback) {
    fs.readFile(productDataPath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    // Fetch previous cart state.
    fs.readFile(productDataPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze cart to check if previous state of the cart holds the product already.
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add an extra quantity if product exists || Add a new product with quantity = 1.
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      // Update total price of the cart.
      cart.totalPrice = cart.totalPrice + +productPrice;

      // Save updated cart state.
      fs.writeFile(productDataPath, JSON.stringify(cart), (err) => {
        console.log(`Error: ${err}`);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(productDataPath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };

      // Find the product to be deleted object.
      const deletedProduct = updatedCart.products.find(
        (product) => product.id === id
      );

      // If deleted product can't be found in cart, exit the function.
      if (!deletedProduct) {
        return;
      }

      // Remove product from updatedCart and modify totalPrice accordingly
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * deletedProduct.qty;

      // Save updated cart state.
      fs.writeFile(productDataPath, JSON.stringify(updatedCart), (err) => {
        console.log(`Error: ${err}`);
      });
    });
  }
};
