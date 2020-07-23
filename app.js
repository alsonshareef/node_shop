const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const sequelize = require('./helpers/database');

app.set('view engine', 'ejs');
app.set('views', 'views');
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error 404
app.use(errorController.get404);

// Run server after Sequelize models have synced to the db and created their respective tables.
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
