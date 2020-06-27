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

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
