const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node_shop', 'root', 'Jibbly_123.', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
