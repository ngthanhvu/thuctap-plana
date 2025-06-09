const express = require('express');
const cors = require('cors');
const { connectRedis } = require('./config/redis'); // 👈

const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/brands', require('./routes/brand.routes'));
app.use('/api/staffs', require('./routes/staff.routes'));

const initializeServices = async () => {
    await connectRedis(); // 👈
};

initializeServices();

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced.');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
