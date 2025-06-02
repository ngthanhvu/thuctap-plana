const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Product CRUD routes
router.post('/', productController.create);
router.get('/', productController.findAll);
router.get('/:id', productController.findOne);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;