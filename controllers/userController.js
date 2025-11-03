// const User = require('../models/userModel');

// /**
//  * @desc    Get user profile
//  * @route   GET /api/users/profile
//  * @access  Private
//  */
// const getUserProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         address: user.address,
//         isAdmin: user.isAdmin,
//       });
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * @desc    Update user profile
//  * @route   PUT /api/users/profile
//  * @access  Private
//  */
// const updateUserProfile = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user._id);

//         if (user) {
//             user.name = req.body.name || user.name;
//             user.email = req.body.email || user.email;
//             user.phone = req.body.phone || user.phone;
//             user.address = req.body.address || user.address;
            
//             if(req.body.password) {
//                 user.password = req.body.password;
//             }

//             const updatedUser = await user.save();

//             res.json({
//                 _id: updatedUser._id,
//                 name: updatedUser.name,
//                 email: updatedUser.email,
//                 isAdmin: updatedUser.isAdmin,
//                 // Do not send the token back on profile update
//             });

//         } else {
//             res.status(404);
//             throw new Error('User not found');
//         }
//     } catch (error) {
//         next(error);
//     }
// };




//------------------------------------------------------------


// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Rental = require('../models/rentalModel');
// const generateToken = require('../utils/generateToken');

// //--------------------------------------------------------------------------//
// //                       Authentication Controllers
// //--------------------------------------------------------------------------//

// // @desc    Register a new user
// // @route   POST /api/users/register
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, phone, address } = req.body;
//     if (!name || !email || !password || !phone || !address?.city) {
//         res.status(400); throw new Error('Please enter all required fields');
//     }
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         res.status(400); throw new Error('User already exists');
//     }
//     const user = await User.create({ name, email, password, phone, address });
//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(400); throw new Error('Invalid user data');
//     }
// });

// // @desc    Authenticate user & get token (Login)
// // @route   POST /api/users/login
// // @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin, // isAdmin status bhejein taaki frontend par admin features dikha sakein
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(401); throw new Error('Invalid email or password');
//     }
// });

// //--------------------------------------------------------------------------//
// //                    Private Profile Controllers
// //--------------------------------------------------------------------------//

// // @desc    Get current user's profile
// // @route   GET /api/users/profile
// // @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404); throw new Error('User not found');
//     }
// });

// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//         user.name = req.body.name || user.name;
//         user.bio = req.body.bio || user.bio;
//         if (req.body.address) {
//             user.address = { ...user.address, ...req.body.address };
//         }
//         if (req.body.password) {
//             user.password = req.body.password;
//         }
//         if (req.file) { // Avatar update logic
//             user.avatar = { public_id: req.file.filename, url: req.file.path };
//         }
//         const updatedUser = await user.save();
//         res.json({
//             _id: updatedUser._id,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             bio: updatedUser.bio,
//             address: updatedUser.address,
//             avatar: updatedUser.avatar,
//             token: generateToken(updatedUser._id), // Naya token bhejein agar zaroori ho
//         });
//     } else {
//         res.status(404); throw new Error('User not found');
//     }
// });

// //--------------------------------------------------------------------------//
// //                       Public Profile Controller
// //--------------------------------------------------------------------------//

// // @desc    Get a user's public profile and their listed items
// // @route   GET /api/users/:userId/public-profile
// // @access  Public
// const getUserPublicProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.userId).select('-password -email');
//     if (user) {
//         // Saath mein user ke items bhi bhej dein
//         const items = await Item.find({ user: req.params.userId }).sort({ createdAt: -1 });
//         res.json({ user, items });
//     } else {
//         res.status(404); throw new Error('User not found');
//     }
// });

// //--------------------------------------------------------------------------//
// //                       Dashboard Controller
// //--------------------------------------------------------------------------//

// // @desc    Get stats for the user dashboard
// // @route   GET /api/users/dashboard-stats
// // @access  Private
// const getDashboardStats = asyncHandler(async (req, res) => {
//     const userId = req.user._id;

//     // Model ke sahi field names ka istemaal karein
//     const activeProducts = await Item.countDocuments({ user: userId });
//     const requestsRaised = await Rental.countDocuments({ renterId: userId, status: 'pending' });
//     const completedRentals = await Rental.find({ ownerId: userId, status: { $in: ['paid', 'completed'] } });
    
