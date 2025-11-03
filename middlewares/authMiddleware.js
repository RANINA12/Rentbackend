// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler'); // Make sure you have this
// const User = require('../models/userModel');

// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             // Get token from header
//             token = req.headers.authorization.split(' ')[1];

//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Get user from the token
//             req.user = await User.findById(decoded.id).select('-password');

//             if (!req.user) {
//                 // If user is not found with that token, send an error
//                 return res.status(401).json({ message: 'Not authorized, user not found' });
//             }

//             next(); // Move to the next middleware/controller
//         } catch (error) {
//             console.error(error);
//             // If token is invalid or expired
//             return res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }

//     // This block runs if the 'if' condition above is false
//     if (!token) {
//         // **THE MAIN FIX IS HERE**
//         // Instead of throwing an error that crashes the server,
//         // we send a clean JSON response.
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }
// });

// const admin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         // Also fix this to send a JSON response
//         return res.status(401).json({ message: 'Not authorized as an admin' });
//     }
// };

// module.exports = { protect, admin };
// //change 1

// // const jwt = require('jsonwebtoken');
// // const asyncHandler = require('express-async-handler');
// // const User = require('../models/userModel');

// // const protect = asyncHandler(async (req, res, next) => {
// //   let token;

// //   // 1. Check karein ki request ke header mein authorization hai aur woh 'Bearer' se shuru ho raha hai
// //   if (
// //     req.headers.authorization &&
// //     req.headers.authorization.startsWith('Bearer')
// //   ) {
// //     try {
// //       // 2. Header se token nikalein ('Bearer ' waale hisse ko hata kar)
// //       token = req.headers.authorization.split(' ')[1];

// //       // 3. Token ko verify karein
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //       // 4. Token ki ID se user ko database mein dhoondhein aur use req.user mein save kar dein
// //       // Password ko chhodkar saari details le aao
// //       req.user = await User.findById(decoded.id).select('-password');

// //       next(); // Agle middleware ya controller par jaao
// //     } catch (error) {
// //       console.error(error);
// //       res.status(401);
// //       throw new Error('Not authorized, token failed');
// //     }
// //   }

// //   // 5. Agar token hai hi nahi, toh error bhejein
// //   if (!token) {
// //     res.status(401);
// //     throw new Error('Not authorized, no token');
// //   }
// // });

// // module.exports = { protect };

//version before admin

// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');

// /**
//  * @desc    Protect routes - Middleware to verify JWT token
//  * @access  Private
//  */
// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     // Step 1: Check if the request has an Authorization header starting with 'Bearer'
//     // Step 1: Check karein ki request me Authorization header hai aur 'Bearer' se shuru ho raha hai
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Step 2: Extract the token from the header (Bearer TOKEN -> TOKEN)
//             // Step 2: Header se token nikalein
//             token = req.headers.authorization.split(' ')[1];

//             // Step 3: Verify the token using the secret key
//             // Step 3: Token ko secret key se verify karein
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Step 4: Find the user in the database using the ID from the token
//             // Password ko chhodkar saari details le aayein
//             req.user = await User.findById(decoded.id).select('-password');

//             // Edge Case: Agar token sahi hai lekin user database se delete ho chuka hai
//             if (!req.user) {
//                 res.status(401);
//                 throw new Error('Not authorized, user for this token no longer exists.');
//             }

//             // Step 5: Proceed to the next middleware or the main controller function
//             // Step 5: Agle step par jaayein
//             next();

//         } catch (error) {
//             console.error('Token verification failed:', error.message);
//             res.status(401);
//             throw new Error('Not authorized, token failed.');
//         }
//     }

//     // This block runs if no token is found in the header
//     // Yeh block tab chalega jab header me token hi na ho
//     if (!token) {
//         res.status(401);
//         throw new Error('Not authorized, no token provided.');
//     }
// });

// /**
//  * @desc    Admin middleware - Checks if the user is an admin
//  * @access  Private/Admin
//  */
// const admin = (req, res, next) => {
//     // Check if user is logged in (from 'protect' middleware) AND is an admin
//     if (req.user && req.user.isAdmin) {
//         next(); // User is an admin, proceed
//     } else {
//         res.status(403); // 403 Forbidden is more appropriate than 401 Unauthorized here
//         throw new Error('Not authorized as an admin.');
//     }
// };

// module.exports = { protect, admin };

//after admin panel

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/**
 * @desc    Protected Route Middleware: Yeh check karta hai ki user logged-in hai ya nahi.
 * Yeh har uss private route se pehle chalega jiske liye login zaroori hai.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check karein ki request ke header me 'Authorization' hai aur woh 'Bearer' se shuru ho raha hai
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Header se token nikalein ('Bearer TOKEN' -> 'TOKEN')
            token = req.headers.authorization.split(' ')[1];

            // Token ko verify karein
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Token se user ID nikal kar database se user ki details nikalein (password chhodkar)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user for this token no longer exists.');
            }

            // Sab theek hai, ab agle step (controller) par jao
            next();

        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed.');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided.');
    }
});

/**
 * @desc    Admin Route Middleware: Yeh check karta hai ki logged-in user admin hai ya nahi.
 * Yeh 'protect' middleware ke baad chalega.
 */
const admin = (req, res, next) => {
    // 'protect' middleware ne req.user set kar diya hai.
    // Ab bas check karo ki user maujood hai aur uske paas admin rights hain.
    if (req.user && req.user.isAdmin) {
        next(); // Haan, user admin hai, aage badho.
    } else {
        res.status(403); // 403 Forbidden - Tumhe yahan aane ki permission nahi hai.
        throw new Error('Not authorized as an admin.');
    }
};

module.exports = { protect, admin };