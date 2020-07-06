/**
 * PRODUCT MODAL
 */

const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/root_dir');

const productDataPath = path.join(rootDir, 'data', 'products.json');

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
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productDataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
