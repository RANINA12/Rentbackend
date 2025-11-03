const express = require('express');
const router = express.Router();

// Controller functions ko import karein
const {
    createRental,
    getMyRentals,
    updateRentalStatus,
    getIncomingRequests, // Naya function import karein
     generateAgreement, // 👈 Naya function
    acceptAgreement ,
    markRentalComplete 
} = require('../controllers/rentalController');

// Middleware import karein
const { protect } = require('../middlewares/authMiddleware');

// POST /api/rentals -> Naya rental order banayein
router.route('/').post(protect, createRental);

// GET /api/rentals/myrentals -> Renter apne rentals dekhega
router.route('/myrentals').get(protect, getMyRentals);

// === YEH NAYA ROUTE HAI ===
// GET /api/rentals/incoming -> Owner apne items par aayi requests dekhega
router.route('/incoming').get(protect, getIncomingRequests);

// PATCH /api/rentals/:id -> Owner rental ka status update karega
router.route('/:id').patch(protect, updateRentalStatus);

// GET /api/rentals/:id/agreement -> PDF agreement download karein
router.route('/:id/agreement').get(protect, generateAgreement);

// POST /api/rentals/:id/accept-agreement -> Agreement ko accept karein
router.route('/:id/accept-agreement').post(protect, acceptAgreement);

// POST /api/rentals/:id/complete
router.route('/:id/complete').post(protect, markRentalComplete);

module.exports = router;