/**
 * PRODUCT MODAL
 */

const db = require('../helpers/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageURL, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageURL, this.description]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findProductById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  static deleteProductById(id) {}
};
