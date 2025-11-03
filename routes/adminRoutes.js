// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middlewares/authMiddleware');

// const {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost
// } = require('../controllers/adminController');

// // Dashboard
// router.get('/stats', protect, admin, getStats);

// // User Management
// router.route('/users')
//     .get(protect, admin, getAllUsers);
// router.route('/users/:id')
//     .delete(protect, admin, deleteUser);

// // Blog Management
// router.route('/posts')
//     .get(protect, admin, getAllPosts)
//     .post(protect, admin, createPost);

// module.exports = router;


//******************* */

// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware Imports ---
// const {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost
// } = require('../controllers/adminController');
// const { protect, admin } = require('../middlewares/authMiddleware');

// // =================================================================
// //                      ADMIN API ROUTES (/api/admin)
// // =================================================================
// // Note: Yahan har route pehle 'protect' se check hota hai ki user logged-in hai,
// // fir 'admin' se check hota hai ki user admin hai.

// /**
//  * @desc    Dashboard stats fetch karna
//  * @route   GET /api/admin/stats
//  * @access  Private/Admin
//  */
// router.route('/stats').get(protect, admin, getStats);

// // --- User Management Routes ---
// /**
//  * @desc    Saare users ki list fetch karna
//  * @route   GET /api/admin/users
//  * @access  Private/Admin
//  */
// router.route('/users').get(protect, admin, getAllUsers);

// /**
//  * @desc    Ek user ko uski ID se delete karna
//  * @route   DELETE /api/admin/users/:id
//  * @access  Private/Admin
//  */
// router.route('/users/:id').delete(protect, admin, deleteUser);


// // --- Blog Management Routes ---
// /**
//  * @desc    Saare posts fetch karna ya naya post create karna
//  * @route   GET /api/admin/posts
//  * @route   POST /api/admin/posts
//  * @access  Private/Admin
//  */
// router.route('/posts')
//     .get(protect, admin, getAllPosts)
//     .post(protect, admin, createPost);

// module.exports = router;


///*********** */ ye sahi he token ke sath

// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware Imports ---
// const {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost,
//     dataExplorer,
//     // [FIX] Naye KYC functions import kiye
//     getKycRequests,
//     approveKyc,
//     rejectKyc
// } = require('../controllers/adminController');
// const { protect, admin } = require('../middlewares/authMiddleware');

// // =================================================================
// //                      ADMIN API ROUTES (/api/admin)
// // =================================================================

// // --- Dashboard & Explorer ---
// router.route('/stats').get(protect, admin, getStats);
// router.route('/explorer').get(protect, admin, dataExplorer);

// // --- User Management Routes ---
// router.route('/users').get(protect, admin, getAllUsers);
// router.route('/users/:id').delete(protect, admin, deleteUser);

// // --- Blog Management Routes ---
// router.route('/posts')
//     .get(protect, admin, getAllPosts)
//     .post(protect, admin, createPost);

// // --- [NEW] KYC Management Routes ---
// /**
//  * @desc    Saari pending KYC requests fetch karna
//  * @route   GET /api/admin/kyc-requests
//  * @access  Private/Admin
//  */
// router.route('/kyc-requests').get(protect, admin, getKycRequests);

// /**
//  * @desc    Ek user ki KYC request ko approve karna
//  * @route   PUT /api/admin/kyc-requests/:userId/approve
//  * @access  Private/Admin
//  */
// router.route('/kyc-requests/:userId/approve').put(protect, admin, approveKyc);

// /**
//  * @desc    Ek user ki KYC request ko reject karna
//  * @route   PUT /api/admin/kyc-requests/:userId/reject
//  * @access  Private/Admin
//  */
// router.route('/kyc-requests/:userId/reject').put(protect, admin, rejectKyc);


// module.exports = router;


//******************/ 30/9

// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware Imports ---
// const {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     getAllPosts,
//     createPost,
//     dataExplorer,
//     getDashboardStats,
//     getKycRequests,
//     approveKyc,
//     rejectKyc
// } = require('../controllers/adminController');
// const { protect, admin } = require('../middlewares/authMiddleware');

// // =================================================================
// //                         ADMIN API ROUTES (/api/admin)
// // =================================================================

// // --- Dashboard & Explorer ---
// router.route('/stats').get(protect, admin, getStats);
// router.route('/explorer').get(protect, admin, dataExplorer);

// // --- User Management Routes ---
// router.route('/users').get(protect, admin, getAllUsers);
// router.route('/users/:id').delete(protect, admin, deleteUser);

// // --- Blog Management Routes ---
// router.route('/posts')
//     .get(protect, admin, getAllPosts)
//     .post(protect, admin, createPost);