//     // Typo theek kiya gaya hai
//     const totalEarnings = completedRentals.reduce((acc, rental) => acc + rental.totalPrice, 0);

//     res.json({
//         activeProducts,
//         totalEarnings,
//         requestsRaised,
//     });
// });

// //--------------------------------------------------------------------------//
// //                          Admin Controller
// //--------------------------------------------------------------------------//

// // @desc    Get all users (Admin only)
// // @route   GET /api/users
// // @access  Private/Admin
// const getUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({}).select('-password');
//     res.json(users);
// });

// //--------------------------------------------------------------------------//
// //                               Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     registerUser,
//     loginUser,
//     getUserProfile,
//     updateUserProfile,
//     getUserPublicProfile,
//     getDashboardStats,
//     getUsers, // Admin ke liye
// };

//-----------------------------------------------------------------------------

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Rental = require('../models/rentalModel');
// const generateToken = require('../utils/generateToken');

// //--------------------------------------------------------------------------//
// //                       Authentication Controllers
// //--------------------------------------------------------------------------//

// // @desc    Register a new user
// // @route   POST /api/users/register
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, phone, address } = req.body;
//     if (!name || !email || !password || !phone || !address?.city) {
//         res.status(400); throw new Error('Please enter all required fields');
//     }
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         res.status(400); throw new Error('User already exists');
//     }
//     const user = await User.create({ name, email, password, phone, address });
//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(400); throw new Error('Invalid user data');
//     }
// });

// // @desc    Authenticate user & get token (Login)
// // @route   POST /api/users/login
// // @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(401); throw new Error('Invalid email or password');
//     }
// });

// //--------------------------------------------------------------------------//
// //                       Private Profile Controllers
// //--------------------------------------------------------------------------//

// // @desc    Get current user's profile
// // @route   GET /api/users/profile
// // @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404); throw new Error('User not found');
//     }
// });

// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//         user.name = req.body.name || user.name;
//         user.bio = req.body.bio || user.bio;
//         if (req.body.address) {
//             user.address = { ...user.address, ...req.body.address };
//         }
//         if (req.body.password) {
//             user.password = req.body.password;
//         }
//         if (req.file) {
//             user.avatar = { public_id: req.file.filename, url: req.file.path };
//         }
//         const updatedUser = await user.save();
//         res.json({
//             _id: updatedUser._id,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             bio: updatedUser.bio,
//             address: updatedUser.address,
//             avatar: updatedUser.avatar,
//             isAdmin: updatedUser.isAdmin,
//             token: generateToken(updatedUser._id),
//         });
//     } else {
//         res.status(404); throw new Error('User not found');
//     }
// });

// //--------------------------------------------------------------------------//
// //                       Public Profile & Items Controllers
// //--------------------------------------------------------------------------//

// // @desc    Get a user's public profile and their listed items
// // @route   GET /api/users/:userId/public-profile
// // @access  Public
// const getUserPublicProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.userId).select('-password -email');
//     if (user) {
//         // --- BADLAAV YAHAN HAI ---
//         const items = await Item.find({ owner: req.params.userId }).sort({ createdAt: -1 });
//         res.json({ user, items });
//     } else {
//         res.status(404); throw new Error('User not found');
//     }
// });

// // @desc    Get all items listed by a specific user (for MyItems page)
// // @route   GET /api/users/:userId/items
// // @access  Public
// const getUserItems = asyncHandler(async (req, res) => {
//     // --- BADLAAV YAHAN HAI ---
//     const items = await Item.find({ owner: req.params.userId }).sort({ createdAt: -1 });
//     res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                       Dashboard Controller
// //--------------------------------------------------------------------------//

// // @desc    Get stats for the user dashboard
// // @route   GET /api/users/stats
// // @access  Private
// const getDashboardStats = asyncHandler(async (req, res) => {
//     const userId = req.user._id;

//     // --- BADLAAV YAHAN HAI ---
//     const activeProducts = await Item.countDocuments({ owner: userId });
//     const requestsRaised = await Rental.countDocuments({ renter: userId, status: 'pending' });
//     const completedRentals = await Rental.find({ owner: userId, status: { $in: ['paid', 'completed'] } });
    
//     const totalEarnings = completedRentals.reduce((acc, rental) => acc + rental.totalPrice, 0);

//     res.json({
//         activeProducts,
//         totalEarnings,
//         requestsRaised,
//     });
// });

