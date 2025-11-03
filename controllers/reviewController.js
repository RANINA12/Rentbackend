const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Item = require('../models/itemModel');
const User = require('../models/userModel');

// @desc    Create a new review for an item
// @route   POST /api/reviews/:itemId
// @access  Private
const createItemReview = asyncHandler(async (req, res) => {
    // =================================================================
    //          [DEBUGGER] Yahan console.log add kiya gaya hai
    // =================================================================
    console.log('--- User data received from auth middleware ---');
    console.log(req.user);
    console.log('-------------------------------------------');
    // =================================================================

    const { rating, comment } = req.body;
    const { itemId } = req.params;

    const item = await Item.findById(itemId);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    const alreadyReviewed = await Review.findOne({ item: itemId, user: req.user._id });
    if (alreadyReviewed) {
        res.status(400);
        throw new Error('You have already reviewed this item.');
    }

    const review = new Review({
        rating: Number(rating),
        comment,
        user: req.user._id,
        name: req.user.name, // Yeh line shayad fail ho rahi hai
        item: itemId,
        owner: item.user,
    });

    await review.save();

    // --- Average rating update logic ---
    const itemReviews = await Review.find({ item: itemId });
    item.numReviews = itemReviews.length;
    item.rating = itemReviews.reduce((acc, item) => item.rating + acc, 0) / itemReviews.length;
    await item.save();

    const ownerReviews = await Review.find({ owner: item.user });
    const owner = await User.findById(item.user);
    if (owner) {
        owner.numReviews = ownerReviews.length;
        owner.rating = ownerReviews.reduce((acc, item) => item.rating + acc, 0) / ownerReviews.length;
        await owner.save();
    }
    
    res.status(201).json({ message: 'Review added successfully' });
});


// @desc    Get all reviews for a single item
// @route   GET /api/reviews/:itemId
// @access  Public
const getItemReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ item: req.params.itemId })
        .populate('user', 'name avatar')
        .sort({ createdAt: -1 });

    res.json(reviews);
});

module.exports = { 
    createItemReview,
    getItemReviews 
};