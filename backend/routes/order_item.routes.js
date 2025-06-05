const express = require('express');
const router = express.Router();
const order_item = require('../controllers/order_item.controller');

router.get('/', order_item.getAll);
router.get('/:id', order_item.getById);
router.post('/', order_item.create);
router.put('/:id', order_item.update);
router.delete('/:id', order_item.delete);

module.exports = router;