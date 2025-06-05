const express = require('express');
const router = express.Router();
const customer_groupController = require('../controllers/customer_group.controller');

router.get('/', customer_groupController.getAll);
router.get('/:id', customer_groupController.getById);
router.post('/', customer_groupController.create);
router.put('/:id', customer_groupController.update);
router.delete('/:id', customer_groupController.delete);

module.exports = router; 
