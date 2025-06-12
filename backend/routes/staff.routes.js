const express = require('express');
const router = express.Router();
const controller = require('../controllers/staff.controller');
const authMiddleware = require('../middlewares/auth');

router.post('/create', controller.create);
router.post('/login', controller.login);
router.get('/getInfo', authMiddleware, controller.getInfo);
router.get('/getListInfo', authMiddleware, controller.getListInfo);

module.exports = router;