// //--------------------------------------------------------------------------//
// //                       Admin Controller
// //--------------------------------------------------------------------------//

// // @desc    Get all users (Admin only)
// // @route   GET /api/users
// // @access  Private/Admin
// const getUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({}).select('-password');
//     res.json(users);
// });

// //--------------------------------------------------------------------------//
// //                                 Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     registerUser,
//     loginUser,
//     getUserProfile,
//     updateUserProfile,
//     getUserPublicProfile,
//     getDashboardStats,
//     getUsers,
//     getUserItems,
// };


//***************************************************************** */

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const Item = require('../models/itemModel');
// const Rental = require('../models/rentalModel');
// const generateToken = require('../utils/generateToken');

// //--------------------------------------------------------------------------//
// //                       Authentication Controllers
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Register a new user
//  * @route   POST /api/users/register
//  * @access  Public
//  */
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, phone, address } = req.body;
//     if (!name || !email || !password || !phone || !address?.city) {
//         res.status(400); 
//         throw new Error('Please enter all required fields');
//     }
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         res.status(400); 
//         throw new Error('User already exists');
//     }
//     const user = await User.create({ name, email, password, phone, address });
//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(400); 
//         throw new Error('Invalid user data');
//     }
// });

// /**
//  * @desc    Authenticate user & get token (Login)
//  * @route   POST /api/users/login
//  * @access  Public
//  */
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(401); 
//         throw new Error('Invalid email or password');
//     }
// });

// //--------------------------------------------------------------------------//
// //                       Private Profile Controllers
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Get current user's profile
//  * @route   GET /api/users/profile
//  * @access  Private
//  */
// const getUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404); 
//         throw new Error('User not found');
//     }
// });

// /**
//  * @desc    Update user profile
//  * @route   PUT /api/users/profile
//  * @access  Private
//  */
// const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//         user.name = req.body.name || user.name;
//         user.bio = req.body.bio || user.bio;
//         if (req.body.address) {
//             user.address = { ...user.address, ...req.body.address };
//         }
//         if (req.body.password) {
//             user.password = req.body.password;
//         }
//         if (req.file) {
//             user.avatar = { public_id: req.file.filename, url: req.file.path };
//         }
//         const updatedUser = await user.save();
//         res.json({
//             _id: updatedUser._id,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             bio: updatedUser.bio,
//             address: updatedUser.address,
//             avatar: updatedUser.avatar,
//             isAdmin: updatedUser.isAdmin,
//             token: generateToken(updatedUser._id),
//         });
//     } else {
//         res.status(404); 
//         throw new Error('User not found');
//     }
// });


// //--------------------------------------------------------------------------//
// //                       Public Profile & Items Controllers
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Get a user's public profile and their listed items
//  * @route   GET /api/users/public-profile/:userId
//  * @access  Public
//  */
// const getUserPublicProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.userId).select('-password -email');
//     if (user) {
//         const items = await Item.find({ owner: req.params.userId }).sort({ createdAt: -1 });
//         res.json({ user, items });
//     } else {
//         res.status(404); 
//         throw new Error('User not found');
//     }
// });

// /**
//  * @desc    Get all items listed by the logged-in user (for MyItems page)
//  * @route   GET /api/users/:userId/items
//  * @access  Private
//  */
// const getUserItems = asyncHandler(async (req, res) => {
//     // [SUDHAR YAHAN HAI]
//     // Hamesha req.user._id ka istemal karein jo token se milta hai.
//     // Yeh req.params.userId se zyada surakshit hai.
//     const items = await Item.find({ owner: req.user._id }).sort({ createdAt: -1 });

//     if (items) {
//         res.json({
//             success: true,
//             items: items,
//         });
//     } else {
//         res.status(404);
//         throw new Error('Items not found for this user');
//     }
// });

// //--------------------------------------------------------------------------//
// //                       Dashboard & Admin Controllers
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Get stats for the user dashboard
//  * @route   GET /api/users/stats
//  * @access  Private
//  */
// const getDashboardStats = asyncHandler(async (req, res) => {
//     const userId = req.user._id;
//     const activeProducts = await Item.countDocuments({ owner: userId });
//     const requestsRaised = await Rental.countDocuments({ renter: userId, status: 'pending' });
//     const completedRentals = await Rental.find({ owner: userId, status: { $in: ['paid', 'completed'] } });
//     const totalEarnings = completedRentals.reduce((acc, rental) => acc + rental.totalPrice, 0);

