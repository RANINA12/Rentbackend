// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middlewares/authMiddleware');
// const { createPost, getAllPosts, getPostBySlug } = require('../controllers/postController');
// const upload = require('../middlewares/uploadMiddleware'); // Aapka file upload middleware

// // GET /api/posts -> Saare posts fetch karein
// // POST /api/posts -> Naya post banayein (sirf admin)
// router.route('/')
//     .get(getAllPosts)
//     .post(protect, admin, upload.single('featuredImage'), createPost);

// // GET /api/posts/:slug -> Ek single post uske slug se fetch karein
// router.route('/:slug').get(getPostBySlug);

// module.exports = router;

//******************* */

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
// Naya controller function import karein
const { createPost, getAllPosts, getPostBySlug, deletePostAdmin } = require('../controllers/postController');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getAllPosts)
    .post(protect, admin, upload.single('featuredImage'), createPost);

router.route('/:slug').get(getPostBySlug);

// --- YEH NAYA ROUTE ADD KAREIN ---
// @desc    Delete a post by admin
// @route   DELETE /api/posts/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin, deletePostAdmin);
// Note: Hum yahan ':id' use kar rahe hain, ':slug' nahi, kyunki ID unique hoti hai.

module.exports = router;