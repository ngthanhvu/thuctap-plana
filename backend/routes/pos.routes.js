const express = require('express');
const router = express.Router();
const posController = require('../controllers/pos.controller');

router.post('/session/start', posController.startSession);
router.post('/session/end', posController.endSession);
router.post('/orders', posController.createOrder);
router.post('/orders/draft', posController.saveDraft);
router.put('/orders/:order_id/cancel', posController.cancelOrder);
router.get('/reports/sales', posController.getSalesReport);
router.get('/reports/summary', posController.getSummaryReport);
router.post('/payment/qr', posController.generatePaymentQR);

module.exports = router;