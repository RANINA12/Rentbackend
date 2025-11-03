// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');

// // Helper function to escape special regex characters
// const escapeRegex = (text) => {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// };

// //--------------------------------------------------------------------------//
// // @desc    Search for both items and users across the platform
// // @route   GET /api/search?q=searchTerm
// // @access  Public
// //--------------------------------------------------------------------------//
// const universalSearch = asyncHandler(async (req, res) => {
//   const query = req.query.q;

//   // If the search query is empty, send nothing
//   if (!query || query.trim() === '') {
//     return res.json({ success: true, users: [], items: [] });
//   }

//   // Escape the query and create a safe regex for searching
//   const safeQuery = escapeRegex(query.trim());
//   const searchQuery = { $regex: safeQuery, $options: 'i' };

//   // Use Promise.all to run both searches concurrently for better performance
//   const [users, items] = await Promise.all([
//     // Search for users by name (limit to 5 results)
//     User.find({ name: searchQuery })
//       .select('name avatar')
//       .limit(5),

//     // Search for items by name or category (limit to 10 results)
//     Item.find({
//       $or: [
//         { name: searchQuery },
//         { category: searchQuery }
//       ]
//     })
//     .select('name images category')
//     .limit(10)
//   ]);

//   res.json({ success: true, users, items });
// });

// module.exports = {
//   universalSearch,
// };

/********** */

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');

// const escapeRegex = (text) => {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// };

// const universalSearch = asyncHandler(async (req, res) => {
//   const query = req.query.q;

//   if (!query || query.trim() === '') {
//     return res.json({ success: true, users: [], items: [], suggestions: [] });
//   }

//   const safeQuery = escapeRegex(query.trim());
//   const searchQuery = { $regex: safeQuery, $options: 'i' };

//   // Use Promise.all to run all three searches concurrently
//   const [users, items, suggestions] = await Promise.all([
//     // 1. Search for users
//     User.find({ name: searchQuery })
//       .select('name avatar')
//       .limit(5),

//     // 2. Search for items
//     Item.find({
//       $or: [
//         { name: searchQuery },
//         { category: searchQuery }
//       ]
//     })
//     .select('name images category')
//     .limit(10),
    
//     // 3. NEW: Find related category suggestions
//     Item.aggregate([
//         // Find items that match the search query in name or category
//         { $match: { $or: [{ name: searchQuery }, { category: searchQuery }] } },
//         // Group by category to get unique categories
//         { $group: { _id: '$category' } },
//         // Limit the number of suggestions
//         { $limit: 4 },
//         // Reshape the output
//         { $project: { _id: 0, suggestion: '$_id' } }
//     ])

//   ]);

//   // Send all three results in the response
//   res.json({ success: true, users, items, suggestions });
// });

// module.exports = {
//   universalSearch,
// };

//********** */

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Item = require('../models/itemModel');

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

// @desc    Get popular/top items for initial search dropdown
// @route   GET /api/search/popular
// @access  Public
const getPopularAndTop = asyncHandler(async (req, res) => {
    const [topProducts, featuredCategories] = await Promise.all([
        Item.find({}).sort({ createdAt: -1 }).limit(6).select('name images category'),
        Item.aggregate([
            { $group: { _id: '$category' } },
            { $limit: 8 },
            { $project: { _id: 0, name: '$_id' } }
        ])
    ]);

    const popularSearches = [
        { name: 'Sofa' }, { name: 'Bed' }, { name: 'Fridge' },
        { name: 'Washing Machine' }, { name: 'TV' }, { name: 'Air Conditioner' }
    ];

    res.json({ success: true, popularSearches, topProducts, featuredCategories });
});

// @desc    Search for items and users based on a query
// @route   GET /api/search?q=searchTerm
// @access  Public
const universalSearch = asyncHandler(async (req, res) => {
  const query = req.query.q;
  if (!query || query.trim() === '') {
    return res.json({ success: true, users: [], items: [], suggestions: [] });
  }
  const safeQuery = escapeRegex(query.trim());
  const searchQuery = { $regex: safeQuery, $options: 'i' };

  const [users, items, suggestions] = await Promise.all([
    User.find({ name: searchQuery }).select('name avatar').limit(5),
    Item.find({ $or: [{ name: searchQuery }, { category: searchQuery }] }).select('name images category').limit(10),
    Item.aggregate([
        { $match: { $or: [{ name: searchQuery }, { category: searchQuery }] } },
        { $group: { _id: '$category' } },
        { $limit: 4 },
        { $project: { _id: 0, suggestion: '$_id' } }
    ])
  ]);
  res.json({ success: true, users, items, suggestions });
});

module.exports = {
  universalSearch,
  getPopularAndTop, // Dono functions ko export karna zaroori hai
};