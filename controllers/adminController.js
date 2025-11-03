// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Post = require('../models/postModel');

// // @desc    Get dashboard stats (total users, items, etc.)
// // @route   GET /api/admin/stats
// // @access  Private/Admin
// const getStats = asyncHandler(async (req, res) => {
//     const totalUsers = await User.countDocuments();
//     const totalItems = await Item.countDocuments();
//     const totalPosts = await Post.countDocuments();
//     res.json({ totalUsers, totalItems, totalPosts });
// });

// // @desc    Get all users
// // @route   GET /api/admin/users
// // @access  Private/Admin
// const getAllUsers = asyncHandler(async (req, res) => {
//     // '-password' se password ko chhodkar saari details fetch hongi
//     const users = await User.find({}).select('-password');
//     res.status(200).json({
//         success: true,
//         count: users.length,
//         users,
//     });
// });

// // @desc    Delete a user
// // @route   DELETE /api/admin/users/:id
// // @access  Private/Admin
// const deleteUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//         await user.deleteOne();
//         res.json({ message: 'User removed' });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });

// // @desc    Get all blog posts
// // @route   GET /api/admin/posts
// // @access  Private/Admin
// const getAllPosts = asyncHandler(async (req, res) => {
//     const posts = await Post.find({}).populate('author', 'name').sort({ createdAt: -1 });
//     res.json(posts);
// });

// // @desc    Create a new blog post
// // @route   POST /api/admin/posts
// // @access  Private/Admin
// const createPost = asyncHandler(async (req, res) => {
//     const { title, content, excerpt } = req.body;
//     const post = new Post({
//         title,
//         content,
//         excerpt,
//         author: req.user._id,
//         // featuredImage logic yahaan add hoga
//     });
//     const createdPost = await post.save();
//     res.status(201).json(createdPost);
// });

// module.exports = {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost,
// };



//********** */

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Post = require('../models/postModel'); // Assuming you have a Post model

// // =================================================================
// //                      ADMIN API CONTROLLERS
// // =================================================================

// /**
//  * @desc    Admin ke liye dashboard stats fetch karna
//  * @route   GET /api/admin/stats
//  * @access  Private/Admin
//  */
// const getStats = asyncHandler(async (req, res) => {
//     const totalUsers = await User.countDocuments();
//     const totalItems = await Item.countDocuments();
//     const totalPosts = await Post.countDocuments();
//     res.json({ totalUsers, totalItems, totalPosts });
// });

// /**
//  * @desc    Admin ke liye saare users ki list fetch karna
//  * @route   GET /api/admin/users
//  * @access  Private/Admin
//  */
// const getAllUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({}).select('-password');
//     res.status(200).json({
//         success: true,
//         count: users.length,
//         users,
//     });
// });

// /**
//  * @desc    Ek user ko uski ID se delete karna
//  * @route   DELETE /api/admin/users/:id
//  * @access  Private/Admin
//  */
// const deleteUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);

//     if (user) {
//         // TODO: User ko delete karne se pehle uske saare items aur rentals ko bhi handle karna chahiye.
//         await user.deleteOne();
//         res.json({ message: 'User removed successfully' });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });


// // --- BLOG MANAGEMENT (Example) ---

// /**
//  * @desc    Saare blog posts fetch karna
//  * @route   GET /api/admin/posts
//  * @access  Private/Admin
//  */
// const getAllPosts = asyncHandler(async (req, res) => {
//     const posts = await Post.find({}).populate('author', 'name').sort({ createdAt: -1 });
//     res.json(posts);
// });

// /**
//  * @desc    Naya blog post create karna
//  * @route   POST /api/admin/posts
//  * @access  Private/Admin
//  */
// const createPost = asyncHandler(async (req, res) => {
//     const { title, content, excerpt } = req.body;
//     const post = new Post({
//         title,
//         content,
//         excerpt,
//         author: req.user._id,
//     });
//     const createdPost = await post.save();
//     res.status(201).json(createdPost);
// });


// module.exports = {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost,
// };


//*********** */

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Post = require('../models/postModel');
// const Rental = require('../models/rentalModel'); // [FIX] Rental model ko import kiya

// // =================================================================
// //                      ADMIN API CONTROLLERS
// // =================================================================

// /**
//  * @desc    Admin ke liye dashboard stats fetch karna
//  * @route   GET /api/admin/stats
//  * @access  Private/Admin
//  */
// const getStats = asyncHandler(async (req, res) => {
//     // --- Basic Counts ---
//     const totalUsers = await User.countDocuments();
//     const totalItems = await Item.countDocuments();
//     const totalRentals = await Rental.countDocuments();
//     const pendingKyc = await User.countDocuments({ 'verification.status': 'pending' });

