const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

// Sync database and start server
db.sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });