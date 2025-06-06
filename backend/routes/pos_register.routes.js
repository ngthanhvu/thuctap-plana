const express = require('express');
const router = express.Router();
const pos_registerController = require('../controllers/pos_register.controller');

router.get('/', pos_registerController.getAll);
router.get('/:id', pos_registerController.getById);
router.post('/', pos_registerController.create);
router.put('/:id', pos_registerController.update);
router.delete('/:id', pos_registerController.delete);

module.exports = router;