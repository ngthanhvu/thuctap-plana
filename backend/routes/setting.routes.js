const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');

router.get('/qr-info', settingController.getQRInfo);
module.exports = router;
