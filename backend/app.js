const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/brands', require('./routes/brand.routes'));
app.use('/api/staffs', require('./routes/staff.routes'));

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced.');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
