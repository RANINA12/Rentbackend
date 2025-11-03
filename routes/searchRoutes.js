const express = require('express');
const router = express.Router();
const { universalSearch, getPopularAndTop } = require('../controllers/searchController');

// Route for live search (jab user type kare)
router.get('/', universalSearch);

// Route for popular results (jab user click kare) - YEH ZAROORI HAI
router.get('/popular', getPopularAndTop);

module.exports = router;
