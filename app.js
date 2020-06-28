const path = require('path');

const rootDir = require('./helpers/root_dir');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// Error 404
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(rootDir, 'views', '404.html'));
});

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
