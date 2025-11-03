    // const express = require('express');
    // const router = express.Router();
    // const {
    //   getItems,
    //   getFeaturedItems, // Naya import
    //   getItemById,
    //   createItem,
    //   updateItem,
    //   deleteItem,
    // } = require('../controllers/itemController');
    // const { protect } = require('../middlewares/authMiddleware');
    // const upload = require('../middlewares/uploadMiddleware');

    // router.route('/').get(getItems).post(protect, upload, createItem);
    
    // // --- Naya Featured Route ---
    // // Is line ko /:id se pehle rakhein
    // router.route('/featured').get(getFeaturedItems); 

    // router
    //   .route('/:id')
    //   .get(getItemById)
    //   .put(protect, updateItem)
    //   .delete(protect, deleteItem);

    // module.exports = router;
    

//     const express = require('express');
// const router = express.Router();

// // --- Controller and Middleware Imports ---
// const {
//     getItems,
//     getFeaturedItems,
//     getItemById,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
//     getItemsByCategory,
//     getItemsForMap, // 👈 YEH IMPORT MISSING THA
// } = require('../controllers/itemController');
// const { protect } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// //--------------------------------------------------------------------------//
// //                          API Routes
// //--------------------------------------------------------------------------//

// // --- Primary Collection Routes ---
// router.route('/')
//     .get(getItems)
//     .post(protect, upload.array('images', 4), createItem);

// // --- Specialized GET Routes (for filtering, etc.) ---
// router.get('/featured', getFeaturedItems);
// router.get('/map-data', getItemsForMap); // Map ke liye route
// router.get('/category/:categoryName', getItemsByCategory);

// // --- Utility Routes ---
// router.post('/suggest-price', protect, suggestPrice);

// // --- Single Document Routes (by ID) ---
// // IMPORTANT: ID waale routes hamesha aakhir mein rakhein
// router.route('/:id')
//     .get(getItemById)
//     .put(protect, updateItem)
//     .delete(protect, deleteItem);

// module.exports = router;

//chatgpt

// const express = require('express');
// const router = express.Router();

// // // --- Controller Imports ---
// // const {
// //   getItems,
// //   getFeaturedItems,
// //   getItemById,
// //   createItem,
// //   updateItem,
// //   deleteItem,
// //   suggestPrice,
// //   getItemsByCategory,
// //   getItemsForMap,
// // } = require('../controllers/itemController');

// // // --- Middlewares ---
// // const { protect } = require('../middlewares/authMiddleware');
// // const upload = require('../middlewares/uploadMiddleware');

// // //--------------------------------------------------------------------------//
// // //                          API Routes
// // //--------------------------------------------------------------------------//

// // // --- Collection Routes ---
// // router
// //   .route('/')
// //   .get(getItems) // All items
// //   .post(protect, upload.array('images', 4), createItem); // Create item with images

// // // --- Specialized Routes ---
// // router.get('/featured', getFeaturedItems); // Featured products
// // router.get('/map-data', getItemsForMap); // Items for map (geoJSON)
// // router.get('/category/:categoryName', getItemsByCategory); // Category-based fetch

// // // --- Utility Route ---
// // router.post('/suggest-price', protect, suggestPrice); // Suggest rental price

// // // --- Single Item Routes (Always last for ID safety) ---
// // router
// //   .route('/:id')
// //   .get(getItemById) // Get one item
// //   .put(protect, updateItem) // Update item
// //   .delete(protect, deleteItem); // Delete item

// // module.exports = router;


// //chatgpt code 2

// const express = require('express');
// const router = express.Router();

// // --- Controllers ---
// const {
//   getItems,
//   getFeaturedItems,
//   getItemById,
//   createItem,
//   updateItem,
//   deleteItem,
//   suggestPrice,
//   getItemsByCategory,
//   getItemsForMap,
// } = require('../controllers/itemController');

// // --- Middlewares ---
// const { protect } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// //--------------------------------------------------------------------------//
// //                          API Routes
// //--------------------------------------------------------------------------//

// // --- All items + Create new ---
// router
//   .route('/')
//   .get(getItems)
//   .post(protect, upload.array('images', 4), createItem);

// // --- Specialized ---
// router.get('/featured', getFeaturedItems);
// router.get('/map-data', getItemsForMap);
// router.get('/category/:categoryName', getItemsByCategory);

// // --- Utility ---
// router.post('/suggest-price', protect, suggestPrice);

// // --- Single Item (keep last for safety) ---
// router
//   .route('/:id')
//   .get(getItemById)
//   .put(protect, updateItem)
//   .delete(protect, deleteItem);

// module.exports = router;



// const express = require('express');
// const router = express.Router();

// // --- Controller Imports ---
// const {
//   getItems,
//   getFeaturedItems,
//   getItemById,
//   createItem,
//   updateItem,
//   deleteItem,
//   suggestPrice,
//   getItemsByCategory,
//   getItemsForMap,
// } = require('../controllers/itemController');