// // --- [FIX] KYC Management Routes (Bina Token Ke) ---
// /**
//  * @desc      Saari pending KYC requests fetch karna
//  * @route     GET /api/admin/kyc-requests
//  * @access    Public (Temporarily)
//  */
// router.route('/kyc-requests').get(getKycRequests); // Yahan se 'protect' aur 'admin' hataya

// /**
//  * @desc      Ek user ki KYC request ko approve karna
//  * @route     PUT /api/admin/kyc-requests/:userId/approve
//  * @access    Public (Temporarily)
//  */
// router.route('/kyc-requests/:userId/approve').put(approveKyc); // Yahan se 'protect' aur 'admin' hataya

// /**
//  * @desc      Ek user ki KYC request ko reject karna
//  * @route     PUT /api/admin/kyc-requests/:userId/reject
//  * @access    Public (Temporarily)
//  */
// router.route('/kyc-requests/:userId/reject').put(rejectKyc); // Yahan se 'protect' aur 'admin' hataya

// router.route('/stats').get(protect, admin, getDashboardStats);

// module.exports = router;

//************* */

// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware Imports ---
// const {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     dataExplorer,
//     getKycRequests,
//     approveKyc,
//     rejectKyc,
//     // Note: Blog-related functions adminController me nahi hain,
//     // unke liye postController ka use hona chahiye.
//     // Lekin agar aapne unhe adminController me rakha hai, toh unhe yahan import karein.
// } = require('../controllers/adminController');

// const { protect, admin } = require('../middlewares/authMiddleware');

// // =================================================================
// //                  ADMIN API ROUTES (/api/admin)
// // =================================================================

// // --- Dashboard & Explorer ---
// // GET /api/admin/stats - Dashboard analytics data
// router.route('/stats').get(protect, admin, getStats);

// // GET /api/admin/explorer - Database query explorer
// router.route('/explorer').get(protect, admin, dataExplorer);

// // --- User Management Routes ---
// // GET /api/admin/users - Get all users
// router.route('/users').get(protect, admin, getAllUsers);
// // DELETE /api/admin/users/:id - Delete a user
// router.route('/users/:id').delete(protect, admin, deleteUser);

// // --- KYC Management Routes ---
// // GET /api/admin/kyc-requests - Get all pending KYC requests
// router.route('/kyc-requests').get(protect, admin, getKycRequests);
// // PUT /api/admin/kyc-requests/:userId/approve - Approve a KYC request
// router.route('/kyc-requests/:userId/approve').put(protect, admin, approveKyc);
// // PUT /api/admin/kyc-requests/:userId/reject - Reject a KYC request
// router.route('/kyc-requests/:userId/reject').put(protect, admin, rejectKyc);

// module.exports = router;

//****************** */

// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware Imports ---
// const {
//     getStats,
//     getAllUsers,
//     deleteUser,
//     dataExplorer,
//     getKycRequests,
//     approveKyc,
//     rejectKyc,
// } = require('../controllers/adminController');

// const { protect, admin } = require('../middlewares/authMiddleware');

// // =================================================================
// //                  ADMIN API ROUTES (/api/admin)
// // =================================================================

// // --- Dashboard & Explorer (Secured) ---
// router.route('/stats').get(protect, admin, getStats);
// router.route('/explorer').get(protect, admin, dataExplorer);

// // --- User Management Routes (Secured) ---
// router.route('/users').get(protect, admin, getAllUsers);
// router.route('/users/:id').delete(protect, admin, deleteUser);

// // --- KYC Management Routes (Public - NOT SECURE) ---
// router.route('/kyc-requests').get(getKycRequests);
// router.route('/kyc-requests/:userId/approve').put(approveKyc);
// router.route('/kyc-requests/:userId/reject').put(rejectKyc);

// module.exports = router;

//*********** */

/****************** Admin Routes ******************/

const express = require('express');
const router = express.Router();

// --- Controller Imports ---
const {
    getStats,
    getAllUsers,
    deleteUser,
    dataExplorer,
    getKycRequests,
    approveKyc,
    rejectKyc,
} = require('../controllers/adminController');

// --- Middleware Imports ---
const { protect, admin } = require('../middlewares/authMiddleware');

// =================================================================
//                  ADMIN API ROUTES (/api/admin)
// =================================================================

// --- Dashboard & Data Explorer (Secured) ---
router.get('/stats', protect, admin, getStats);
router.get('/explorer', protect, admin, dataExplorer);

// --- User Management Routes (Secured) ---
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

// --- KYC Management Routes (Secured) ---
router.get('/kyc-requests', protect, admin, getKycRequests);
router.put('/kyc-requests/:userId/approve', protect, admin, approveKyc);
router.put('/kyc-requests/:userId/reject', protect, admin, rejectKyc);

module.exports = router;
