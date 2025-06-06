const express = require('express');
const router = express.Router();
const order_statusController = require('../controllers/order_status.controller');   

router.get('/', order_statusController.getAll);
router.get('/:id', order_statusController.getById);
router.post('/', order_statusController.create);
router.put('/:id', order_statusController.update);
router.delete('/:id', order_statusController.delete);

module.exports = router;