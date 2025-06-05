const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.Controller');

router.get('/', roleController.getAll);
router.get('/:id', roleController.getById);
router.post('/', roleController.create);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;