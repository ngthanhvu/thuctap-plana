const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.Product = require('./product.model')(sequelize, Sequelize);
db.Brand = require('./brand.model')(sequelize, Sequelize);
db.ProductCategory = require('./product_category.model')(sequelize, Sequelize);
db.ProductImage = require('./product_image.model')(sequelize, Sequelize);
db.productVariant = require('./product_variant.model')(sequelize, Sequelize);
db.warehouse = require('./warehouse.model')(sequelize, Sequelize);
db.inventory = require('./inventory.model')(sequelize, Sequelize);
db.stock_movement = require('./stock_movement.model')(sequelize, Sequelize);
db.stock_movement_item = require('./stock_movement_item.model')(sequelize, Sequelize);
db.pos_session = require('./pos_session.model')(sequelize, Sequelize);
db.pos_register = require('./pos_register.model')(sequelize, Sequelize);
db.order = require('./order.model')(sequelize, Sequelize);
db.order_item = require('./order_item.model')(sequelize, Sequelize);
db.payment = require('./payment.model')(sequelize, Sequelize);
db.order_status = require('./order_status.model')(sequelize, Sequelize);
db.customer = require('./customer.model')(sequelize, Sequelize);
db.customer_group = require('./customer_group.model')(sequelize, Sequelize);
db.customer_point = require('./customer_point.model')(sequelize, Sequelize);
db.staff = require('./staff.model')(sequelize, Sequelize.DataTypes);
db.role = require('./role.model')(sequelize, Sequelize.DataTypes);
db.staff_log = require('./staff_log.model')(sequelize, Sequelize.DataTypes);








module.exports = db;