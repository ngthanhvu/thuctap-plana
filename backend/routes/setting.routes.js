const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');

router.get('/qr-info', settingController.getQRInfo);
router.post('/', settingController.createSettings);
router.put('/', settingController.updateSettings);

module.exports = router;
