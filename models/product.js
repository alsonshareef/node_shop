/**
 * PRODUCT MODAL
 */

const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/root_dir');

const productDataPath = path.join(rootDir, 'data', 'products.json');

const Cart = require('./cart');

// Retrieves JSON data of products and converts to object.
const getProductsFromFile = (callback) => {
  fs.readFile(productDataPath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(
          productDataPath,
          JSON.stringify(updatedProducts),
          (err) => {
            console.log(`Error: ${err}`);
          }
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(productDataPath, JSON.stringify(products), (err) => {
          console.log(`Error: ${err}`);
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findProductById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteProductById(id) {
    getProductsFromFile((products) => {
      // Product to be deleted
      const product = products.find((product) => product.id === id);

      // New set of products after product was deleted
      const updatedProducts = products.filter((product) => product.id !== id);

      // Update products json data with new updatedProducts and delete products from cart.
      fs.writeFile(productDataPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
        console.log(`Error: ${err}`);
      });
    });
  }
};
