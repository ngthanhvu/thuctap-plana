const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventory.controller');

router.get('/', controller.getAll);
router.get('/product/:productId', controller.getByProduct);
router.put('/update', controller.updateQuantity);

module.exports = router;