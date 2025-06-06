const express = require('express');
const router = express.Router();
const stock_movement_item = require('../controllers/stock_movement_item.controller');

router.get('/', stock_movement_item.getAll);
router.get('/:id', stock_movement_item.getById);
router.post('/', stock_movement_item.create);
router.put('/:id', stock_movement_item.update);
router.delete('/:id', stock_movement_item.delete);

module.exports = router;