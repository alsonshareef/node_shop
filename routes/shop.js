const path = require('path');

const rootDir = require('../helpers/root_dir');

const express = require('express');
const router = express.Router();

// User homepage of shop route
router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
