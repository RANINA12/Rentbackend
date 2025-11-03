const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createOrder, verifyPayment } = require('../controllers/paymentController');

// POST /api/payments/create-order
router.post('/create-order', protect, createOrder);

// POST /api/payments/verify-payment
router.post('/verify-payment', protect, verifyPayment);

module.exports = router;