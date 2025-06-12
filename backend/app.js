const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectRedis } = require('./config/redis');

const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/brands', require('./routes/brand.routes'));
app.use('/api/staffs', require('./routes/staff.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/inventories', require('./routes/inventory.routes'));
app.use('/api/stock-movements', require('./routes/stock_movement.routes'));
app.use('/api/pos', require('./routes/pos.routes'));
app.use('/api/customers', require('./routes/customer.routes'));

const initializeServices = async () => {
    await connectRedis(); // 👈
};

initializeServices();

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced.');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
