const asyncHandler = require('express-async-handler');
// Hum yahan par Cart model banayenge baad mein
// const Cart = require('../models/cartModel'); 

// @desc    Get user's cart items
// @route   GET /api/cart
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  // Abhi ke liye, hum ek khaali array bhej rahe hain
  // Baad mein hum isko database se laayenge
  res.json({ message: "Cart API is working!", items: [] });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const { itemId, quantity } = req.body;
  res.status(201).json({ message: `Item ${itemId} added to cart.` });
});


module.exports = {
    getCartItems,
    addItemToCart,
};
