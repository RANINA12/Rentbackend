const express = require('express');
const router = express.Router();
const { getCartItems, addItemToCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

// @route   GET /api/cart
// @desc    Get user's cart items
// @access  Private
router.get('/', protect, getCartItems);

// @route   POST /api/cart
// @desc    Add an item to the cart
// @access  Private
router.post('/', protect, addItemToCart);

// Yahan par item delete karne ka route bhi aayega

module.exports = router;