// // const User = require('../models/userModel');
// // const generateToken = require('../utils/generateToken');
// // const crypto = require("crypto");

// // /**
// //  * @desc    Register a new user
// //  * @route   POST /api/auth/register
// //  * @access  Public
// //  */
// // const registerUser = async (req, res, next) => {
// //   try {
// //     const { name, email, password, confirmPassword, phone } = req.body;

// //     if (password !== confirmPassword) {
// //       res.status(400);
// //       throw new Error("Passwords do not match");
// //     }

// //     const userExists = await User.findOne({ email });
// //     if (userExists) {
// //       res.status(400);
// //       throw new Error("User already exists");
// //     }

// //     const user = await User.create({
// //       name,
// //       email,
// //       password,
// //       phone,
// //     });

// //     if (user) {
// //       res.status(201).json({
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         phone: user.phone,
// //         token: generateToken(user._id),
// //       });
// //     } else {
// //       res.status(400);
// //       throw new Error("Invalid user data");
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * @desc    Authenticate user & get token
// //  * @route   POST /api/auth/login
// //  * @access  Public
// //  */
// // const loginUser = async (req, res, next) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (user && (await user.matchPassword(password))) {
// //       res.json({
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         phone: user.phone,
// //         token: generateToken(user._id),
// //         verification: user.verification,
// //         avatar: user.avatar,
// //         bio: user.bio,
// //         address: user.address,
// //         phone: user.phone,
// //       });
// //     } else {
// //       res.status(401);
// //       throw new Error("Invalid email or password");
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * @desc    Forgot password (dummy reset token)
// //  * @route   POST /api/auth/forgot-password
// //  * @access  Public
// //  */
// // const forgotPassword = async (req, res, next) => {
// //   try {
// //     const { email } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       res.status(404);
// //       throw new Error("User not found");
// //     }

// //     // Simple reset token (you can send via email in production)
// //     const resetToken = crypto.randomBytes(20).toString("hex");

// //     // Save token in DB temporarily
// //     user.resetToken = resetToken;
// //     user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 min
// //     await user.save();

// //     res.json({ message: "Reset token generated", resetToken });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // module.exports = { registerUser, loginUser, forgotPassword };

// //chnage 2

// // const asyncHandler = require('express-async-handler');
// // const User = require('../models/userModel');
// // const generateToken = require('../utils/generateToken');

// // //--------------------------------------------------------------------------//
// // // @desc    Register a new user
// // // @route   POST /api/auth/register
// // // @access  Public
// // //--------------------------------------------------------------------------//
// // const registerUser = asyncHandler(async (req, res) => {
// //     const { name, email, password, phone } = req.body;

// //     // Check if user already exists
// //     const userExists = await User.findOne({ email });
// //     if (userExists) {
// //         res.status(400);
// //         throw new Error('User with this email already exists');
// //     }

// //     // Create new user
// //     const user = await User.create({
// //         name,
// //         email,
// //         password,
// //         phone,
// //     });

// //     if (user) {
// //         // Return user data and token upon successful registration
// //         res.status(201).json({
// //             _id: user._id,
// //             name: user.name,
// //             email: user.email,
// //             phone: user.phone,
// //             isAdmin: user.isAdmin,
// //             verification: user.verification,
// //             avatar: user.avatar,
// //             bio: user.bio,
// //             address: user.address,
// //             token: generateToken(user._id),
// //         });
// //     } else {
// //         res.status(400);
// //         throw new Error('Invalid user data');
// //     }
// // });

// //--------------------------------------------------------------------------//
// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// //--------------------------------------------------------------------------//
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });

//     // Check if user exists and password matches
//     if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             isAdmin: user.isAdmin,
//             verification: user.verification,
//             avatar: user.avatar,
//             bio: user.bio,
//             address: user.address,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(401); // Unauthorized
//         throw new Error('Invalid email or password');
//     }
// });


// //--------------------------------------------------------------------------//
// //                          EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = { 
//     registerUser, 
//     loginUser 
// };


// chnage 2

// final change


// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');

// //--------------------------------------------------------------------------//
// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// //--------------------------------------------------------------------------//
// const registerUser = asyncHandler(async (req, res) => {
//     // [FIX 1]: 'address' ko req.body se nikalein
//     const { name, email, password, phone, address } = req.body;

//     // Email check
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         res.status(400);
//         throw new Error('User with this email already exists');
//     }

//     // [FIX 2]: 'address' ko User.create mein pass karein
//     const user = await User.create({
//         name,
//         email,
//         password,
//         phone,
//         address, // <-- Yahan address add kar diya hai
//     });

