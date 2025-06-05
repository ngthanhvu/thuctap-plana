const express = require('express');
const router = express.Router();
const warehouse = require('../controllers/warehouse.controller');

router.get('/', warehouse.getAll);
router.get('/:id', warehouse.getById);
router.post('/', warehouse.create);
router.put('/:id', warehouse.update);
router.delete('/:id', warehouse.delete);

module.exports = router;