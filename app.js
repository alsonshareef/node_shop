const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const sequelize = require('./helpers/database');
const Product = require('./models/product');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');
const PORT = process.env.PORT || 5000;

/**
 * MIDDLEWARE
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Stores the dummy user created or already existing from app init into the incoming request.
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

/**
 * ROUTES
 */
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error 404
app.use(errorController.get404);

/**
 * APP INIT
 */
// Establish entity relationships
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// Run server after Sequelize models have synced to the db and created their respective tables.
sequelize
  // .sync({ force: true }) // -- Run this if tables need to be reset.
  .sync()
  .then((result) => {
    // Find a user.
    return User.findByPk(1);
  })
  .then((user) => {
    // Create a new user if user doesn't already exist and return new user || return existing user.
    if (!user) {
      return User.create({
        firstName: 'Alson',
        lastName: 'Shareef',
        email: 'test@email.com',
      });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
