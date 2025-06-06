const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Staff = require('./staff.model')(sequelize, Sequelize);
db.Product = require('./product.model')(sequelize, Sequelize);
db.Brand = require('./brand.model')(sequelize, Sequelize);

module.exports = db;