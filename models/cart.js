/**
 * SHOPPING CART MODAL
 */

const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/root_dir');

const productDataPath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
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
};
