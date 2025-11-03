// const mongoose = require('mongoose');
// const slugify = require('slugify');
// const postSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: [true, 'Please provide a title'],
//             trim: true,
//             unique: true,
//         },
//         content: {
//             type: String,
//             required: [true, 'Please provide content'],
//         },
//         // Slug URL-friendly version of the title (e.g., "how-to-rent" from "How To Rent")
//         slug: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,
//         },
//         featuredImage: {
//             public_id: { type: String, required: true },
//             url: { type: String, required: true },
//         },
//         author: {
//             type: mongoose.Schema.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         category: {
//             type: String,
//             default: 'General',
//         },
//         tags: [String],
//     },
//     {
//         timestamps: true,
//     }
// );

// // Title se slug banane ke liye ek pre-save hook
// // Title se slug banane ke liye ek pre-save hook
// postSchema.pre('save', function(next) {
//     if (this.isModified('title')) {
//         // Use the slugify library for a more robust slug
//         this.slug = slugify(this.title, { 
//             lower: true,    // convert to lower case
//             strict: true,   // remove special characters
//         });
//     }
//     next();
// });


// module.exports = mongoose.model('Post', postSchema);


// backend/models/postModel.js

const mongoose = require('mongoose');
const slugify = require('slugify'); // <-- 1. IMPORT THE LIBRARY

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'A post must have content'],
    },
    category: {
      type: String,
      default: 'General',
    },
     excerpt: { type: String, maxlength: 200 },
    tags: [String],
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    featuredImage: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  { timestamps: true }
);

// --- 2. ADD THIS MIDDLEWARE TO AUTOMATICALLY CREATE THE SLUG ---
// This Mongoose middleware runs automatically before a document is saved.
postSchema.pre('save', function (next) {
  // Only generate a slug if the title is new or has been modified
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next(); // Continue to the save operation
});
// --- END OF NEW CODE ---

const Post = mongoose.model('Post', postSchema);
module.exports = Post;