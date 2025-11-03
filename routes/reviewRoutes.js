// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middlewares/authMiddleware');
// const { createItemReview, getItemReviews } = require('../controllers/reviewController'); // 👈 Naya function import karein

// // POST /api/reviews/:itemId -> Naya review banayein
// // GET /api/reviews/:itemId -> Item ke saare reviews fetch karein
// router.route('/:itemId')
//     .post(protect, createItemReview)
//     .get(getItemReviews); // 👈 Naya GET route

// module.exports = router;



//---------------------------------------

const express = require('express');
const router = express.Router();
const {
    createItemReview,
    getItemReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

// --- Routes ---

// GET /api/reviews/:itemId - Ek item ke saare reviews paayein
// YEH ROUTE PUBLIC HONA CHAHIYE (bina login ke bhi chale)
router.get('/:itemId', getItemReviews);

// POST /api/reviews/:itemId - Naya review banayein
// YEH ROUTE PROTECTED HONA CHAHIYE (sirf logged-in user hi review de sake)
router.post('/:itemId', protect, createItemReview);

module.exports = router;