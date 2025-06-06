const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());



app.use('/api/staff_logs', require('./routes/staff_log.routes'));
app.use('/api/roles', require('./routes/role.routes'));
app.use('/api/staffs', require('./routes/staff.routes'));
app.use('/api/customer_points', require('./routes/customer_point.routes'));
app.use('/api/customer_groups', require('./routes/customer_group.routes'));
app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/order_statuses', require('./routes/order_status.routes'));
app.use('/api/payments', require('./routes/payment.routes'));
app.use('/api/order_items', require('./routes/order_item.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/pos_registers', require('./routes/pos_register.routes'));
app.use('/api/pos_sessions', require('./routes/pos_session.routes'));
app.use('/api/stock_movement_items', require('./routes/stock_movement_item.routes'));
app.use('/api/stock_movements', require('./routes/stock_movement.routes'));
app.use('/api/inventories', require('./routes/inventory.routes'));
app.use('/api/warehouses', require('./routes/warehouse.routes'));
app.use('/api/product_variants', require('./routes/product_variant.routes'));
app.use('/api/product_images', require('./routes/product_image.routes'));
app.use('/api/product_categories', require('./routes/product_category.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/brands', require('./routes/brand.routes'));
app.use('/api/product-categories', require('./routes/product_category.routes'));
app.use('/api/users', require('./routes/user.routes'));





db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced.');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
