const express = require('express');
const router = express.Router();
const customer_pointController = require('../controllers/customer_point.Controller');


router.get('/', customer_pointController.getAll);
router.get('/:id', customer_pointController.getById);
router.post('/', customer_pointController.create);
router.put('/:id', customer_pointController.update);
router.delete('/:id', customer_pointController.delete);

module.exports = router;