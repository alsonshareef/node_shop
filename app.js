const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error 404
app.use((req, res, next) => {
  res.status(404);
  res.send('<h1>Page does not exist.</h1>');
});

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