//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             isAdmin: user.isAdmin,
//             verification: user.verification,
//             avatar: user.avatar,
//             bio: user.bio,
//             address: user.address,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// });

// //--------------------------------------------------------------------------//
// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// //--------------------------------------------------------------------------//
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             isAdmin: user.isAdmin,
//             verification: user.verification,
//             avatar: user.avatar,
//             bio: user.bio,
//             address: user.address,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });

// //--------------------------------------------------------------------------//
// //                         EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = { 
//     registerUser, 
//     loginUser 
// };


//********************* */ sahe he bhai 8/10

// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');
// const sendEmail = require('../utils/sendEmail');
// const { getWelcomeEmailData } = require('../utils/emailTemplates');

// //--------------------------------------------------------------------------//
// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// //--------------------------------------------------------------------------//
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, phone, address } = req.body;

//     // Email check
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         res.status(400);
//         throw new Error('User with this email already exists');
//     }

//     // Create user
//     const user = await User.create({
//         name,
//         email,
//         password,
//         phone,
//         address,
//     });

//     if (user) {
//         // Welcome email
//         try {
//             const emailData = getWelcomeEmailData(user.name);
//             await sendEmail({
//                 email: user.email,
//                 subject: 'Welcome to RentSmart!',
//                 templateData: emailData
//             });
//         } catch (error) {
//             console.error("Welcome email failed:", error);
//         }

//         // Response with JWT token
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             isAdmin: user.isAdmin,
//             verification: user.verification,
//             avatar: user.avatar,
//             bio: user.bio,
//             address: user.address,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// });

// //--------------------------------------------------------------------------//
// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// //--------------------------------------------------------------------------//
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             isAdmin: user.isAdmin,
//             verification: user.verification,
//             avatar: user.avatar,
//             bio: user.bio,
//             address: user.address,
//             token: generateToken(user._id),
//         });
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });

// module.exports = { registerUser, loginUser };

//******************** */

// import asyncHandler from "express-async-handler";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";

// // ✅ JWT Token Generator
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// // 📝 Signup / Register
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, phone,address} = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     phone,
//     address, 
//   });

//   if (user) {
//     const token = generateToken(user._id);
//     user.token = token; // 👈 Save token to DB
//     await user.save();

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       isAdmin: user.isAdmin,
//       verification: user.verification,
//       avatar: user.avatar,
//       bio: user.bio,
//       address: user.address,
//       token: token, // 👈 Send token to frontend
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// // 🔑 Login User
// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && (await user.matchPassword(password))) {
//     const token = generateToken(user._id);
//     user.token = token; // 👈 Store token in DB
//     await user.save();

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       isAdmin: user.isAdmin,
//       verification: user.verification,
//       avatar: user.avatar,
//       bio: user.bio,
//       address: user.address,
//       token: token, // 👈 Return token
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// // 🚪 Logout User (optional)
// export const logoutUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.token = null; // 👈 Remove token from DB
//     await user.save();
//     res.json({ message: "User logged out successfully" });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// // 🔍 Get Current User Profile
// export const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       isAdmin: user.isAdmin,
//       verification: user.verification,
//       avatar: user.avatar,
//       bio: user.bio,
//       address: user.address,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });


//*********************** */

import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendEmail from '../utils/sendEmail.js'; // Make sure this path is correct
import { getWelcomeEmailData } from '../utils/emailTemplates.js'; // Make sure this path is correct

// ✅ JWT Token Generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// 📝 Signup / Register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
  });

  if (user) {
    const token = generateToken(user._id);
    user.token = token; // 👈 Save token to DB
    await user.save();

    // --- Welcome Email Logic ---
    try {
        const emailData = getWelcomeEmailData(user.name);
        await sendEmail({
            email: user.email,
            subject: 'Welcome to RentSmart!',
            templateData: emailData
        });
        console.log(`Welcome email sent to ${user.email}`);
    } catch (error) {
        // Log the error but don't block the registration process
        console.error("Failed to send welcome email:", error);
    }
    // --- End of Email Logic ---

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      verification: user.verification,
      avatar: user.avatar,
      bio: user.bio,
      address: user.address,
      token: token, // 👈 Send token to frontend
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// 🔑 Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    user.token = token; // 👈 Store token in DB
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      verification: user.verification,
      avatar: user.avatar,
      bio: user.bio,
      address: user.address,
      token: token, // 👈 Return token
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// 🚪 Logout User (optional)
export const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.token = null; // 👈 Remove token from DB
    await user.save();
    res.json({ message: "User logged out successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// 🔍 Get Current User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      verification: user.verification,
      avatar: user.avatar,
      bio: user.bio,
      address: user.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});