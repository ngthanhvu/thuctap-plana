const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

router.get('/', customerController.getAll);
router.get('/search', customerController.search);
router.post('/', customerController.create);
router.delete('/:id', customerController.delete);

module.exports = router;