//     res.json({ activeProducts, totalEarnings, requestsRaised });
// });

// /**
//  * @desc    Get all users (Admin only)
//  * @route   GET /api/users
//  * @access  Private/Admin
//  */
// const getUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({}).select('-password');
//     res.json(users);
// });

// //--------------------------------------------------------------------------//
// //                                  Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     registerUser,
//     loginUser,
//     getUserProfile,
//     updateUserProfile,
//     getUserPublicProfile,
//     getDashboardStats,
//     getUsers,
//     getUserItems, // Ise export karna na bhoolein
// };


//**************************************************** */

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const Rental = require('../models/rentalModel');
const generateToken = require('../utils/generateToken');

//--------------------------------------------------------------------------//
//                                Authentication                            //
//--------------------------------------------------------------------------//

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address?.city) {
        res.status(400); 
        throw new Error('Please enter all required fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400); 
        throw new Error('User with this email already exists');
    }
    const user = await User.create({ name, email, password, phone, address });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400); 
        throw new Error('Invalid user data');
    }
});

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401); 
        throw new Error('Invalid email or password');
    }
});

//--------------------------------------------------------------------------//
//                         User Profile Management                          //
//--------------------------------------------------------------------------//

/**
 * @desc    Get current user's profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404); 
        throw new Error('User not found');
    }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        if (req.body.address) {
            user.address = { ...user.address, ...req.body.address };
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.file) { // Avatar update logic
            user.avatar = { public_id: req.file.filename, url: req.file.path };
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio,
            address: updatedUser.address,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404); 
        throw new Error('User not found');
    }
});


/**
 * @desc    Get all items listed by the logged-in user (for MyItems page)
 * @route   GET /api/users/my-items
 * @access  Private
 */
const getUserItems = asyncHandler(async (req, res) => {
    // req.user._id token se aa raha hai, isliye yeh secure hai
    const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, items });
});


/**
 * @desc    Get a user's public profile and their listed items
 * @route   GET /api/users/public-profile/:userId
 * @access  Public
 */
const getUserPublicProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId).select('-password -email');
    if (user) {
        const items = await Item.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json({ user, items });
    } else {
        res.status(404); 
        throw new Error('User not found');
    }
});


//--------------------------------------------------------------------------//
//                          Dashboard & Admin                               //
//--------------------------------------------------------------------------//

/**
 * @desc    Get stats for the user dashboard
 * @route   GET /api/users/stats
 * @access  Private
 */
const getDashboardStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    // Yeh pehle se sahi tha (assuming itemModel me 'user' field hai)
    const activeProducts = await Item.countDocuments({ user: userId }); 
    
    // --- BADLAAV YAHAN HAI ---
    // 'renter' ko 'renterId' se badla gaya
    const requestsRaised = await Rental.countDocuments({ renterId: userId, status: 'pending' });
    
    // --- BADLAAV YAHAN HAI ---
    // 'owner' ko 'ownerId' se badla gaya
    const completedRentals = await Rental.find({ ownerId: userId, status: { $in: ['paid', 'completed'] } });
    
    const totalEarnings = completedRentals.reduce((acc, rental) => acc + rental.totalPrice, 0);

    res.json({
        success: true,
        stats: {
            activeProducts,
            totalEarnings,
            requestsRaised,
        }
    });
});
/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

/**
 * @desc    Submit KYC documents
 * @route   POST /api/users/kyc
 * @access  Private
 */
const submitKyc = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { aadhaarImage, selfieImage, collegeIdImage } = req.body;

    if (!aadhaarImage || !selfieImage || !collegeIdImage) {
        res.status(400);
        throw new Error('All documents are required');
    }

    user.verification = {
        ...user.verification,
        status: 'pending',
        aadhaarImage,
        selfieImage,
        collegeIdImage,
        rejectionReason: null
    };

    await user.save({ validateBeforeSave: false });
    res.json({ message: 'KYC submitted successfully ✅', verification: user.verification });
});


//--------------------------------------------------------------------------//
//                                 Exports                                  //
//--------------------------------------------------------------------------//
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUserPublicProfile,
    submitKyc,
    getUserItems, // Yeh "My Items" page ke liye hai
    getDashboardStats,
    getUsers,
};
