// // const express = require('express');
// // const router = express.Router();

// // // --- Controller and Middleware Imports ---
// // const {
// //     // registerUser, // Maan rahe hain ki yeh functions aapke controller mein hain
// //     // loginUser,    // Maan rahe hain ki yeh functions aapke controller mein hain
// //     getUserProfile,
// //     updateUserProfile,
// //     updateUserAvatar,
// //       getDashboardStats, 
// //     getUserItems

// // } = require('../controllers/userController');
// // const { protect } = require('../middlewares/authMiddleware');


// // //--------------------------------------------------------------------------//
// // //                          API Routes
// // //--------------------------------------------------------------------------//

// // // --- Public Authentication Routes ---
// // // POST /api/users/register -> Naya user register karein
// // // router.post('/register', registerUser); 
// // // POST /api/users/login -> User ko login karein
// // // router.post('/login', loginUser);


// // // --- Private Profile Route ---
// // // GET /api/users/profile -> Logged-in user ki profile dekhein
// // // PUT /api/users/profile -> Logged-in user ki profile update karein
// // router.route('/profile')
// //     .get(protect, getUserProfile)
// //     .put(protect, updateUserProfile);

// // // GET /api/users/stats
// // router.route('/stats').get(protect, getDashboardStats);
// // // --- Public Route for User's Items ---
// // // GET /api/users/:id/items -> Kisi bhi user ke saare items dekhein
// // router.route('/:id/items').get(getUserItems);

// // router.route('/profile/avatar')
// //     .put(protect, upload.single('avatar'), updateUserAvatar); 

// // module.exports = router;





// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware Imports ---
// const {
//     registerUser,
//     loginUser,
//     getUserProfile,
//     updateUserProfile,
//     getUserPublicProfile,
//     getDashboardStats,
//     getUsers, // Admin ke liye
// } = require('../controllers/userController');
// const { protect, admin } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// //--------------------------------------------------------------------------//
// //                              API Routes
// //--------------------------------------------------------------------------//

// // --- Authentication Routes ---
// // POST /api/users/register -> Naya user register karein
// router.post('/register', registerUser);
// // POST /api/users/login -> User ko login karein
// router.post('/login', loginUser);

// // --- Private Profile Routes ---
// // GET /api/users/profile -> Apne profile ki details dekhein
// // PUT /api/users/profile -> Apne profile ko update karein (avatar ke saath)
// router.route('/profile')
//     .get(protect, getUserProfile)
//     .put(protect, upload.single('avatar'), updateUserProfile);

// // --- Dashboard Stats Route ---
// // GET /api/users/dashboard-stats -> Apne dashboard ke stats dekhein
// router.get('/dashboard-stats', protect, getDashboardStats);


// // --- Public Profile Route ---
// // GET /api/users/:userId/public-profile -> Kisi aur user ka public profile dekhein
// router.get('/:userId/public-profile', getUserPublicProfile);


// // --- Admin Routes ---
// // GET /api/users -> Saare users ki list dekhein (sirf admin ke liye)
// router.route('/').get(protect, admin, getUsers);

// module.exports = router;


// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware ko import karein ---
// const {
//     registerUser,
//     loginUser,
//     getUserProfile,
//     updateUserProfile,
//     getUserPublicProfile,
//     getDashboardStats, // <-- Isey import karna zaroori hai
//     getUsers,
//     getUserItems,     // <-- Isey import karna zaroori hai
// } = require('../controllers/userController');
// const { protect, admin } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// //--------------------------------------------------------------------------//
// //                          API Routes
// //--------------------------------------------------------------------------//

// // --- Authentication Routes ---
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // --- Admin Routes ---
// router.get('/', protect, admin, getUsers);

// // --- YAHI DO ROUTES SABSE ZAROORI HAIN ---
// // Logged-in user ke dashboard stats ke liye
// router.get('/stats', protect, getDashboardStats);
// // Kisi bhi user ke saare items dekhne ke liye (My Items page)
// router.get('/:userId/items', getUserItems);


// // --- Public Profile Route ---
// router.get('/public-profile/:userId', getUserPublicProfile);

// // --- Private Profile Routes (Current User) ---
// // Note: Yeh '/stats' ke baad aana chahiye
// router.route('/profile')
//     .get(protect, getUserProfile)
//     .put(protect, upload.single('avatar'), updateUserProfile);


// module.exports = router;


// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware ko import karein ---
// const {
//     registerUser,
//     loginUser,
//     getUserProfile,
//     updateUserProfile,
//     getUserPublicProfile,
//     getDashboardStats,
//     getUsers,
//     getUserItems,
// } = require('../controllers/userController');
// const { protect, admin } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// //--------------------------------------------------------------------------//
// //                              API Routes
// //--------------------------------------------------------------------------//

// // --- Authentication Routes ---
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // --- Admin Routes ---
// router.get('/', protect, admin, getUsers);

// // --- Dashboard & User's Items Routes ---

// // Logged-in user ke dashboard stats ke liye
// router.get('/stats', protect, getDashboardStats);

// // [SUDHAR YAHAN HAI] - Is route ko protect middleware se surakshit karein
// // User ke apne items dekhne ke liye (My Items page)
// router.get('/:userId/items', protect, getUserItems);


// // --- Public Profile Route ---
// router.get('/public-profile/:userId', getUserPublicProfile);

// // --- Private Profile Routes (Current User) ---
// router.route('/profile')
//     .get(protect, getUserProfile)
//     .put(protect, upload.single('avatar'), updateUserProfile);


// module.exports = router;

//******************************************* */

const express = require('express');
const router = express.Router();

// --- Controller aur Middleware ko import karein ---
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUserPublicProfile,
    submitKyc,
    getDashboardStats,
    getUsers,
    getUserItems, // Yeh "My Items" page ke liye hai
} = require('../controllers/userController');

const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Maan rahe hain ki aapke paas yeh middleware hai

//--------------------------------------------------------------------------//
//                                  API Routes                              //
//--------------------------------------------------------------------------//

// --- 1. Authentication Routes (Public) ---
// Naya user register karne ke liye
router.post('/register', registerUser);
// User ko login karne ke liye
router.post('/login', loginUser);


// --- 2. Private User Routes (Logged-in user ke liye) ---
// User ki apni profile details paane aur update karne ke liye
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, upload.single('avatar'), updateUserProfile);

// User ke dashboard stats ke liye
router.get('/stats', protect, getDashboardStats);

// User ke apne list kiye hue items paane ke liye (My Items Page)
// YEH SABSE ZAROORI ROUTE HAI AAPKI PROBLEM KE LIYE
router.get('/my-items', protect, getUserItems);


// --- 3. Public Profile Route ---
// Kisi bhi user ka public profile dekhne ke liye
router.get('/public-profile/:userId', getUserPublicProfile);


// --- 4. Admin Routes (Sirf Admin ke liye) ---
// Saare users ki list paane ke liye
router.get('/', protect, admin, getUsers);

router.post('/kyc', protect, submitKyc);



module.exports = router;