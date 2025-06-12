const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Staff = require('./staff.model')(sequelize, Sequelize);
db.Product = require('./product.model')(sequelize, Sequelize);
db.Brand = require('./brand.model')(sequelize, Sequelize);
db.Category = require('./category.model')(sequelize, Sequelize);
db.Inventory = require('./inventory.model')(sequelize, Sequelize);
db.StockMovement = require('./stock_movements.model')(sequelize, Sequelize);
db.StockMovementItem = require('./stock_movement_items.model')(sequelize, Sequelize);

// Thiết lập associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;