//     // --- Chart Data: Pichle 7 din ke user signups ---
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const userSignups = await User.aggregate([
//         { $match: { createdAt: { $gte: sevenDaysAgo } } },
//         {
//             $group: {
//                 _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                 count: { $sum: 1 }
//             }
//         },
//         { $sort: { _id: 1 } }
//     ]);

//     res.json({
//         totalUsers,
//         totalItems,
//         totalRentals,
//         pendingKyc,
//         userSignups,
//     });
// });

// /**
//  * @desc    Admin ke liye saare users ki list fetch karna
//  * @route   GET /api/admin/users
//  * @access  Private/Admin
//  */
// const getAllUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({}).select('-password');
//     res.status(200).json({
//         success: true,
//         count: users.length,
//         users,
//     });
// });

// /**
//  * @desc    Ek user ko uski ID se delete karna
//  * @route   DELETE /api/admin/users/:id
//  * @access  Private/Admin
//  */
// const deleteUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//         await user.deleteOne();
//         res.json({ message: 'User removed successfully' });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });

// // --- BLOG MANAGEMENT ---
// const getAllPosts = asyncHandler(async (req, res) => {
//     const posts = await Post.find({}).populate('author', 'name').sort({ createdAt: -1 });
//     res.json(posts);
// });

// const createPost = asyncHandler(async (req, res) => {
//     const { title, content, excerpt } = req.body;
//     const post = new Post({
//         title,
//         content,
//         excerpt,
//         author: req.user._id,
//     });
//     const createdPost = await post.save();
//     res.status(201).json(createdPost);
// });

// module.exports = {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost,
// };

//********* */

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Post = require('../models/postModel');
// const Rental = require('../models/rentalModel');

// // ... (getStats function waise ka waisa rahega)
// const getStats = asyncHandler(async (req, res) => {
//     const totalUsers = await User.countDocuments();
//     const totalItems = await Item.countDocuments();
//     const totalRentals = await Rental.countDocuments();
//     const pendingKyc = await User.countDocuments({ 'verification.status': 'pending' });

//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const userSignups = await User.aggregate([
//         { $match: { createdAt: { $gte: sevenDaysAgo } } },
//         {
//             $group: {
//                 _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                 count: { $sum: 1 }
//             }
//         },
//         { $sort: { _id: 1 } }
//     ]);

//     res.json({
//         totalUsers,
//         totalItems,
//         totalRentals,
//         pendingKyc,
//         userSignups,
//     });
// });

// /**
//  * @desc    Admin ke liye saare users ki list fetch karna (Search ke saath)
//  * @route   GET /api/admin/users
//  * @access  Private/Admin
//  */
// const getAllUsers = asyncHandler(async (req, res) => {
//     // [IMPROVEMENT] Search functionality add ki gayi
//     const keyword = req.query.search
//         ? {
//             $or: [
//                 { name: { $regex: req.query.search, $options: 'i' } }, // Naam se search (case-insensitive)
//                 { email: { $regex: req.query.search, $options: 'i' } }, // Email se search (case-insensitive)
//             ],
//         }
//         : {}; // Agar koi search query nahi hai, to sabhi users dikhao
    
//     const users = await User.find({ ...keyword }).select('-password');
    
//     res.status(200).json({
//         success: true,
//         count: users.length,
//         users,
//     });
// });

// // ... (baaki ke functions waise hi rahenge)
// const deleteUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//         await user.deleteOne();
//         res.json({ message: 'User removed successfully' });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });
// const getAllPosts = asyncHandler(async (req, res) => { 
//     const posts = await Post.find({}).populate('author', 'name').sort({ createdAt: -1 });
//     res.json(posts);
// });
// const createPost = asyncHandler(async (req, res) => { 
//     const { title, content, excerpt } = req.body;
//     const post = new Post({ title, content, excerpt, author: req.user._id });
//     const createdPost = await post.save();
//     res.status(201).json(createdPost);
// });


// module.exports = {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost,
// };


//*************/ sahi he bhai ye

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Post = require('../models/postModel');
// const Rental = require('../models/rentalModel');

// // --- (getStats function waise ka waisa rahega) ---
// const getStats = asyncHandler(async (req, res) => {
//     const totalUsers = await User.countDocuments();
//     const totalItems = await Item.countDocuments();
//     const totalRentals = await Rental.countDocuments();
//     const pendingKyc = await User.countDocuments({ 'verification.status': 'pending' });
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     const userSignups = await User.aggregate([
//         { $match: { createdAt: { $gte: sevenDaysAgo } } },
//         {
//             $group: {
//                 _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                 count: { $sum: 1 }
//             }
//         },
//         { $sort: { _id: 1 } }
//     ]);
//     res.json({ totalUsers, totalItems, totalRentals, pendingKyc, userSignups });
// });

// /**
//  * @desc    Admin ke liye saare users ki list fetch karna (Search ke saath)
//  * @route   GET /api/admin/users
//  * @access  Private/Admin
//  */
// const getAllUsers = asyncHandler(async (req, res) => {
//     let keyword = {};
//     if (req.query.search) {
//         const searchQuery = req.query.search;
        
//         // [IMPROVEMENT] Ab yeh Name, Email, aur User ID, teeno se search karega
//         // Check karein ki search query ek number hai ya nahi
//         const isNumeric = !isNaN(searchQuery);

//         keyword = {
//             $or: [
//                 { name: { $regex: searchQuery, $options: 'i' } },
//                 { email: { $regex: searchQuery, $options: 'i' } },
//             ],
//         };

//         // Agar query number hai, to use user_id search me bhi shaamil karein
//         if (isNumeric) {
//             keyword.$or.push({ user_id: Number(searchQuery) });
//         }
//     }
    
//     const users = await User.find(keyword).select('-password');
    
//     res.status(200).json({
//         success: true,
//         count: users.length,
//         users,
//     });
// });

// // --- (baaki ke functions waise hi rahenge) ---
// const deleteUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//         await user.deleteOne();
//         res.json({ message: 'User removed successfully' });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });
// const getAllPosts = asyncHandler(async (req, res) => { 
//     const posts = await Post.find({}).populate('author', 'name').sort({ createdAt: -1 });
//     res.json(posts);
// });
// const createPost = asyncHandler(async (req, res) => { 
//     const { title, content, excerpt } = req.body;
//     const post = new Post({ title, content, excerpt, author: req.user._id });
//     const createdPost = await post.save();
//     res.status(201).json(createdPost);
// });

// const dataExplorer = asyncHandler(async (req, res) => {
//     const { collection, field, operator, value } = req.query;

//     if (!collection || !field || !operator || !value) {
//         res.status(400);
//         throw new Error('Please provide all query parameters: collection, field, operator, value.');
//     }

//     let Model;
//     switch (collection) {
//         case 'users':
//             Model = User;
//             break;
//         case 'items':
//             Model = Item;
//             break;
//         case 'rentals':
//             Model = Rental;
//             break;
//         default:
//             res.status(400);
//             throw new Error('Invalid collection specified.');
//     }

//     let filter = {};

//     // Operator ke hisaab se query banayein
//     switch (operator) {
//         case 'equals':
//             filter[field] = value;
//             break;
//         case 'contains':
//             filter[field] = { $regex: value, $options: 'i' };
//             break;
//         case 'is_true':
//             filter[field] = true;
//             break;
//         case 'is_false':
//             filter[field] = false;
//             break;
//         // Future me aur operators (greater_than, less_than) add kar sakte hain
//         default:
//             res.status(400);
//             throw new Error('Invalid operator specified.');
//     }

//     const results = await Model.find(filter).select('-password');

//     res.status(200).json({
//         success: true,
//         count: results.length,
//         data: results,
//     });
// });

 
// const getKycRequests = asyncHandler(async (req, res) => {
//     const pendingUsers = await User.find({ 'verification.status': 'pending' })
//         .select('name email verification'); // Sirf zaroori details select karein

//     res.status(200).json({
//         success: true,
//         count: pendingUsers.length,
//         requests: pendingUsers,
//     });
// });

// /**
//  * @desc    Ek user ki KYC request ko approve karna
//  * @route   PUT /api/admin/kyc-requests/:userId/approve
//  * @access  Private/Admin
//  */
// const approveKyc = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.userId);

//     if (user) {
//         user.verification.status = 'verified';
//         await user.save();
//         // TODO: Future me user ko email notification bhej sakte hain
//         res.json({ message: 'User KYC has been approved.' });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });

// /**
//  * @desc    Ek user ki KYC request ko reject karna
//  * @route   PUT /api/admin/kyc-requests/:userId/reject
//  * @access  Private/Admin
//  */
// const rejectKyc = asyncHandler(async (req, res) => {
//     const { reason } = req.body;
//     if (!reason) {
//         res.status(400);
//         throw new Error('Rejection reason is required.');
//     }

//     const user = await User.findById(req.params.userId);

//     if (user) {
//         user.verification.status = 'rejected';
//         user.verification.rejectionReason = reason;
//         await user.save();
//         // TODO: Future me user ko email notification bhej sakte hain
//         res.json({ message: 'User KYC has been rejected.' });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });

// module.exports = {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost,
//     dataExplorer,
//     getKycRequests,
//     approveKyc,
//     rejectKyc,
// };



//********************* */

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const Post = require('../models/postModel');
const Rental = require('../models/rentalModel');

/**
 * @desc    Get all dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getStats = asyncHandler(async (req, res) => {
    // Card statistics
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();
    const totalRentals = await Rental.countDocuments();
    const pendingKyc = await User.countDocuments({ 'verification.status': 'pending' });

    // Chart data for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const userSignups = await User.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } },
        // [FIX] Added project stage to format the output correctly for the chart
        { 
            $project: { 
                _id: 0, 
                date: "$_id", 
                count: "$count" 
            } 
        }
    ]);

    res.json({ 
        totalUsers, 
        totalItems, 
        totalRentals, 
        pendingKyc, 
        userSignups 
    });
});

/**
 * @desc    Fetch all users for admin (with search)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
    let keyword = {};
    if (req.query.search) {
        const searchQuery = req.query.search;
        keyword = {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } },
            ],
        };
        // Check if the search query could be a user ID
        if (mongoose.Types.ObjectId.isValid(searchQuery)) {
            keyword.$or.push({ _id: searchQuery });
        }
    }
    
    const users = await User.find(keyword).select('-password');
    
    res.status(200).json({
        success: true,
        count: users.length,
        users,
    });
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc    Get all posts (for admin panel)
 * @route   GET /api/admin/posts
 * @access  Private/Admin
 */
const getAllPosts = asyncHandler(async (req, res) => { 
    const posts = await Post.find({}).populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
});

/**
 * @desc    Create a new post
 * @route   POST /api/admin/posts
 * @access  Private/Admin
 */
const createPost = asyncHandler(async (req, res) => { 
    const { title, content, excerpt } = req.body;
    const post = new Post({ title, content, excerpt, author: req.user._id });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
});

/**
 * @desc    Run a custom query on the database
 * @route   GET /api/admin/explorer
 * @access  Private/Admin
 */
const dataExplorer = asyncHandler(async (req, res) => {
    const { collection, field, operator, value } = req.query;

    if (!collection || !field || !operator) {
        res.status(400);
        throw new Error('Please provide collection, field, and operator.');
    }

    let Model;
    switch (collection) {
        case 'users': Model = User; break;
        case 'items': Model = Item; break;
        case 'rentals': Model = Rental; break;
        default:
            res.status(400);
            throw new Error('Invalid collection specified.');
    }

    let filter = {};
    const processedValue = (value === 'true' || value === 'false') ? JSON.parse(value) : value;

    switch (operator) {
        case 'equals': filter[field] = processedValue; break;
        case 'contains': filter[field] = { $regex: processedValue, $options: 'i' }; break;
        default:
            res.status(400);
            throw new Error('Invalid operator specified.');
    }

    const results = await Model.find(filter).select('-password');
    res.status(200).json({
        success: true,
        count: results.length,
        data: results,
    });
});

/**
 * @desc    Get all pending KYC requests
 * @route   GET /api/admin/kyc-requests
 * @access  Private/Admin
 */
const getKycRequests = asyncHandler(async (req, res) => {
    const pendingUsers = await User.find({ 'verification.status': 'pending' })
        .select('name email verification'); 

    res.status(200).json({
        success: true,
        count: pendingUsers.length,
        requests: pendingUsers,
    });
});

/**
 * @desc    Approve a user's KYC request
 * @route   PUT /api/admin/kyc-requests/:userId/approve
 * @access  Private/Admin
 */
const approveKyc = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (user) {
        user.verification.status = 'verified';
        await user.save({ validateBeforeSave: false }); // Bypass other validations
        res.json({ message: 'User KYC has been approved.' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc    Reject a user's KYC request
 * @route   PUT /api/admin/kyc-requests/:userId/reject
 * @access  Private/Admin
 */
const rejectKyc = asyncHandler(async (req, res) => {
    const { reason } = req.body;
    if (!reason) {
        res.status(400);
        throw new Error('Rejection reason is required.');
    }

    const user = await User.findById(req.params.userId);

    if (user) {
        user.verification.status = 'rejected';
        user.verification.rejectionReason = reason;
        await user.save({ validateBeforeSave: false }); // Bypass other validations
        res.json({ message: 'User KYC has been rejected.' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    getStats,
    getAllUsers,
    deleteUser,
    getAllPosts,
    createPost,
    dataExplorer,
    getKycRequests,
    approveKyc,
    rejectKyc,
};