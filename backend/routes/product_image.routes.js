const express = require('express');
const router = express.Router();
const product_image = require('../controllers/product_image.controller');

router.get('/', product_image.getAll);
router.get('/:id', product_image.getById);
router.post('/', product_image.create);
router.put('/:id', product_image.update);
router.delete('/:id', product_image.delete);


module.exports = router;