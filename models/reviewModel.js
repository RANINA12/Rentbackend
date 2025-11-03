const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        // Review likhne wala user
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        // Jis item ke liye review likha gaya hai
        item: {
            type: mongoose.Schema.ObjectId,
            ref: 'Item',
            required: true,
        },
        // Jis owner ke liye review likha gaya hai
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Review', reviewSchema);