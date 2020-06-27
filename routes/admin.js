const path = require('path');

const rootDir = require('../helpers/root_dir');

const express = require('express');
const router = express.Router();

// Add product route
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// Post route for product at same path.
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
