const express = require('express');
const router = express.Router();
const staff_logController = require('../controllers/staff_log.Controller');

router.get('/', staff_logController.getAll);
router.get('/:id', staff_logController.getById);
router.post('/', staff_logController.create);
router.put('/:id', staff_logController.update);
router.delete('/:id', staff_logController.delete);

module.exports = router;