const express = require('express');
const router = express.Router();
const pos_session = require('../controllers/pos_session.controller');

router.get('/', pos_session.getAll);
router.get('/:id', pos_session.getById);
router.post('/', pos_session.create);
router.put('/:id', pos_session.update);
router.delete('/:id', pos_session.delete);

module.exports = router;