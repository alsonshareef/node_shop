const express = require('express');
const router = express.Router();

// Add product route
router.get('/add-product', (req, res, next) => {
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="product" /><button type="submit">Add product</button></form>'
  );
});

// Post route for product at same path.
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
