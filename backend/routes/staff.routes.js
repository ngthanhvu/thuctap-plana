const express = require('express');
const router = express.Router();
const controller = require('../controllers/staff.Controller');
const authMiddleware = require('../middlewares/auth');

router.post('/create', controller.create);
router.post('/login', controller.login);
router.get('/getInfo', authMiddleware, controller.getInfo); // Thêm authMiddleware

module.exports = router;