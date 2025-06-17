const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, orderController.getAll);
router.get('/staff', authMiddleware, orderController.getOrdersByStaff);
router.get('/sales-report', authMiddleware, orderController.getSalesReport);

module.exports = router;