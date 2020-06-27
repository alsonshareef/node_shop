const express = require('express');
const router = express.Router();

// User homepage of shop route
router.get('/', (req, res, next) => {
  res.send('<h1>Welcome to the Udemy Node Shop!</h1>');
});

module.exports = router;