// // --- Middlewares ---
// const { protect } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// //--------------------------------------------------------------------------//
// //                              API Routes
// //--------------------------------------------------------------------------//

// // --- All items + Create new ---
// router
//   .route('/')
//   .get(getItems)
//   .post(protect, upload.array('images', 4), createItem);

// // --- Specialized GET Routes (Yeh ID waale route se pehle aane chahiye) ---
// router.get('/featured', getFeaturedItems);
// router.get('/map-data', getItemsForMap);
// router.get('/category/:categoryName', getItemsByCategory);

// // --- Utility Route ---
// router.post('/suggest-price', protect, suggestPrice);

// // --- Single Item Routes (Hamesha aakhir me rakhein) ---
// router
//   .route('/:id')
//   .get(getItemById)
//   .put(protect, updateItem)
//   .delete(protect, deleteItem);

// module.exports = router;



//-------------------------------------


// const express = require('express');
// const router = express.Router();

// // --- Controller aur Middleware ko import karein ---
// const {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsForMap,
//     suggestPrice
// } = require('../controllers/itemController');
// const { protect } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// //--------------------------------------------------------------------------//
// //                               API Routes                                 //
// //--------------------------------------------------------------------------//

// /*
//  * Route Order Explanation:
//  * 1. Specific string routes ('/featured', '/my-items') pehle aate hain.
//  * 2. Dynamic routes ('/:id', '/category/:categoryName') baad mein aate hain.
//  * Aisa isliye zaroori hai kyunki agar '/:id' pehle aa gaya, to Express '/featured' ko ek ID maan lega.
// */

// // --- PRIVATE: User-Specific Routes (Login Zaroori) ---
// // Yeh route '/:id' se pehle aana zaroori hai.
// router.get('/my-items', protect, getMyItems);

// // --- PUBLIC: Specialized GET Routes (Bina login ke bhi chalenge) ---
// router.get('/featured', getFeaturedItems);
// router.get('/map-data', getItemsForMap);
// router.get('/category/:categoryName', getItemsByCategory);

// // --- PUBLIC & PRIVATE: General Collection Routes ---
// router.route('/')
//     .get(getItems) // Sabhi items fetch karna (Public)
//     .post(protect, upload.array('images', 5), createItem); // Naya item banana (Private)

// // --- PRIVATE: Utility Routes ---
// router.post('/suggest-price', protect, suggestPrice);

// // --- PUBLIC & PRIVATE: Single Item Routes (by ID) ---
// // Yeh route hamesha aakhir mein hona chahiye.
// router.route('/:id')
//     .get(getItemById) // Ek item ki details dekhna (Public)
//     .put(protect, updateItem) // Item ko update karna (Private)
//     .delete(protect, deleteItem); // Item ko delete karna (Private)

// module.exports = router;


//---------------------------------------------

const express = require('express');
const router = express.Router();

// --- Controller aur Middleware Imports ---
const {
    getItems,
    getItemById,
    getFeaturedItems,
    getItemsByCategory,
    getItemsForMap,
    createItem,
    updateItem,
    deleteItem,
    suggestPrice,
    getMyItems, // MyItems page ke liye
} = require('../controllers/itemController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

//--------------------------------------------------------------------------//
//                              API Routes
//--------------------------------------------------------------------------//
/*
 * Route Order Explanation:
 * 1. Specific string routes ('/featured', '/my-items') pehle aate hain.
 * 2. Dynamic routes ('/:id', '/category/:categoryName') baad mein aate hain.
 * Aisa isliye zaroori hai kyunki agar '/:id' pehle aa gaya, to Express '/featured' ko ek ID maan lega.
*/

// --- PRIVATE: User-Specific Routes (Login Zaroori) ---
// GET /api/items/my-items -> Apne saare listed items dekhein
router.get('/my-items', protect, getMyItems);

// --- PUBLIC: Specialized GET Routes (Bina login ke bhi chalenge) ---
// GET /api/items/featured -> Featured items fetch karein
router.get('/featured', getFeaturedItems);
// GET /api/items/map-data -> Map ke liye item data fetch karein
router.get('/map-data', getItemsForMap);
// GET /api/items/category/:categoryName -> Category ke hisaab se items fetch karein
router.get('/category/:categoryName', getItemsByCategory);


// --- PUBLIC & PRIVATE: General Collection Routes ---
// GET /api/items -> Saare items fetch karein (Public)
// POST /api/items -> Naya item banayein (Private)
router.route('/')
    .get(getItems)
    .post(protect, upload.array('images', 4), createItem);

// --- PRIVATE: Utility Routes ---
// POST /api/items/suggest-price -> AI price suggestion ke liye
router.post('/suggest-price', protect, suggestPrice);


// --- PUBLIC & PRIVATE: Single Item Routes (by ID) ---
// Yeh route hamesha aakhir mein hona chahiye.
router.route('/:id')
    .get(getItemById) // Ek item ki details dekhna (Public)
    .put(protect, updateItem) // Item ko update karna (Private)
    .delete(protect, deleteItem); // Item ko delete karna (Private)

module.exports = router;
