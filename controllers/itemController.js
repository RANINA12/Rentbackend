// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');

// // @desc    Fetch all items
// // @route   GET /api/items
// // @access  Public
// const getItems = asyncHandler(async (req, res) => {
//   const items = await Item.find({}).populate('user', 'name').sort({ createdAt: -1 });
//   res.json(items);
// });

// // @desc    Fetch single item by ID
// // @route   GET /api/items/:id
// // @access  Public
// const getItemById = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id);

//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404);
//     throw new Error('Item not found');
//   }
// });

// // @desc    Create a new item
// // @route   POST /api/items
// // @access  Private
// const createItem = asyncHandler(async (req, res) => {
//   const { name, description, category, images, pricePerDay } = req.body;

//   const item = new Item({
//     name,
//     description,
//     category,
//     images,
//     pricePerDay,
//     user: req.user._id, // from protect middleware
//   });

//   const createdItem = await item.save();
//   res.status(201).json(createdItem);
// });

// // @desc    Update an item
// // @route   PUT /api/items/:id
// // @access  Private
// const updateItem = asyncHandler(async (req, res) => {
//   const { name, description, category, images, pricePerDay, isAvailable } = req.body;
//   const item = await Item.findById(req.params.id);

//   if (item) {
//     // Check if the user owns the item
//     if (item.user.toString() !== req.user._id.toString()) {
//       res.status(401);
//       throw new Error('User not authorized to update this item');
//     }

//     item.name = name || item.name;
//     item.description = description || item.description;
//     item.category = category || item.category;
//     item.images = images || item.images;
//     item.pricePerDay = pricePerDay || item.pricePerDay;
//     item.isAvailable = isAvailable === undefined ? item.isAvailable : isAvailable;

//     const updatedItem = await item.save();
//     res.json(updatedItem);
//   } else {
//     res.status(404);
//     throw new Error('Item not found');
//   }
// });

// // @desc    Delete an item
// // @route   DELETE /api/items/:id
// // @access  Private
// const deleteItem = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id);

//   if (item) {
//     // Check if the user owns the item or is an admin
//     if (item.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
//       res.status(401);
//       throw new Error('User not authorized to delete this item');
//     }
//     await item.deleteOne();
//     res.json({ message: 'Item removed' });
//   } else {
//     res.status(404);
//     throw new Error('Item not found');
//   }
// });

// module.exports = {
//   getItems,
//   getItemById,
//   createItem,
//   updateItem,
//   deleteItem,
// };

// change 2

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');

// // @desc    Fetch all items
// const getItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({}).sort({ createdAt: -1 });
//     res.json({ success: true, items });
// });

// // @desc    Fetch only featured items
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const featuredItems = await Item.find({ isFeatured: true })
//         .sort({ createdAt: -1 })
//         .limit(8)
//         .populate('owner', 'name bio address avatar');
//     res.json({ success: true, items: featuredItems });
// });

// // @desc    Fetch items by category
// // @route   GET /api/items/category/:categoryName
// // @access  Public
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 
//         category: { $regex: req.params.categoryName, $options: 'i' } 
//     });
//     res.json({ success: true, items });
// });

// // @desc    Fetch single item by ID
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// // @desc    Create a new item
// const createItem = asyncHandler(async (req, res) => {
//     const { name, description, category, price, listingType, isFeatured } = req.body;
//     const images = req.files?.map(file => file.path) || [];
//     if (!name || !description || !category || !price || !listingType) {
//         res.status(400);
//         throw new Error('Please fill all required fields');
//     }
//     const item = new Item({
//         name, description, category,
//         price: Number(price),
//         listingType,
//         isFeatured: isFeatured === 'true',
//         images,
//         user: req.user._id,
//     });
//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// const updateItem = asyncHandler(async (req, res) => { /* ... */ });
// const deleteItem = asyncHandler(async (req, res) => { /* ... */ });

// // Sab functions ko export karein
// module.exports = {
//     getItems,
//     getFeaturedItems,
//     getItemById,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsByCategory, // 👈 Naya function yahan export karein
// };

//chnage 3
// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');

// // @desc    Fetch all items with owner details
// const getItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({})
//         .sort({ createdAt: -1 })
//         .populate('owner', 'name bio address avatar');
//     res.json({ success: true, items });
// });

// // @desc    Fetch only featured items with owner details
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const featuredItems = await Item.find({ isFeatured: true })
//         .sort({ createdAt: -1 })
//         .limit(12)
//         .populate('owner', 'name bio address avatar');
//     res.json({ success: true, items: featuredItems });
// });

// // @desc    Fetch items by category with owner details
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 
//         category: { $regex: req.params.categoryName, $options: 'i' } 
//     })
//     .populate('owner', 'name bio address avatar');
//     res.json({ success: true, items });
// });

// // @desc    Fetch single item by ID with owner details
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id)
//         .populate('owner', 'name bio address avatar');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// // @desc    Create a new item
// const createItem = asyncHandler(async (req, res) => {
//     const {
//         name, description, category, price, listingType,
//         isFeatured, ownerName, itemAge, anyDefects,
//         duration, durationType, availableFrom, availableTo,
//     } = req.body;

//     if (!name || !category || !price || !listingType || !ownerName || !itemAge) {
//         res.status(400);
//         throw new Error('Please fill all required fields.');
//     }

//     const images = req.files?.map(file => ({
//         public_id: file.filename,
//         url: file.path
//     })) || [];

//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }
    
//     const item = new Item({
//         name,
//         description: description || '',
//         category,
//         price: Number(price),
//         listingType,
//         isFeatured: isFeatured === 'true',
//         images,
//         owner: req.user._id, // 👈 YAHAN GALTI THI: 'user' ko 'owner' kar diya hai
//         ownerName,
//         itemAge,
//         anyDefects: anyDefects || 'None',
//         duration: listingType === 'rent' ? Number(duration) : undefined,
//         durationType: listingType === 'rent' ? durationType : undefined,
//         availableFrom: listingType === 'rent' ? new Date(availableFrom) : undefined,
//         availableTo: listingType === 'rent' ? new Date(availableTo) : undefined,
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// const updateItem = asyncHandler(async (req, res) => { /* Logic to be implemented */ });
// const deleteItem = asyncHandler(async (req, res) => { /* Logic to be implemented */ });

// module.exports = {
//     getItems,
//     getFeaturedItems,
//     getItemById,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsByCategory,
// };


//change 4
// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');

// //--------------------------------------------------------------------------//
// // @desc    Fetch all items with owner details
// // @route   GET /api/items
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({})
//         .sort({ createdAt: -1 })
//         .populate('user', 'name bio address avatar phone');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch featured items, filtered by city if provided
// // @route   GET /api/items/featured?city=Indore
// // @access  Public
// //--------------------------------------------------------------------------//
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let featuredItems = await Item.find({ isFeatured: true })
//         .populate({
//             path: 'user',
//             select: 'name bio address avatar phone'
//         });

//     if (city) {
//         const citySpecificItems = featuredItems.filter(item => 
//             item.user && item.user.address && item.user.address.city?.toLowerCase() === city.toLowerCase()
//         );
//         if (citySpecificItems.length > 0) {
//             return res.json({ success: true, items: citySpecificItems.slice(0, 12) });
//         }
//     }
//     res.json({ success: true, items: featuredItems.slice(0, 12) });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch items by category with owner details
// // @route   GET /api/items/category/:categoryName
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 
//         category: { $regex: req.params.categoryName, $options: 'i' } 
//     })
//     .populate('user', 'name bio address avatar phone');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch single item by ID with owner details
// // @route   GET /api/items/:id
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id)
//         .populate('user', 'name bio address avatar phone');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// //--------------------------------------------------------------------------//
// // @desc    Create a new item
// // @route   POST /api/items
// // @access  Private
// //--------------------------------------------------------------------------//
// const createItem = asyncHandler(async (req, res) => {
//     const {
//         name, description, category, price, listingType,
//         isFeatured, ownerName, itemAge, anyDefects,
//     } = req.body;

//     if (!name || !category || !price || !listingType) {
//         res.status(400);
//         throw new Error('Please fill all required fields.');
//     }

//     const images = req.files?.map(file => ({
//         public_id: file.filename,
//         url: file.path
//     })) || [];

//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }
    
//     const item = new Item({
//         name,
//         description: description || 'No description provided.',
//         category,
//         price: Number(price),
//         listingType,
//         isFeatured: isFeatured === 'true',
//         images,
//         user: req.user._id,
//         ownerName,
//         itemAge,
//         anyDefects: anyDefects || 'None',
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Update an item
// // @route   PUT /api/items/:id
// // @access  Private (Only the owner can update)
// //--------------------------------------------------------------------------//
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.json(updatedItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Delete an item
// // @route   DELETE /api/items/:id
// // @access  Private (Only the owner can delete)
// //--------------------------------------------------------------------------//
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     await item.deleteOne();

//     res.json({ success: true, message: 'Item removed' });
// });

// //--------------------------------------------------------------------------//
// //                          EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getFeaturedItems,
//     getItemById,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsByCategory,
// };

//chnage 5


//chnage 6

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');

// //--------------------------------------------------------------------------//
// // @desc    Fetch all items with owner details
// // @route   GET /api/items
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({})
//         .sort({ createdAt: -1 })
//         .populate('user', 'name bio address avatar phone verification');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch featured items, filtered by city if provided
// // @route   GET /api/items/featured?city=Indore
// // @access  Public
// //--------------------------------------------------------------------------//
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let featuredItems = await Item.find({ isFeatured: true })
//         .populate({
//             path: 'user',
//             select: 'name bio address avatar phone verification'
//         });

//     if (city) {
//         const citySpecificItems = featuredItems.filter(item => 
//             item.user && item.user.address && item.user.address.city?.toLowerCase() === city.toLowerCase()
//         );
//         if (citySpecificItems.length > 0) {
//             return res.json({ success: true, items: citySpecificItems.slice(0, 12) });
//         }
//     }
//     res.json({ success: true, items: featuredItems.slice(0, 12) });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch items by category with owner details
// // @route   GET /api/items/category/:categoryName
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 
//         category: { $regex: req.params.categoryName, $options: 'i' } 
//     })
//     .populate('user', 'name bio address avatar phone');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch single item by ID with owner details
// // @route   GET /api/items/:id
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id)
//         .populate('user', 'name bio address avatar phone');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// //--------------------------------------------------------------------------//
// // @desc    Create a new item
// // @route   POST /api/items
// // @access  Private
// //--------------------------------------------------------------------------//
// const createItem = asyncHandler(async (req, res) => {
//     const {
//         name, description, category, price, listingType,
//         isFeatured, ownerName, itemAge, anyDefects,
//     } = req.body;

//     if (!name || !category || !price || !listingType) {
//         res.status(400);
//         throw new Error('Please fill all required fields.');
//     }

//     const images = req.files?.map(file => ({
//         public_id: file.filename,
//         url: file.path
//     })) || [];

//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }
    
//     const item = new Item({
//         name,
//         description: description || 'No description provided.',
//         category,
//         price: Number(price),
//         listingType,
//         isFeatured: isFeatured === 'true',
//         images,
//         user: req.user._id,
//         ownerName,
//         itemAge,
//         anyDefects: anyDefects || 'None',
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Update an item
// // @route   PUT /api/items/:id
// // @access  Private (Only the owner can update)
// //--------------------------------------------------------------------------//
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.json(updatedItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Delete an item
// // @route   DELETE /api/items/:id
// // @access  Private (Only the owner can delete)
// //--------------------------------------------------------------------------//
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     await item.deleteOne();

//     res.json({ success: true, message: 'Item removed' });
// });

// //--------------------------------------------------------------------------//
// //                          EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getFeaturedItems,
//     getItemById,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsByCategory,
// };


//chnage 7

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');

// //--------------------------------------------------------------------------//
// // @desc    Fetch all items with owner details
// // @route   GET /api/items
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({})
//         .sort({ createdAt: -1 })
//         .populate('user', 'name bio address avatar phone');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch featured items, filtered by city if provided
// // @route   GET /api/items/featured?city=Indore
// // @access  Public
// //--------------------------------------------------------------------------//
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let featuredItems = await Item.find({ isFeatured: true })
//         .populate({
//             path: 'user',
//             select: 'name bio address avatar phone'
//         });

//     if (city) {
//         const citySpecificItems = featuredItems.filter(item => 
//             item.user && item.user.address && item.user.address.city?.toLowerCase() === city.toLowerCase()
//         );
//         if (citySpecificItems.length > 0) {
//             return res.json({ success: true, items: citySpecificItems.slice(0, 12) });
//         }
//     }
//     res.json({ success: true, items: featuredItems.slice(0, 12) });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch items by category with owner details
// // @route   GET /api/items/category/:categoryName
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 
//         category: { $regex: req.params.categoryName, $options: 'i' } 
//     })
//     .populate('user', 'name bio address avatar phone');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch single item by ID with owner details
// // @route   GET /api/items/:id
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id)
//         .populate('user', 'name bio address avatar phone');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// //--------------------------------------------------------------------------//
// // @desc    Create a new item
// // @route   POST /api/items
// // @access  Private
// //--------------------------------------------------------------------------//
// const createItem = asyncHandler(async (req, res) => {
//     const {
//         name, description, category, price, listingType,
//         isFeatured, ownerName, itemAge, anyDefects,
//     } = req.body;

//     if (!name || !category || !price || !listingType) {
//         res.status(400);
//         throw new Error('Please fill all required fields.');
//     }

//     const images = req.files?.map(file => ({
//         public_id: file.filename,
//         url: file.path
//     })) || [];

//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }
    
//     const item = new Item({
//         name,
//         description: description || 'No description provided.',
//         category,
//         price: Number(price),
//         listingType,
//         isFeatured: isFeatured === 'true',
//         images,
//         user: req.user._id,
//         ownerName,
//         itemAge,
//         anyDefects: anyDefects || 'None',
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Update an item
// // @route   PUT /api/items/:id
// // @access  Private (Only the owner can update)
// //--------------------------------------------------------------------------//
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.json(updatedItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Delete an item
// // @route   DELETE /api/items/:id
// // @access  Private (Only the owner can delete)
// //--------------------------------------------------------------------------//
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     await item.deleteOne();

//     res.json({ success: true, message: 'Item removed' });
// });

// //--------------------------------------------------------------------------//
// //                          EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getFeaturedItems,
//     getItemById,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsByCategory,
// };


//chnage 8

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');

// //--------------------------------------------------------------------------//
// // @desc    Fetch all items with owner details
// // @route   GET /api/items
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({})
//         .sort({ createdAt: -1 })
//         .populate('user', 'name bio address avatar phone');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch featured items, filtered by city if provided
// // @route   GET /api/items/featured?city=Indore
// // @access  Public
// //--------------------------------------------------------------------------//
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let featuredItems = await Item.find({ isFeatured: true })
//         .populate({
//             path: 'user',
//             select: 'name bio address avatar phone'
//         });

//     if (city) {
//         const citySpecificItems = featuredItems.filter(item => 
//             item.user && item.user.address && item.user.address.city?.toLowerCase() === city.toLowerCase()
//         );
//         if (citySpecificItems.length > 0) {
//             return res.json({ success: true, items: citySpecificItems.slice(0, 12) });
//         }
//     }
//     res.json({ success: true, items: featuredItems.slice(0, 12) });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch items by category with owner details
// // @route   GET /api/items/category/:categoryName
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 
//         category: { $regex: req.params.categoryName, $options: 'i' } 
//     })
//     .populate('user', 'name bio address avatar phone');
//     res.json({ success: true, items });
// });

// //--------------------------------------------------------------------------//
// // @desc    Fetch single item by ID with owner details
// // @route   GET /api/items/:id
// // @access  Public
// //--------------------------------------------------------------------------//
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id)
//         .populate('user', 'name bio address avatar phone verification'); // Added verification
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// //--------------------------------------------------------------------------//
// // @desc    Create a new item
// // @route   POST /api/items
// // @access  Private
// //--------------------------------------------------------------------------//
// const createItem = asyncHandler(async (req, res) => {
//     const {
//         name, description, category, price, listingType,
//         isFeatured, ownerName, itemAge, anyDefects,
//     } = req.body;

//     if (!name || !category || !price || !listingType) {
//         res.status(400);
//         throw new Error('Please fill all required fields.');
//     }

//     const images = req.files?.map(file => ({
//         public_id: file.filename,
//         url: file.path
//     })) || [];

//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }
    
//     const item = new Item({
//         name,
//         description: description || 'No description provided.',
//         category,
//         price: Number(price),
//         listingType,
//         isFeatured: isFeatured === 'true',
//         images,
//         user: req.user._id,
//         ownerName,
//         itemAge,
//         anyDefects: anyDefects || 'None',
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Update an item
// // @route   PUT /api/items/:id
// // @access  Private (Only the owner can update)
// //--------------------------------------------------------------------------//
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.json(updatedItem);
// });

// //--------------------------------------------------------------------------//
// // @desc    Delete an item
// // @route   DELETE /api/items/:id
// // @access  Private (Only the owner can delete)
// //--------------------------------------------------------------------------//
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     await item.deleteOne();

//     res.json({ success: true, message: 'Item removed' });
// });

// // === YEH NAYA FUNCTION HAI ===
// //--------------------------------------------------------------------------//
// // @desc    Suggest a rental price based on item details
// // @route   POST /api/items/suggest-price
// // @access  Private
// //--------------------------------------------------------------------------//
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;

//     if (!category || !itemAge) {
//         res.status(400);
//         throw new Error('Please provide both category and item age.');
//     }

//     let basePrice = 50; // Default base price per day

//     switch (category.toLowerCase()) {
//         case 'electronics': basePrice = 200; break;
//         case 'furniture': basePrice = 150; break;
//         case 'vehicles': basePrice = 500; break;
//         case 'clothing': basePrice = 70; break;
//         case 'sports equipment': basePrice = 120; break;
//         default: basePrice = 50;
//     }

//     switch (itemAge) {
//         case '0-1 year': break; // No depreciation
//         case '1-3 years': basePrice *= 0.8; break; // 20% depreciation
//         case '3+ years': basePrice *= 0.6; break; // 40% depreciation
//     }

//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);

//     res.json({
//         suggestion: `For a ${itemAge} old item in the ${category} category, we suggest a daily rent of ₹${minPrice} - ₹${maxPrice}.`
//     });
// });


// //--------------------------------------------------------------------------//
// //                          EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getFeaturedItems,
//     getItemById,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsByCategory,
//     suggestPrice, // Naye function ko yahaan export karein
// };

// chnage 9

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel'); // <-- Yeh import zaroori hai

// //--------------------------------------------------------------------------//
// //                  Public Read Operations (Anyone Can Access)
// //--------------------------------------------------------------------------//

// // @desc    Fetch all items
// const getItems = asyncHandler(async (req, res) => {
//     // NOTE: 'user' ko 'owner' se badal diya hai consistency ke liye
//     const items = await Item.find({}).sort({ createdAt: -1 }).populate('owner', 'name avatar');
//     res.json(items);
// });

// // @desc    Fetch a single item by its ID
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate('owner', 'name bio address avatar phone verification');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// // --- YEH FUNCTION FINAL AUR SABSE EFFICIENT HAI ---
// // @desc    Fetch featured items, filtered by city directly from DB
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };

//     if (city) {
//         // Step 1: Pehle us city ke saare users ki ID dhoondhein
//         const usersInCity = await User.find({ 
//             'address.city': { $regex: `^${city}$`, $options: 'i' } 
//         }).select('_id');

//         // Agar us city mein koi user nahi milta, toh khaali array bhej dein
//         if (usersInCity.length === 0) {
//             return res.json([]);
//         }

//         // Step 2: Un user IDs ka ek array banayein
//         const userIds = usersInCity.map(user => user._id);
        
//         // Step 3: Query ko update karein taaki sirf unhi owners ke items aayen
//         query.owner = { $in: userIds };
//     }

//     // Step 4: Final query ke saath items fetch karein
//     const items = await Item.find(query)
//         .populate('owner', 'name avatar')
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });

// // @desc    Fetch items by category with filters
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     if (minPrice || maxPrice) {
//         filter.pricePerDay = {};
//         if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
//         if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
//     }

//     let sort = { createdAt: -1 };
//     if (sortBy === 'price_asc') sort = { pricePerDay: 1 };
//     if (sortBy === 'price_desc') sort = { pricePerDay: -1 };

//     const items = await Item.find(filter).populate('owner', 'name address').sort(sort);
//     res.json(items);
// });

// // @desc    Fetch items that have location data for the map
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({ location: { $exists: true, $ne: null } })
//                             .select('name pricePerDay location images');
//     res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                 Private Write Operations (Owner Access Only)
// //--------------------------------------------------------------------------//

// // @desc    Create a new item
// const createItem = asyncHandler(async (req, res) => {
//     const { name, description, category, pricePerDay, address } = req.body;

//     if (!name || !category || !pricePerDay) {
//         res.status(400); throw new Error('Name, category, and price are required.');
//     }
//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); throw new Error("Please upload at least one image.");
//     }
    
//     const item = new Item({
//         ...req.body, // Baaki saari fields body se le lein
//         pricePerDay: Number(pricePerDay),
//         images,
//         owner: req.user._id, // Yahan 'user' ki jagah 'owner' field ka istemaal
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// // @desc    Update an item
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.owner.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// // @desc    Delete an item
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.owner.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// //--------------------------------------------------------------------------//
// //                         Utility Controllers
// //--------------------------------------------------------------------------//

// // @desc    Suggest a rental price
// const suggestPrice = asyncHandler(async (req, res) => {
//     // ... Aapki price suggestion logic yahan aayegi ...
//     res.json({ suggestion: `Suggested daily rent: ₹150` });
// });

// //--------------------------------------------------------------------------//
// //                         EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getItemsForMap,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
// };


//chnage 10

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel'); // User model zaroori hai

// // Note: Hum ek geocoding library ka istemaal karenge address ko coordinates mein badalne ke liye
// // const geocoder = require('../utils/geocoder'); // Maan lijiye aapne aisi ek file banayi hai

// //--------------------------------------------------------------------------//
// //                          Public Read Operations
// //--------------------------------------------------------------------------//

// // @desc    Fetch all items or filtered items
// // @route   GET /api/items
// // @access  Public
// const getItems = asyncHandler(async (req, res) => {
//     // Is function ko baad mein advanced filtering ke liye istemaal kiya ja sakta hai
//     const items = await Item.find({}).sort({ createdAt: -1 }).populate('user', 'name avatar');
//     res.json(items);
// });

// // @desc    Fetch a single item by its ID
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate('user', 'name bio address avatar phone verification rating numReviews');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// // @desc    Fetch featured items, filtered by city directly from DB (Optimized)
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };

//     if (city) {
//         // Step 1: Pehle us city ke saare users ki ID dhoondhein
//         const usersInCity = await User.find({ 
//             'address.city': { $regex: `^${city}$`, $options: 'i' } 
//         }).select('_id');

//         if (usersInCity.length === 0) {
//             return res.json([]); // Agar us city mein koi user nahi hai
//         }
//         const userIds = usersInCity.map(user => user._id);
//         query.user = { $in: userIds }; // Query ko update karein
//     }

//     const items = await Item.find(query)
//         .populate('user', 'name avatar')
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });

// // @desc    Fetch items by category with filters (Optimized)
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     if (minPrice || maxPrice) {
//         filter.price = {}; // Model mein 'price' hai, 'pricePerDay' nahi
//         if (minPrice) filter.price.$gte = Number(minPrice);
//         if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     let sort = { createdAt: -1 };
//     if (sortBy === 'price_asc') sort = { price: 1 };
//     if (sortBy === 'price_desc') sort = { price: -1 };

//     const items = await Item.find(filter).populate('user', 'name address').sort(sort);
//     res.json(items);
// });

// // @desc    Fetch items that have location data for the map
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 'location.coordinates': { $exists: true, $ne: [] } })
//         .select('name price location images category');
//     res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                          Private Write Operations
// //--------------------------------------------------------------------------//

// // @desc    Create a new item
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, price } = req.body;
//     if (!name || !category || !price) {
//         res.status(400); throw new Error('Name, category, and price are required.');
//     }
//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); throw new Error("Please upload at least one image.");
//     }
    
//     // --- Location Logic ---
//     let location = undefined;
//     // Hum user ke profile se address lenge
//     const userWithAddress = await User.findById(req.user._id).select('address');
//     if (userWithAddress && userWithAddress.address && userWithAddress.address.city) {
//         // Asli app mein, yahaan ek geocoding service (jaise node-geocoder) ka istemaal hoga
//         // Abhi ke liye, hum placeholder coordinates daal rahe hain
//         // const loc = await geocoder.geocode(`${userWithAddress.address.street}, ${userWithAddress.address.city}`);
//         // For simulation:
//         location = {
//             type: 'Point',
//             coordinates: [75.8577, 22.7196] // Indore ka placeholder [longitude, latitude]
//         };
//     }

//     const item = new Item({
//         ...req.body,
//         price: Number(price),
//         images,
//         user: req.user._id, // Model ke hisaab se 'user' field ka istemaal
//         location, // Naya location data
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// // @desc    Update an item
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// // @desc    Delete an item
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// //--------------------------------------------------------------------------//
// //                          Utility Controllers
// //--------------------------------------------------------------------------//

// // @desc    Suggest a rental price
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400);
//         throw new Error('Please provide both category and item age.');
//     }

//     let basePrice = 50;
//     switch (category.toLowerCase()) {
//         case 'electronics': basePrice = 200; break;
//         case 'furniture': basePrice = 150; break;
//         case 'vehicles': basePrice = 500; break;
//         default: basePrice = 100;
//     }
//     switch (itemAge) {
//         case '1-3 years': basePrice *= 0.8; break;
//         case '3+ years': basePrice *= 0.6; break;
//     }

//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({ suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}` });
// });

// //--------------------------------------------------------------------------//
// //                          EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getItemsForMap,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
// };

//change 11

// const asyncHandler = require('express-async-handler');
// const axios = require('axios');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel');

// //--------------------------------------------------------------------------//
// //                  Public Read Operations
// //--------------------------------------------------------------------------//

// // @desc    Fetch all items (Homepage ke liye)
// const getItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({}).sort({ createdAt: -1 }).populate('owner', 'name avatar');
//     res.json(items);
// });

// // @desc    Fetch a single item by its ID
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate('owner', 'name bio address avatar phone verification');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404); throw new Error('Item not found');
//     }
// });

// // @desc    Fetch featured items, filtered by city (Optimized)
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };
//     if (city) {
//         const usersInCity = await User.find({ 'address.city': { $regex: `^${city}$`, $options: 'i' } }).select('_id');
//         if (usersInCity.length === 0) return res.json([]);
//         const userIds = usersInCity.map(user => user._id);
//         query.owner = { $in: userIds };
//     }
//     const items = await Item.find(query).populate('owner', 'name avatar').sort({ createdAt: -1 }).limit(12);
//     res.json(items);
// });

// // @desc    Fetch items by category with filters
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;
//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     if (minPrice || maxPrice) {
//         filter.pricePerDay = {};
//         if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
//         if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
//     }
//     let sort = { createdAt: -1 };
//     if (sortBy === 'price_asc') sort = { pricePerDay: 1 };
//     if (sortBy === 'price_desc') sort = { pricePerDay: -1 };
//     const items = await Item.find(filter).populate('owner', 'name address').sort(sort);
//     res.json(items);
// });

// // @desc    Fetch items with location data for the map
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 'location.coordinates': { $exists: true, $ne: [] } }).select('name pricePerDay location images');
//     res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                 Private Write Operations
// //--------------------------------------------------------------------------//

// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, pricePerDay, address } = req.body;
//     if (!name || !category || !pricePerDay || !address) {
//         res.status(400); throw new Error('Name, category, price, and address are required.');
//     }
//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); throw new Error("Please upload at least one image.");
//     }
//     let location = {};
//     try {
//         const geoResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//             params: { address, key: process.env.GOOGLE_MAPS_API_KEY }
//         });
//         if (geoResponse.data.status === 'OK') {
//             const { lat, lng } = geoResponse.data.results[0].geometry.location;
//             location = { type: 'Point', coordinates: [lng, lat] };
//         }
//     } catch (error) {
//         console.error('Geocoding failed:', error.message);
//     }
//     const item = new Item({ ...req.body, pricePerDay: Number(pricePerDay), images, owner: req.user._id, location });
//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.owner.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.owner.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// //--------------------------------------------------------------------------//
// //                         Utility Controllers
// //--------------------------------------------------------------------------//

// const suggestPrice = asyncHandler(async (req, res) => {
//     res.json({ suggestion: `Suggested daily rent: ₹150` });
// });

// //--------------------------------------------------------------------------//
// //                         Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems, // <-- YEH MISSING THA
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getItemsForMap,
//     createItem,
//     updateItem,
// //     deleteItem,
// //     suggestPrice,
// // };

// //chatgpt 12 change

// const asyncHandler = require("express-async-handler");
// const axios = require("axios");
// const Item = require("../models/itemModel");
// const User = require("../models/userModel");

// //--------------------------------------------------------------------------//
// //                          Public Read Operations
// //--------------------------------------------------------------------------//

// // @desc    Fetch all items (Homepage ke liye)
// // @route   GET /api/items
// // @access  Public
// const getItems = asyncHandler(async (req, res) => {
//   const items = await Item.find({})
//     .sort({ createdAt: -1 })
//     .populate("owner", "name avatar"); // Consistent: 'owner'

//   res.json(items);
// });

// // @desc    Fetch a single item by its ID
// // @route   GET /api/items/:id
// // @access  Public
// const getItemById = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id).populate(
//     "owner",
//     "name bio address avatar phone verification"
//   );

//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404);
//     throw new Error("Item not found");
//   }
// });

// // @desc    Fetch featured items, optionally filtered by city
// // @route   GET /api/items/featured?city=Indore
// // @access  Public
// const getFeaturedItems = asyncHandler(async (req, res) => {
//   const { city } = req.query;
//   let query = { isFeatured: true };

//   if (city) {
//     const usersInCity = await User.find({
//       "address.city": { $regex: `^${city}$`, $options: "i" },
//     }).select("_id");

//     if (usersInCity.length === 0) {
//       return res.json([]);
//     }

//     const userIds = usersInCity.map((user) => user._id);
//     query.owner = { $in: userIds };
//   }

//   const items = await Item.find(query)
//     .populate("owner", "name avatar")
//     .sort({ createdAt: -1 })
//     .limit(12);

//   res.json(items);
// });

// // @desc    Fetch items by category with optional filters
// // @route   GET /api/items/category/:categoryName
// // @access  Public
// const getItemsByCategory = asyncHandler(async (req, res) => {
//   const { categoryName } = req.params;
//   const { minPrice, maxPrice, sortBy } = req.query;

//   const filter = {
//     category: { $regex: `^${categoryName}$`, $options: "i" },
//   };

//   if (minPrice || maxPrice) {
//     filter.pricePerDay = {};
//     if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
//     if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
//   }

//   let sort = { createdAt: -1 };
//   if (sortBy === "price_asc") sort = { pricePerDay: 1 };
//   if (sortBy === "price_desc") sort = { pricePerDay: -1 };

//   const items = await Item.find(filter)
//     .populate("owner", "name address")
//     .sort(sort);

//   res.json(items);
// });

// // @desc    Fetch items with location data for the map
// // @route   GET /api/items/map
// // @access  Public
// const getItemsForMap = asyncHandler(async (req, res) => {
//   const items = await Item.find({
//     "location.coordinates": { $exists: true, $ne: [] },
//   }).select("name pricePerDay location images");

//   res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                          Private Write Operations
// //--------------------------------------------------------------------------//

// // @desc    Create a new item
// // @route   POST /api/items
// // @access  Private
// const createItem = asyncHandler(async (req, res) => {
//   const { name, category, pricePerDay, address } = req.body;

//   if (!name || !category || !pricePerDay || !address) {
//     res.status(400);
//     throw new Error("Name, category, price, and address are required.");
//   }

//   const images =
//     req.files?.map((file) => ({
//       public_id: file.filename,
//       url: file.path,
//     })) || [];

//   if (images.length === 0) {
//     res.status(400);
//     throw new Error("Please upload at least one image.");
//   }

//   let location = {};
//   try {
//     const geoResponse = await axios.get(
//       "https://maps.googleapis.com/maps/api/geocode/json",
//       {
//         params: { address, key: process.env.GOOGLE_MAPS_API_KEY },
//       }
//     );

//     if (geoResponse.data.status === "OK") {
//       const { lat, lng } = geoResponse.data.results[0].geometry.location;
//       location = { type: "Point", coordinates: [lng, lat] };
//     }
//   } catch (error) {
//     console.error("Geocoding failed:", error.message);
//   }

//   const item = new Item({
//     ...req.body,
//     pricePerDay: Number(pricePerDay),
//     images,
//     owner: req.user._id, // Consistent field
//     location,
//   });

//   const createdItem = await item.save();
//   res.status(201).json(createdItem);
// });

// // @desc    Update an item
// // @route   PUT /api/items/:id
// // @access  Private (Owner only)
// const updateItem = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) {
//     res.status(404);
//     throw new Error("Item not found");
//   }

//   if (item.owner.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.json(updatedItem);
// });

// // @desc    Delete an item
// // @route   DELETE /api/items/:id
// // @access  Private (Owner only)
// const deleteItem = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) {
//     res.status(404);
//     throw new Error("Item not found");
//   }

//   if (item.owner.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   await item.deleteOne();
//   res.json({ message: "Item removed successfully" });
// });

// //--------------------------------------------------------------------------//
// //                          Utility Controllers
// //--------------------------------------------------------------------------//

// // @desc    Suggest a rental price
// // @route   POST /api/items/suggest-price
// // @access  Private
// const suggestPrice = asyncHandler(async (req, res) => {
//   const { category, itemAge } = req.body;

//   if (!category || !itemAge) {
//     res.status(400);
//     throw new Error("Please provide both category and item age.");
//   }

//   let basePrice = 100;
//   switch (category.toLowerCase()) {
//     case "electronics":
//       basePrice = 200;
//       break;
//     case "furniture":
//       basePrice = 150;
//       break;
//     case "vehicles":
//       basePrice = 500;
//       break;
//     case "clothing":
//       basePrice = 70;
//       break;
//     case "sports equipment":
//       basePrice = 120;
//       break;
//     default:
//       basePrice = 100;
//   }

//   switch (itemAge) {
//     case "1-3 years":
//       basePrice *= 0.8;
//       break;
//     case "3+ years":
//       basePrice *= 0.6;
//       break;
//   }

//   const minPrice = Math.round(basePrice * 0.9);
//   const maxPrice = Math.round(basePrice * 1.1);

//   res.json({
//     suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}`,
//   });
// });

// //--------------------------------------------------------------------------//
// //                         EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//   getItems,
//   getItemById,
//   getFeaturedItems,
//   getItemsByCategory,
//   getItemsForMap,
//   createItem,
//   updateItem,
//   deleteItem,
//   suggestPrice,
// };


// const asyncHandler = require("express-async-handler");
// const axios = require("axios");
// const Item = require("../models/itemModel");
// const User = require("../models/userModel");

// //--------------------------------------------------------------------------//
// //                          Public Read Operations
// //--------------------------------------------------------------------------//

// // @desc    Fetch all items
// // @route   GET /api/items
// // @access  Public
// const getItems = asyncHandler(async (req, res) => {
//   const items = await Item.find({})
//     .sort({ createdAt: -1 })
//     .populate("owner", "name avatar");

//   res.json(items);
// });

// // @desc    Fetch a single item by ID
// // @route   GET /api/items/:id
// // @access  Public
// const getItemById = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id).populate(
//     "owner",
//     "name bio address avatar phone verification"
//   );

//   if (!item) {
//     res.status(404);
//     throw new Error("Item not found");
//   }

//   res.json(item);
// });

// // @desc    Fetch featured items (with optional city filter)
// // @route   GET /api/items/featured?city=Indore
// // @access  Public
// const getFeaturedItems = asyncHandler(async (req, res) => {
//   const { city } = req.query;
//   let query = { isFeatured: true };

//   if (city) {
//     // Filter by users who live in that city
//     const usersInCity = await User.find({
//       "address.city": { $regex: city, $options: "i" },
//     }).select("_id");

//     if (usersInCity.length === 0) {
//       return res.json([]);
//     }

//     const userIds = usersInCity.map((user) => user._id);
//     query.owner = { $in: userIds };
//   }

//   const items = await Item.find(query)
//     .populate("owner", "name avatar")
//     .sort({ createdAt: -1 })
//     .limit(12);

//   res.json(items);
// });

// // @desc    Fetch items by category
// // @route   GET /api/items/category/:categoryName
// // @access  Public
// const getItemsByCategory = asyncHandler(async (req, res) => {
//   const { categoryName } = req.params;
//   const { minPrice, maxPrice, sortBy } = req.query;

//   const filter = {
//     category: { $regex: `^${categoryName}$`, $options: "i" },
//   };

//   if (minPrice || maxPrice) {
//     filter.pricePerDay = {};
//     if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
//     if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
//   }

//   let sort = { createdAt: -1 };
//   if (sortBy === "price_asc") sort = { pricePerDay: 1 };
//   if (sortBy === "price_desc") sort = { pricePerDay: -1 };

//   const items = await Item.find(filter)
//     .populate("owner", "name address")
//     .sort(sort);

//   res.json(items);
// });

// // @desc    Fetch items with location data (for map)
// // @route   GET /api/items/map-data
// // @access  Public
// const getItemsForMap = asyncHandler(async (req, res) => {
//   const items = await Item.find({
//     "location.coordinates": { $exists: true, $ne: [] },
//   }).select("name pricePerDay location images");

//   res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                          Private Write Operations
// //--------------------------------------------------------------------------//

// // @desc    Create a new item
// // @route   POST /api/items
// // @access  Private
// const createItem = asyncHandler(async (req, res) => {
//   const { name, category, pricePerDay, address } = req.body;

//   if (!name || !category || !pricePerDay || !address) {
//     res.status(400);
//     throw new Error("Name, category, price, and address are required.");
//   }

//   const images =
//     req.files?.map((file) => ({
//       public_id: file.filename,
//       url: file.path,
//     })) || [];

//   if (images.length === 0) {
//     res.status(400);
//     throw new Error("Please upload at least one image.");
//   }

//   let location = {};
//   try {
//     const geoResponse = await axios.get(
//       "https://maps.googleapis.com/maps/api/geocode/json",
//       {
//         params: { address, key: process.env.GOOGLE_MAPS_API_KEY },
//       }
//     );

//     if (geoResponse.data.status === "OK") {
//       const { lat, lng } = geoResponse.data.results[0].geometry.location;
//       location = { type: "Point", coordinates: [lng, lat] };
//     }
//   } catch (error) {
//     console.error("Geocoding failed:", error.message);
//   }

//   const item = new Item({
//     ...req.body,
//     pricePerDay: Number(pricePerDay),
//     images,
//     owner: req.user._id,
//     location,
//   });

//   const createdItem = await item.save();
//   res.status(201).json(createdItem);
// });

// // @desc    Update an item
// // @route   PUT /api/items/:id
// // @access  Private
// const updateItem = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) {
//     res.status(404);
//     throw new Error("Item not found");
//   }

//   if (item.owner.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.json(updatedItem);
// });

// // @desc    Delete an item
// // @route   DELETE /api/items/:id
// // @access  Private
// const deleteItem = asyncHandler(async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) {
//     res.status(404);
//     throw new Error("Item not found");
//   }

//   if (item.owner.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("User not authorized");
//   }

//   await item.deleteOne();
//   res.json({ message: "Item removed successfully" });
// });

// //--------------------------------------------------------------------------//
// //                          Utility Controllers
// //--------------------------------------------------------------------------//

// // @desc    Suggest a rental price
// // @route   POST /api/items/suggest-price
// // @access  Private
// const suggestPrice = asyncHandler(async (req, res) => {
//   const { category, itemAge } = req.body;

//   if (!category || !itemAge) {
//     res.status(400);
//     throw new Error("Please provide both category and item age.");
//   }

//   let basePrice = 100;
//   switch (category.toLowerCase()) {
//     case "electronics":
//       basePrice = 200;
//       break;
//     case "furniture":
//       basePrice = 150;
//       break;
//     case "vehicles":
//       basePrice = 500;
//       break;
//     case "clothing":
//       basePrice = 70;
//       break;
//     case "sports equipment":
//       basePrice = 120;
//       break;
//   }

//   switch (itemAge) {
//     case "1-3 years":
//       basePrice *= 0.8;
//       break;
//     case "3+ years":
//       basePrice *= 0.6;
//       break;
//   }

//   const minPrice = Math.round(basePrice * 0.9);
//   const maxPrice = Math.round(basePrice * 1.1);

//   res.json({
//     suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}`,
//   });
// });

// //--------------------------------------------------------------------------//
// //                         EXPORT CONTROLLERS
// //--------------------------------------------------------------------------//
// module.exports = {
//   getItems,
//   getItemById,
//   getFeaturedItems,
//   getItemsByCategory,
//   getItemsForMap,
//   createItem,
//   updateItem,
//   deleteItem,
//   suggestPrice,
// };


//chnage

// const asyncHandler = require("express-async-handler");
// const Item = require("../models/itemModel");
// const User = require("../models/userModel");

// // Helper function to populate user data safely
// const populateUser = (query) => {
//     return query.populate({
//         path: 'user',
//         select: 'name avatar address bio phone verification'
//     });
// };

// //--------------------------------------------------------------------------//
// //                        Public Read Operations
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch featured items, ensuring they have a valid user
//  * @route   GET /api/items/featured
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     // ✅ FIX: Hum sirf woh items dhoondhenge jinke saath user juda hua hai
//     let query = { isFeatured: true, user: { $ne: null } };

//     if (city) {
//         // City ke naam se case-insensitive search
//         const usersInCity = await User.find({ "address.city": { $regex: `^${city}$`, $options: "i" } }).select("_id");
        
//         if (usersInCity.length === 0) {
//             return res.json([]); // Agar us sheher me koi user nahi, to khaali array bhejein
//         }
        
//         const userIds = usersInCity.map((user) => user._id);
//         query.user = { $in: userIds };
//     }

//     const items = await populateUser(Item.find(query))
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });

// /**
//  * @desc    Fetch all items, ensuring they have a valid user
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     // ✅ FIX: Sirf woh items jinke saath user juda hai
//     const items = await populateUser(Item.find({ user: { $ne: null } }))
//         .sort({ createdAt: -1 });
//     res.json(items);
// });

// /**
//  * @desc    Fetch a single item by ID
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await populateUser(Item.findById(req.params.id));
//     if (!item) {
//         res.status(404);
//         throw new Error("Item not found");
//     }
//     res.json(item);
// });

// /**
//  * @desc    Fetch items by category
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const filter = {
//         category: { $regex: `^${categoryName}$`, $options: "i" },
//         user: { $ne: null } // ✅ FIX: Sirf woh items jinke saath user juda hai
//     };
    
//     const items = await populateUser(Item.find(filter))
//         .sort({ createdAt: -1 });

//     res.json(items);
// });


// //--------------------------------------------------------------------------//
// //                       Private Write Operations
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Create a new item
//  * @route   POST /api/items
//  * @access  Private
//  */
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, price } = req.body;
//     if (!name || !category || !price) {
//         res.status(400);
//         throw new Error("Name, category, and price are required.");
//     }
//     const images = req.files?.map((file) => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }
    
//     const item = new Item({
//         ...req.body,
//         price: Number(price),
//         images,
//         user: req.user._id, // ✅ FIX: 'owner' ko 'user' se badla gaya
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// /**
//  * @desc    Update an item
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//         res.status(404); throw new Error("Item not found");
//     }
//     if (!item.user || item.user.toString() !== req.user._id.toString()) { // ✅ FIX: Safety check + 'owner' ko 'user'
//         res.status(401); throw new Error("User not authorized");
//     }
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// /**
//  * @desc    Delete an item
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//         res.status(404); throw new Error("Item not found");
//     }
//     if (!item.user || item.user.toString() !== req.user._id.toString()) { // ✅ FIX: Safety check + 'owner' ko 'user'
//         res.status(401); throw new Error("User not authorized");
//     }
//     await item.deleteOne();
//     res.json({ message: "Item removed successfully" });
// });


// // --- Baaki ke functions (Inme koi badlav nahi) ---
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({ "location.coordinates": { $exists: true, $ne: [] } }).select("name price location images");
//     res.json(items);
// });

// const suggestPrice = asyncHandler(async (req, res) => {
//     // Is function me koi badlav nahi hai
//     res.json({ suggestion: `This is a sample price suggestion.` });
// });


// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     createItem,
//     updateItem,
//     deleteItem,
//     getItemsForMap,
//     suggestPrice,
// };


//change


// const asyncHandler = require("express-async-handler");
// const Item = require("../models/itemModel");
// const User = require("../models/userModel");

// // Helper function to populate user data safely
// const populateUser = (query) => {
//     return query.populate({
//         path: 'user',
//         select: 'name avatar address bio phone verification'
//     });
// };

// //--------------------------------------------------------------------------//
// //                        Public Read Operations
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch featured items, ensuring they have a valid user
//  * @route   GET /api/items/featured
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     try {
//         const { city } = req.query;
//         let query = { isFeatured: true, user: { $ne: null } };

//         if (city) {
//             const usersInCity = await User.find({ "address.city": { $regex: `^${city}$`, $options: "i" } }).select("_id");
//             if (usersInCity.length > 0) {
//                 query.user = { $in: usersInCity.map(u => u._id) };
//             } else {
//                 return res.json([]); 
//             }
//         }

//         const items = await populateUser(Item.find(query)).sort({ createdAt: -1 }).limit(12);
//         const validItems = items.filter(item => item.user);
//         res.json(validItems);

//     } catch (error) {
//         console.error("!!! SERVER ERROR in getFeaturedItems:", error);
//         res.status(500).json({ message: "Server error fetching featured items." });
//     }
// });

// /**
//  * @desc    Fetch items by category, with filters
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     try {
//         const { categoryName } = req.params;
//         const { minPrice, maxPrice, sortBy } = req.query;

//         let filter = {
//             category: { $regex: `^${categoryName}$`, $options: "i" },
//             user: { $ne: null }
//         };
        
//         if (minPrice || maxPrice) {
//             filter.price = {};
//             if (minPrice) filter.price.$gte = Number(minPrice);
//             if (maxPrice) filter.price.$lte = Number(maxPrice);
//         }

//         let sort = { createdAt: -1 };
//         if (sortBy === 'price_asc') sort = { price: 1 };
//         if (sortBy === 'price_desc') sort = { price: -1 };

//         const items = await populateUser(Item.find(filter)).sort(sort);
//         const validItems = items.filter(item => item.user);
//         res.json(validItems);

//     } catch (error) {
//         console.error("!!! SERVER ERROR in getItemsByCategory:", error);
//         res.status(500).json({ message: "Server error fetching category items." });
//     }
// });

// /**
//  * @desc    Fetch all items, ensuring they have a valid user
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     const items = await populateUser(Item.find({ user: { $ne: null } })).sort({ createdAt: -1 });
//     res.json(items.filter(item => item.user));
// });

// /**
//  * @desc    Fetch a single item by ID
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await populateUser(Item.findById(req.params.id));
//     if (!item || !item.user) {
//         res.status(404);
//         throw new Error("Item not found or has an invalid owner.");
//     }
//     res.json(item);
// });


// //--------------------------------------------------------------------------//
// //                       Private Write Operations
// //--------------------------------------------------------------------------//
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, price } = req.body;
//     if (!name || !category || !price) {
//         res.status(400); throw new Error("Name, category, and price are required.");
//     }
//     const images = req.files?.map((file) => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); throw new Error("Please upload at least one image.");
//     }
//     const item = new Item({ ...req.body, price: Number(price), images, user: req.user._id });
//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error("Item not found"); }
//     if (!item.user || item.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error("User not authorized"); }
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error("Item not found"); }
//     if (!item.user || item.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error("User not authorized"); }
//     await item.deleteOne();
//     res.json({ message: "Item removed successfully" });
// });

// //--------------------------------------------------------------------------//
// //                       Utility Controllers
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch items with location data (for map)
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({
//         "location.coordinates": { $exists: true, $ne: [] },
//     }).select("name price location images");
//     res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                                Private Routes                            //
// //                   (Inke liye login karna zaroori hai)                     //
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch all items for the logged-in user
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });


// /**
//  * @desc    Suggest a rental price
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400);
//         throw new Error("Please provide both category and item age.");
//     }

//     let basePrice = 100; // Default base price
//     switch (category.toLowerCase()) {
//         case "electronics": basePrice = 200; break;
//         case "furniture": basePrice = 150; break;
//         case "bikes": basePrice = 500; break;
//         case "appliances": basePrice = 180; break;
//         case "fitness": basePrice = 120; break;
//         default: basePrice = 100;
//     }

//     switch (itemAge) {
//         case "1-3 years": basePrice *= 0.8; break;
//         case "3+ years": basePrice *= 0.6; break;
//     }

//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({
//         suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}`,
//     });
// });


// module.exports = { 
//     getItems, 
//     getItemById, 
//     getFeaturedItems, 
//     getItemsByCategory, 
//     createItem, 
//     updateItem, 
//     getMyItems,
//     deleteItem, 
//     getItemsForMap, 
//     suggestPrice 
// };


//----------------------------

// const asyncHandler = require("express-async-handler");
// const Item = require("../models/itemModel");
// const User = require("../models/userModel");

// // Helper function to populate user details consistently
// const populateUserDetails = (query) => {
//     return query.populate('user', 'name avatar address bio phone isVerified verification');
// };

// //--------------------------------------------------------------------------//
// //                                Public Routes                             //
// //                 (Inke liye login karna zaroori nahi hai)                  //
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch all items for the homepage
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     const items = await populateUserDetails(Item.find({ user: { $ne: null } }))
//         .sort({ createdAt: -1 });
//     // Sirf woh items bhejein jinka user/owner delete na hua ho
//     res.json(items.filter(item => item.user));
// });

// /**
//  * @desc    Fetch a single item by its ID
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await populateUserDetails(Item.findById(req.params.id));
//     if (item && item.user) { // Check karein ki item aur uska user dono मौजूद hain
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error("Item not found or its owner has been removed.");
//     }
// });

// /**
//  * @desc    Fetch featured items, with optional city filter
//  * @route   GET /api/items/featured?city=Indore
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true, user: { $ne: null } };

//     if (city) {
//         const usersInCity = await User.find({ "address.city": { $regex: `^${city}$`, $options: "i" } }).select("_id");
//         if (usersInCity.length === 0) {
//             return res.json([]); // Agar us sheher me koi user nahi, to khaali array bhejein
//         }
//         const userIds = usersInCity.map((user) => user._id);
//         query.user = { $in: userIds };
//     }

//     const items = await populateUserDetails(Item.find(query))
//         .sort({ createdAt: -1 })
//         .limit(12);
    
//     // Sirf woh items bhejein jinka user/owner delete na hua ho
//     res.json(items.filter(item => item.user));
// });

// /**
//  * @desc    Fetch items by category, with filters
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     let filter = {
//         category: { $regex: `^${categoryName}$`, $options: "i" },
//         user: { $ne: null }
//     };
    
//     if (minPrice || maxPrice) {
//         filter.pricePerDay = {};
//         if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
//         if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
//     }

//     let sort = { createdAt: -1 };
//     if (sortBy === 'price_asc') sort = { pricePerDay: 1 };
//     if (sortBy === 'price_desc') sort = { pricePerDay: -1 };

//     const items = await populateUserDetails(Item.find(filter)).sort(sort);
//     res.json(items.filter(item => item.user));
// });

// /**
//  * @desc    Fetch items with location data (for map)
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({
//         "location.coordinates": { $exists: true, $ne: [] },
//     }).select("name pricePerDay location images");
//     res.json(items);
// });


// //--------------------------------------------------------------------------//
// //                                Private Routes                            //
// //                   (Inke liye login karna zaroori hai)                     //
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch all items for the logged-in user
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });


// /**
//  * @desc    Create a new item
//  * @route   POST /api/items
//  * @access  Private
//  */
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, pricePerDay } = req.body;

//     if (!name || !category || !pricePerDay) {
//         res.status(400);
//         throw new Error("Name, category, and price are required.");
//     }

//     const images = req.files?.map((file) => ({
//         public_id: file.filename,
//         url: file.path,
//     })) || [];

//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }

//     const item = new Item({
//         ...req.body,
//         pricePerDay: Number(pricePerDay),
//         images,
//         user: req.user._id,
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// /**
//  * @desc    Update an item owned by the user
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error("Item not found");
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error("User not authorized");
//     }

//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.json(updatedItem);
// });

// /**
//  * @desc    Delete an item owned by the user
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error("Item not found");
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error("User not authorized");
//     }

//     await item.deleteOne();
//     res.json({ message: "Item removed successfully" });
// });


// /**
//  * @desc    Suggest a rental price
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400);
//         throw new Error("Please provide both category and item age.");
//     }

//     let basePrice = 100; // Default base price
//     switch (category.toLowerCase()) {
//         case "electronics": basePrice = 200; break;
//         case "furniture": basePrice = 150; break;
//         case "bikes": basePrice = 500; break;
//         case "appliances": basePrice = 180; break;
//         case "fitness": basePrice = 120; break;
//         default: basePrice = 100;
//     }

//     switch (itemAge) {
//         case "1-3 years": basePrice *= 0.8; break;
//         case "3+ years": basePrice *= 0.6; break;
//     }

//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({
//         suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}`,
//     });
// });


// // --- Saare functions ko ek saath export karein ---
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getItemsForMap,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice
// };



//----------------------------------------------

// const asyncHandler = require("express-async-handler");
// const Item = require("../models/itemModel");
// const User = require("../models/userModel");

// // Helper function to populate user details consistently
// const populateUserDetails = (query) => {
//     return query.populate('user', 'name avatar address bio phone isVerified verification');
// };

// //--------------------------------------------------------------------------//
// //                                Public Routes                               //
// //                 (Inke liye login karna zaroori nahi hai)                  //
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch all items for the homepage
//  * @route   GET /api/items
//  * @access  Public
//  */
// // const getItems = asyncHandler(async (req, res) => {
// //     const items = await populateUserDetails(Item.find({ user: { $ne: null } }))
// //         .sort({ createdAt: -1 });
// //     // Sirf woh items bhejein jinka user/owner delete na hua ho
// //     res.json(items.filter(item => item.user));
// // });

// //----------------------------------------new add 09/092025

// // --- YEH FUNCTION UPDATE HUA HAI ---
// // @desc    Fetch all items with filtering and sorting
// // @route   GET /api/items
// // @access  Public
// const getItems = asyncHandler(async (req, res) => {
//     const { minPrice, maxPrice, sortBy } = req.query;

//     // Filter object banayein
//     let filter = {};
//     if (minPrice || maxPrice) {
//         filter.price = {};
//         if (minPrice) filter.price.$gte = Number(minPrice);
//         if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     // Sort object banayein
//     let sort = { createdAt: -1 }; // Default: Newest first
//     if (sortBy === 'price_asc') sort = { price: 1 };
//     if (sortBy === 'price_desc') sort = { price: -1 };

//     const items = await Item.find(filter)
//         .populate('user', 'name avatar')
//         .sort(sort);
        
//     res.json({ success: true, items });
// });


// /**
//  * @desc    Fetch a single item by its ID
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await populateUserDetails(Item.findById(req.params.id));
//     if (item && item.user) { // Check karein ki item aur uska user dono मौजूद hain
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error("Item not found or its owner has been removed.");
//     }
// });

// /**
//  * @desc    Fetch featured items, with optional city filter
//  * @route   GET /api/items/featured?city=Indore
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true, user: { $ne: null } };

//     if (city) {
//         const usersInCity = await User.find({ "address.city": { $regex: `^${city}$`, $options: "i" } }).select("_id");
//         if (usersInCity.length === 0) {
//             return res.json([]); // Agar us sheher me koi user nahi, to khaali array bhejein
//         }
//         const userIds = usersInCity.map((user) => user._id);
//         query.user = { $in: userIds };
//     }

//     const items = await populateUserDetails(Item.find(query))
//         .sort({ createdAt: -1 })
//         .limit(12);

//     // Sirf woh items bhejein jinka user/owner delete na hua ho
//     res.json(items.filter(item => item.user));
// });

// /**
//  * @desc    Fetch items by category, with filters
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     let filter = {
//         category: { $regex: `^${categoryName}$`, $options: "i" },
//         user: { $ne: null }
//     };

//     if (minPrice || maxPrice) {
//         filter.pricePerDay = {};
//         if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
//         if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
//     }

//     let sort = { createdAt: -1 };
//     if (sortBy === 'price_asc') sort = { pricePerDay: 1 };
//     if (sortBy === 'price_desc') sort = { pricePerDay: -1 };

//     const items = await populateUserDetails(Item.find(filter)).sort(sort);
//     res.json(items.filter(item => item.user));
// });

// /**
//  * @desc    Fetch items with location data (for map)
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({
//         "location.coordinates": { $exists: true, $ne: [] },
//     }).select("name pricePerDay location images");
//     res.json(items);
// });


// //--------------------------------------------------------------------------//
// //                               Private Routes                               //
// //                  (Inke liye login karna zaroori hai)                       //
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch all items for the logged-in user
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });


// /**
//  * @desc    Create a new item
//  * @route   POST /api/items
//  * @access  Private
//  */
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, pricePerDay } = req.body;

//     if (!name || !category || !pricePerDay) {
//         res.status(400);
//         throw new Error("Name, category, and price are required.");
//     }

//     const images = req.files?.map((file) => ({
//         public_id: file.filename,
//         url: file.path,
//     })) || [];

//     if (images.length === 0) {
//         res.status(400);
//         throw new Error("Please upload at least one image.");
//     }

//     const item = new Item({
//         ...req.body,
//         pricePerDay: Number(pricePerDay),
//         images,
//         user: req.user._id,
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// /**
//  * @desc    Update an item owned by the user
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error("Item not found");
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error("User not authorized");
//     }

//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.json(updatedItem);
// });

// /**
//  * @desc    Delete an item owned by the user
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);

//     if (!item) {
//         res.status(404);
//         throw new Error("Item not found");
//     }

//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error("User not authorized");
//     }

//     await item.deleteOne();
//     res.json({ message: "Item removed successfully" });
// });


// /**
//  * @desc    Suggest a rental price
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400);
//         throw new Error("Please provide both category and item age.");
//     }

//     let basePrice = 100; // Default base price
//     switch (category.toLowerCase()) {
//         case "electronics": basePrice = 200; break;
//         case "furniture": basePrice = 150; break;
//         case "bikes": basePrice = 500; break;
//         case "appliances": basePrice = 180; break;
//         case "fitness": basePrice = 120; break;
//         default: basePrice = 100;
//     }

//     switch (itemAge) {
//         case "1-3 years": basePrice *= 0.8; break;
//         case "3+ years": basePrice *= 0.6; break;
//     }

//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({
//         suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}`,
//     });
// });


// // --- Saare functions ko ek saath export karein ---
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getItemsForMap,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice
// };



//********************************* */

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel'); // User model zaroori hai

// // Note: Asli app mein, address ko coordinates mein badalne ke liye
// // ek geocoding library (jaise node-geocoder) ka istemaal hota hai.

// //--------------------------------------------------------------------------//
// //                          Public Read Operations
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Fetch all items with filtering and sorting (for Explore page)
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     const { minPrice, maxPrice, sortBy } = req.query;

//     let filter = {};
//     if (minPrice || maxPrice) {
//         filter.price = {};
//         if (minPrice) filter.price.$gte = Number(minPrice);
//         if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     let sort = { createdAt: -1 }; // Default: Newest first
//     if (sortBy === 'price_asc') sort = { price: 1 };
//     if (sortBy === 'price_desc') sort = { price: -1 };

//     const items = await Item.find(filter)
//         .populate('user', 'name avatar')
//         .sort(sort);
        
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Fetch a single item by its ID
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate('user', 'name bio address avatar phone verification rating numReviews');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// /**
//  * @desc    Fetch featured items, with optional city filter (Optimized)
//  * @route   GET /api/items/featured?city=Indore
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };

//     if (city) {
//         const usersInCity = await User.find({ 
//             'address.city': { $regex: `^${city}$`, $options: 'i' } 
//         }).select('_id');

//         if (usersInCity.length === 0) {
//             return res.json([]);
//         }
//         const userIds = usersInCity.map(user => user._id);
//         query.user = { $in: userIds };
//     }

//     const items = await Item.find(query)
//         .populate('user', 'name avatar')
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });

// /**
//  * @desc    Fetch items by category, with filters (Optimized)
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     if (minPrice || maxPrice) {
//         filter.price = {};
//         if (minPrice) filter.price.$gte = Number(minPrice);
//         if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     let sort = { createdAt: -1 };
//     if (sortBy === 'price_asc') sort = { price: 1 };
//     if (sortBy === 'price_desc') sort = { price: -1 };

//     const items = await Item.find(filter).populate('user', 'name address').sort(sort);
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Fetch items with location data for the map
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 'location.coordinates': { $exists: true, $ne: [] } })
//         .select('name price location images category');
//     res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                          Private Write Operations
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Get all items for the logged-in user
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });

// /**
//  * @desc    Create a new item
//  * @route   POST /api/items
//  * @access  Private
//  */
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, price } = req.body;
//     if (!name || !category || !price) {
//         res.status(400); throw new Error('Name, category, and price are required.');
//     }
//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); throw new Error("Please upload at least one image.");
//     }
    
//     // --- Location Logic ---
//     let location = undefined;
//     const userWithAddress = await User.findById(req.user._id).select('address');
//     if (userWithAddress?.address?.city) {
//         // Asli app mein, yahaan ek geocoding service ka istemaal hoga.
//         // Abhi ke liye, hum placeholder coordinates daal rahe hain (Indore)
//         location = {
//             type: 'Point',
//             coordinates: [75.8577, 22.7196] // Format: [longitude, latitude]
//         };
//     }

//     const item = new Item({
//         ...req.body,
//         price: Number(price),
//         images,
//         user: req.user._id,
//         location,
//     });

//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// /**
//  * @desc    Update an item
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// /**
//  * @desc    Delete an item
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// //--------------------------------------------------------------------------//
// //                          Utility Controllers
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Suggest a rental price
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400); throw new Error('Please provide both category and item age.');
//     }
//     let basePrice = 100;
//     switch (category.toLowerCase()) {
//         case 'electronics': basePrice = 200; break;
//         case 'furniture': basePrice = 150; break;
//         case 'vehicles': basePrice = 500; break;
//     }
//     switch (itemAge) {
//         case '1-3 years': basePrice *= 0.8; break;
//         case '3+ years': basePrice *= 0.6; break;
//     }
//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({ suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}` });
// });

// //--------------------------------------------------------------------------//
// //                               Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getItemsForMap,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
// };


//************************* */
// 

//************************** */


// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel');

// // =================================================================
// //                      ITEM API CONTROLLERS
// // =================================================================

// //--------------------------------------------------------------------------//
// //                               Public Routes
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Sabhi items ko fetch karein (filters aur sorting ke saath)
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     // [FIX] Yahan par poora filter aur sort logic update kiya gaya hai
//     const { minPrice, maxPrice, sortBy } = req.query;

//     let filter = {};
//     let sort = { createdAt: -1 }; // Default sort: Newest first

//     // Price filter ab 'pricePerDay' aur 'sellingPrice' dono par kaam karega
//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
        
//         filter.$or = [
//             { pricePerDay: priceQuery },
//             { sellingPrice: priceQuery }
//         ];
//     }

//     // Price sorting ab dono fields ke liye kaam karega
//     if (sortBy === 'price_asc') {
//         sort = { pricePerDay: 1, sellingPrice: 1 };
//     }
//     if (sortBy === 'price_desc') {
//         sort = { pricePerDay: -1, sellingPrice: -1 };
//     }

//     const items = await Item.find(filter)
//         .populate('user', 'name avatar')
//         .sort(sort);
        
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Ek single item ko uski ID se fetch karein
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate('user', 'name bio address avatar phone verification rating numReviews');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// /**
//  * @desc    Featured items ko fetch karein (city ke filter ke saath)
//  * @route   GET /api/items/featured
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };

//     if (city) {
//         const usersInCity = await User.find({ 
//             'address.city': { $regex: `^${city}$`, $options: 'i' } 
//         }).select('_id');

//         if (usersInCity.length > 0) {
//             const userIds = usersInCity.map(user => user._id);
//             query.user = { $in: userIds };
//         }
//     }

//     const items = await Item.find(query)
//         .populate('user', 'name avatar')
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });

// /**
//  * @desc    Category ke hisaab se items fetch karein (filters ke saath)
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     // [FIX] Yahan par bhi poora filter aur sort logic update kiya gaya hai
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     let sort = { createdAt: -1 };
    
//     // Price filter ab 'pricePerDay' aur 'sellingPrice' dono par kaam karega
//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
        
//         filter.$or = [
//             { pricePerDay: priceQuery },
//             { sellingPrice: priceQuery }
//         ];
//     }
    
//     // Price sorting ab dono fields ke liye kaam karega
//     if (sortBy === 'price_asc') {
//         sort = { pricePerDay: 1, sellingPrice: 1 };
//     }
//     if (sortBy === 'price_desc') {
//         sort = { pricePerDay: -1, sellingPrice: -1 };
//     }

//     const items = await Item.find(filter).populate('user', 'name address').sort(sort);
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Map par dikhane ke liye items ka data fetch karna
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     const items = await Item.find({ 'location.coordinates': { $exists: true, $ne: [] } })
//         // [FIX] Ab yeh 'user' field ko populate karke maalik ka naam aur avatar saath me bhejega
//         .populate('user', 'name avatar') 
//         .select('name pricePerDay sellingPrice location images category user');
        
//     res.json(items);
// });

// //--------------------------------------------------------------------------//
// //                               Private Routes
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Logged-in user ke saare items fetch karein (My Items page)
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });

// /**
//  * @desc    Ek naya item create karein
//  * @route   POST /api/items
//  * @access  Private
//  */
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, price, address, listingType } = req.body;

//     if (!name || !category || !price || !address || !listingType) {
//         res.status(400); 
//         throw new Error('Please fill all required fields: name, category, price, address, and listing type.');
//     }

//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); 
//         throw new Error("Please upload at least one image.");
//     }
    
//     const itemData = { ...req.body, images, user: req.user._id };

//     if (listingType === 'rent') {
//         itemData.pricePerDay = Number(price);
//     } else if (listingType === 'sell') {
//         itemData.sellingPrice = Number(price);
//     }
//     delete itemData.price;

//     itemData.location = { type: 'Point', coordinates: [75.8577, 22.7196] }; // Placeholder for Indore

//     const item = new Item(itemData);
//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// /**
//  * @desc    Ek item ko update karein
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
    
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
    
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// /**
//  * @desc    Ek item ko delete karein
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
    
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
    
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// /**
//  * @desc    Item ke liye rental price suggest karein
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400); throw new Error('Please provide both category and item age.');
//     }
//     let basePrice = 100;
//     switch (category.toLowerCase()) {
//         case 'electronics': basePrice = 200; break;
//         case 'furniture': basePrice = 150; break;
//         case 'vehicles': basePrice = 500; break;
//     }
//     switch (itemAge) {
//         case '1-3 years': basePrice *= 0.8; break;
//         case '3+ years': basePrice *= 0.6; break;
//     }
//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({ suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}` });
// });

// //--------------------------------------------------------------------------//
// //                                  Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
//     getItemsForMap,
// };



//******************** */

// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel');

// // =================================================================
// //                      ITEM API CONTROLLERS
// // =================================================================

// //--------------------------------------------------------------------------//
// //                               Public Routes
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Sabhi items ko fetch karein (filters aur sorting ke saath)
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     const { minPrice, maxPrice, sortBy } = req.query;

//     let filter = {};
//     let sort = { createdAt: -1 }; // Default sort: Newest first

//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
        
//         filter.$or = [
//             { pricePerDay: priceQuery },
//             { sellingPrice: priceQuery }
//         ];
//     }

//     if (sortBy === 'price_asc') {
//         sort = { pricePerDay: 1, sellingPrice: 1 };
//     }
//     if (sortBy === 'price_desc') {
//         sort = { pricePerDay: -1, sellingPrice: -1 };
//     }

//     const items = await Item.find(filter)
//         .populate('user', 'name avatar')
//         .sort(sort);
        
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Ek single item ko uski ID se fetch karein
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate(
//         'user',
//         'name bio address avatar phone verification rating numReviews'
//     );
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// /**
//  * @desc    Featured items ko fetch karein (city ke filter ke saath)
//  * @route   GET /api/items/featured
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };

//     if (city) {
//         const usersInCity = await User.find({ 
//             'address.city': { $regex: `^${city}$`, $options: 'i' } 
//         }).select('_id');

//         if (usersInCity.length > 0) {
//             const userIds = usersInCity.map(user => user._id);
//             query.user = { $in: userIds };
//         }
//     }

//     const items = await Item.find(query)
//         .populate('user', 'name avatar')
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });

// /**
//  * @desc    Category ke hisaab se items fetch karein (filters ke saath)
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     let sort = { createdAt: -1 };
    
//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
        
//         filter.$or = [
//             { pricePerDay: priceQuery },
//             { sellingPrice: priceQuery }
//         ];
//     }
    
//     if (sortBy === 'price_asc') {
//         sort = { pricePerDay: 1, sellingPrice: 1 };
//     }
//     if (sortBy === 'price_desc') {
//         sort = { pricePerDay: -1, sellingPrice: -1 };
//     }

//     const items = await Item.find(filter)
//         .populate('user', 'name address')
//         .sort(sort);

//     res.json({ success: true, items });
// });

// /**
//  * @desc    Map par dikhane ke liye items ka data fetch karna (with filters)
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     try {
//         const { city, lat, lng, radius, limit = 50, page = 1 } = req.query;

//         let query = { "location.coordinates": { $exists: true, $ne: [] } };

//         // 🔹 City filter (assuming city is stored in item schema or user address)
//         if (city) {
//             query.city = new RegExp(`^${city}$`, "i");
//         }

//         // 🔹 Nearby filter (GeoJSON $near query)
//         if (lat && lng && radius) {
//             query.location = {
//                 $near: {
//                     $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
//                     $maxDistance: parseInt(radius), // meters
//                 },
//             };
//         }

//         const skip = (page - 1) * limit;

//         const items = await Item.find(query)
//             .populate("user", "name avatar")
//             .select("name pricePerDay sellingPrice location images category user city")
//             .skip(skip)
//             .limit(Number(limit))
//             .lean();

//         res.json({
//             success: true,
//             count: items.length,
//             page: Number(page),
//             items,
//         });
//     } catch (err) {
//         console.error("Error fetching items for map:", err.message);
//         res.status(500).json({ success: false, message: "Server error fetching map data" });
//     }
// });

// //--------------------------------------------------------------------------//
// //                               Private Routes
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Logged-in user ke saare items fetch karein (My Items page)
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });

// /**
//  * @desc    Ek naya item create karein
//  * @route   POST /api/items
//  * @access  Private
//  */
// const createItem = asyncHandler(async (req, res) => {
//     const { name, category, price, address, listingType } = req.body;

//     if (!name || !category || !price || !address || !listingType) {
//         res.status(400); 
//         throw new Error('Please fill all required fields: name, category, price, address, and listing type.');
//     }

//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); 
//         throw new Error("Please upload at least one image.");
//     }
    
//     const itemData = { ...req.body, images, user: req.user._id };

//     if (listingType === 'rent') {
//         itemData.pricePerDay = Number(price);
//     } else if (listingType === 'sell') {
//         itemData.sellingPrice = Number(price);
//     }
//     delete itemData.price;

//     itemData.location = { type: 'Point', coordinates: [75.8577, 22.7196] }; // Placeholder for Indore

//     const item = new Item(itemData);
//     const createdItem = await item.save();
//     res.status(201).json(createdItem);
// });

// /**
//  * @desc    Ek item ko update karein
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
    
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
    
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// /**
//  * @desc    Ek item ko delete karein
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
    
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
    
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// /**
//  * @desc    Item ke liye rental price suggest karein
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400); throw new Error('Please provide both category and item age.');
//     }
//     let basePrice = 100;
//     switch (category.toLowerCase()) {
//         case 'electronics': basePrice = 200; break;
//         case 'furniture': basePrice = 150; break;
//         case 'vehicles': basePrice = 500; break;
//     }
//     switch (itemAge) {
//         case '1-3 years': basePrice *= 0.8; break;
//         case '3+ years': basePrice *= 0.6; break;
//     }
//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({ suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}` });
// });

// //--------------------------------------------------------------------------//
// //                                  Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
//     getItemsForMap,
// };


// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel');

// // [UNCHANGED SECTIONS - Public Routes]
// // ... (getItems, getItemById, etc. functions waise hi rahenge)

// //--------------------------------------------------------------------------//
// //                      ITEM API CONTROLLERS
// // =================================================================

// //--------------------------------------------------------------------------//
// //                               Public Routes
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Sabhi items ko fetch karein (filters aur sorting ke saath)
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     const { minPrice, maxPrice, sortBy } = req.query;

//     let filter = {};
//     let sort = { createdAt: -1 }; // Default sort: Newest first

//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
//         
//         filter.$or = [
//             { pricePerDay: priceQuery },
//             { sellingPrice: priceQuery }
//         ];
//     }

//     if (sortBy === 'price_asc') {
//         sort = { pricePerDay: 1, sellingPrice: 1 };
//     }
//     if (sortBy === 'price_desc') {
//         sort = { pricePerDay: -1, sellingPrice: -1 };
//     }

//     const items = await Item.find(filter)
//         .populate('user', 'name avatar')
//         .sort(sort);
//         
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Ek single item ko uski ID se fetch karein
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate(
//         'user',
//         'name bio address avatar phone verification rating numReviews'
//     );
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// /**
//  * @desc    Featured items ko fetch karein (city ke filter ke saath)
//  * @route   GET /api/items/featured
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };

//     if (city) {
//         const usersInCity = await User.find({ 
//             'address.city': { $regex: `^${city}$`, $options: 'i' } 
//         }).select('_id');

//         if (usersInCity.length > 0) {
//             const userIds = usersInCity.map(user => user._id);
//             query.user = { $in: userIds };
//         }
//     }

//     const items = await Item.find(query)
//         .populate('user', 'name avatar')
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });

// /**
//  * @desc    Category ke hisaab se items fetch karein (filters ke saath)
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;

//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     let sort = { createdAt: -1 };
//     
//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
//         
//         filter.$or = [
//             { pricePerDay: priceQuery },
//             { sellingPrice: priceQuery }
//         ];
//     }
//     
//     if (sortBy === 'price_asc') {
//         sort = { pricePerDay: 1, sellingPrice: 1 };
//     }
//     if (sortBy === 'price_desc') {
//         sort = { pricePerDay: -1, sellingPrice: -1 };
//     }

//     const items = await Item.find(filter)
//         .populate('user', 'name address')
//         .sort(sort);

//     res.json({ success: true, items });
// });

// /**
//  * @desc    Map par dikhane ke liye items ka data fetch karna (with filters)
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     try {
//         const { city, lat, lng, radius, limit = 50, page = 1 } = req.query;

//         let query = { "location.coordinates": { $exists: true, $ne: [] } };

//         if (city) {
//             query.city = new RegExp(`^${city}$`, "i");
//         }

//         if (lat && lng && radius) {
//             query.location = {
//                 $near: {
//                     $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
//                     $maxDistance: parseInt(radius), // meters
//                 },
//             };
//         }

//         const skip = (page - 1) * limit;

//         const items = await Item.find(query)
//             .populate("user", "name avatar")
//             .select("name pricePerDay sellingPrice location images category user city")
//             .skip(skip)
//             .limit(Number(limit))
//             .lean();

//         res.json({
//             success: true,
//             count: items.length,
//             page: Number(page),
//             items,
//         });
//     } catch (err) {
//         console.error("Error fetching items for map:", err.message);
//         res.status(500).json({ success: false, message: "Server error fetching map data" });
//     }
// });

// //--------------------------------------------------------------------------//
// //                               Private Routes
// //--------------------------------------------------------------------------//

// /**
//  * @desc    Logged-in user ke saare items fetch karein (My Items page)
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });

// // =================================================================
// //                      [FIX] createItem Function
// // =================================================================
// const createItem = asyncHandler(async (req, res) => {
//     // 1. Saare required fields ko req.body se nikalein
//     const { 
//         name, description, category, price, address, listingType, 
//         itemAge, anyDefects, isFeatured 
//     } = req.body;

//     // 2. Validation check
//     if (!name || !category || !price || !address || !listingType) {
//         res.status(400); 
//         throw new Error('Please fill all required fields.');
//     }

//     // 3. Image handling
//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) {
//         res.status(400); 
//         throw new Error("Please upload at least one image.");
//     }
//     
//     // 4. Manually ek saaf 'itemData' object banayein
//     const itemData = {
//         name,
//         description,
//         category,
//         address,
//         listingType,
//         itemAge,
//         anyDefects,
//         isFeatured: isFeatured === 'true' || isFeatured === true, // Checkbox values ko handle karne ke liye
//         images,
//         user: req.user._id,
//         location: { type: 'Point', coordinates: [75.8577, 22.7196] } // Placeholder
//     };

//     // 5. listingType ke hisaab se sahi price field set karein
//     if (listingType === 'rent') {
//         itemData.pricePerDay = Number(price);
//     } else if (listingType === 'sell') {
//         itemData.sellingPrice = Number(price);
//     }

//     // 6. Item ko save karein
//     const item = await Item.create(itemData);
//     
//     res.status(201).json(item);
// });


// /**
//  * @desc    Ek item ko update karein
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// /**
//  * @desc    Ek item ko delete karein
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     
//     if (item.user.toString() !== req.user._id.toString()) {
//         res.status(401); throw new Error('User not authorized');
//     }
//     
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// /**
//  * @desc    Item ke liye rental price suggest karein
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) {
//         res.status(400); throw new Error('Please provide both category and item age.');
//     }
//     let basePrice = 100;
//     switch (category.toLowerCase()) {
//         case 'electronics': basePrice = 200; break;
//         case 'furniture': basePrice = 150; break;
//         case 'vehicles': basePrice = 500; break;
//     }
//     switch (itemAge) {
//         case '1-3 years': basePrice *= 0.8; break;
//         case '3+ years': basePrice *= 0.6; break;
//     }
//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({ suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}` });
// });

// //--------------------------------------------------------------------------//
// //                                  Exports
// //--------------------------------------------------------------------------//
// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
//     getItemsForMap,
// };


// const asyncHandler = require('express-async-handler');
// const Item = require('../models/itemModel');
// const User = require('../models/userModel');

// /**
//  * @desc    Sabhi items ko fetch karein (filters aur sorting ke saath)
//  * @route   GET /api/items
//  * @access  Public
//  */
// const getItems = asyncHandler(async (req, res) => {
//     const { minPrice, maxPrice, sortBy } = req.query;
//     let filter = {};
//     let sort = { createdAt: -1 };
//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
//         filter.$or = [ { pricePerDay: priceQuery }, { sellingPrice: priceQuery } ];
//     }
//     if (sortBy === 'price_asc') sort = { pricePerDay: 1, sellingPrice: 1 };
//     if (sortBy === 'price_desc') sort = { pricePerDay: -1, sellingPrice: -1 };
//     const items = await Item.find(filter).populate('user', 'name avatar').sort(sort);
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Ek single item ko uski ID se fetch karein
//  * @route   GET /api/items/:id
//  * @access  Public
//  */
// const getItemById = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id).populate('user', 'name bio address avatar phone verification rating numReviews');
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404);
//         throw new Error('Item not found');
//     }
// });

// /**
//  * @desc    Featured items ko fetch karein (city ke filter ke saath)
//  * @route   GET /api/items/featured
//  * @access  Public
//  */
// const getFeaturedItems = asyncHandler(async (req, res) => {
//     const { city } = req.query;
//     let query = { isFeatured: true };

//     if (city && city.trim() !== '') {
//         const cityRegex = new RegExp(`^${city}$`, 'i');
//         const usersInCity = await User.find({ 'address.city': cityRegex }).select('_id');

//         if (usersInCity.length > 0) {
//             const userIds = usersInCity.map(user => user._id);
//             query.user = { $in: userIds };
//         } else {
//             // Agar city mein koi user nahi hai to khaali response bhejein
//             return res.json([]);
//         }
//     } else {
//         // Agar city provide nahi ki gayi hai, to bhi khaali response bhejein
//         return res.json([]);
//     }

//     const items = await Item.find(query)
//         .populate('user', 'name avatar address') // address bhi populate karein for safety
//         .sort({ createdAt: -1 })
//         .limit(12);

//     res.json(items);
// });


// /**
//  * @desc    Category ke hisaab se items fetch karein (filters ke saath)
//  * @route   GET /api/items/category/:categoryName
//  * @access  Public
//  */
// const getItemsByCategory = asyncHandler(async (req, res) => {
//     const { categoryName } = req.params;
//     const { minPrice, maxPrice, sortBy } = req.query;
//     const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
//     let sort = { createdAt: -1 };
//     if (minPrice || maxPrice) {
//         const priceQuery = {};
//         if (minPrice) priceQuery.$gte = Number(minPrice);
//         if (maxPrice) priceQuery.$lte = Number(maxPrice);
//         filter.$or = [ { pricePerDay: priceQuery }, { sellingPrice: priceQuery } ];
//     }
//     if (sortBy === 'price_asc') sort = { pricePerDay: 1, sellingPrice: 1 };
//     if (sortBy === 'price_desc') sort = { pricePerDay: -1, sellingPrice: -1 };
//     const items = await Item.find(filter).populate('user', 'name address').sort(sort);
//     res.json({ success: true, items });
// });

// /**
//  * @desc    Map par dikhane ke liye items ka data fetch karna (with filters)
//  * @route   GET /api/items/map-data
//  * @access  Public
//  */
// const getItemsForMap = asyncHandler(async (req, res) => {
//     try {
//         const { city, lat, lng, radius, limit = 50, page = 1 } = req.query;
//         let query = { "location.coordinates": { $exists: true, $ne: [] } };
//         if (city) { query.city = new RegExp(`^${city}$`, "i"); }
//         if (lat && lng && radius) {
//             query.location = { $near: { $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] }, $maxDistance: parseInt(radius) } };
//         }
//         const skip = (page - 1) * limit;
//         const items = await Item.find(query).populate("user", "name avatar").select("name pricePerDay sellingPrice location images category user city").skip(skip).limit(Number(limit)).lean();
//         res.json({ success: true, count: items.length, page: Number(page), items });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// });

// /**
//  * @desc    Logged-in user ke saare items fetch karein (My Items page)
//  * @route   GET /api/items/my-items
//  * @access  Private
//  */
// const getMyItems = asyncHandler(async (req, res) => {
//     const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(items);
// });

// /**
//  * @desc    Ek naya item create karein
//  * @route   POST /api/items
//  * @access  Private
//  */
// const createItem = asyncHandler(async (req, res) => {
//     const { name, description, category, price, address, listingType, itemAge, anyDefects, isFeatured } = req.body;
//     if (!name || !category || !price || !address || !listingType) { res.status(400); throw new Error('Please fill all required fields.'); }
//     const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
//     if (images.length === 0) { res.status(400); throw new Error("Please upload at least one image."); }
//     const itemData = { name, description, category, address, listingType, itemAge, anyDefects, isFeatured: isFeatured === 'true' || isFeatured === true, images, user: req.user._id, location: { type: 'Point', coordinates: [75.8577, 22.7196] } };
//     if (listingType === 'rent') { itemData.pricePerDay = Number(price); } else if (listingType === 'sell') { itemData.sellingPrice = Number(price); }
//     const item = await Item.create(itemData);
//     res.status(201).json(item);
// });

// /**
//  * @desc    Ek item ko update karein
//  * @route   PUT /api/items/:id
//  * @access  Private
//  */
// const updateItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('User not authorized'); }
//     const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedItem);
// });

// /**
//  * @desc    Ek item ko delete karein
//  * @route   DELETE /api/items/:id
//  * @access  Private
//  */
// const deleteItem = asyncHandler(async (req, res) => {
//     const item = await Item.findById(req.params.id);
//     if (!item) { res.status(404); throw new Error('Item not found'); }
//     if (item.user.toString() !== req.user._id.toString()) { res.status(401); throw new Error('User not authorized'); }
//     await item.deleteOne();
//     res.json({ message: 'Item removed successfully' });
// });

// /**
//  * @desc    Item ke liye rental price suggest karein
//  * @route   POST /api/items/suggest-price
//  * @access  Private
//  */
// const suggestPrice = asyncHandler(async (req, res) => {
//     const { category, itemAge } = req.body;
//     if (!category || !itemAge) { res.status(400); throw new Error('Please provide category and item age.'); }
//     let basePrice = 100;
//     switch (category.toLowerCase()) {
//         case 'electronics': basePrice = 200; break;
//         case 'furniture': basePrice = 150; break;
//         case 'vehicles': basePrice = 500; break;
//     }
//     switch (itemAge) {
//         case '1-3 years': basePrice *= 0.8; break;
//         case '3+ years': basePrice *= 0.6; break;
//     }
//     const minPrice = Math.round(basePrice * 0.9);
//     const maxPrice = Math.round(basePrice * 1.1);
//     res.json({ suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}` });
// });

// module.exports = {
//     getItems,
//     getItemById,
//     getFeaturedItems,
//     getItemsByCategory,
//     getMyItems,
//     createItem,
//     updateItem,
//     deleteItem,
//     suggestPrice,
//     getItemsForMap,
// };


const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');
const User = require('../models/userModel');

/**
 * @desc    Fetch all items with filters and sorting
 * @route   GET /api/items
 * @access  Public
 */
const getItems = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice, sortBy } = req.query;
    let filter = {};
    let sort = { createdAt: -1 };

    if (minPrice || maxPrice) {
        const priceQuery = {};
        if (minPrice) priceQuery.$gte = Number(minPrice);
        if (maxPrice) priceQuery.$lte = Number(maxPrice);
        filter.$or = [ { pricePerDay: priceQuery }, { sellingPrice: priceQuery } ];
    }

    if (sortBy === 'price_asc') sort = { pricePerDay: 1, sellingPrice: 1 };
    if (sortBy === 'price_desc') sort = { pricePerDay: -1, sellingPrice: -1 };

    const items = await Item.find(filter).populate('user', 'name avatar').sort(sort);
    res.json({ success: true, items });
});

/**
 * @desc    Fetch a single item by its ID
 * @route   GET /api/items/:id
 * @access  Public
 */
const getItemById = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id).populate('user', 'name bio address avatar phone verification rating numReviews');
    if (item) {
        res.json(item);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

/**
 * @desc    Fetch featured items, filtered by city
 * @route   GET /api/items/featured
 * @access  Public
 */
const getFeaturedItems = asyncHandler(async (req, res) => {
    const { city } = req.query;
    let query = { isFeatured: true };

    if (city && city.trim() !== '') {
        const cityRegex = new RegExp(`^${city}$`, 'i');
        // Find users based on the city in their address
        const usersInCity = await User.find({ 'address.city': cityRegex }).select('_id');

        if (usersInCity.length > 0) {
            const userIds = usersInCity.map(user => user._id);
            // Add a filter to find items owned by users in that city
            query.user = { $in: userIds };
        } else {
            // If no users are found in the city, no items can be featured from there
            return res.json([]);
        }
    } else {
        // If no city is provided, return an empty array as context is missing
        return res.json([]);
    }

    const items = await Item.find(query)
        .populate('user', 'name avatar address')
        .sort({ createdAt: -1 })
        .limit(12);

    res.json(items);
});


/**
 * @desc    Fetch items by category, with filters
 * @route   GET /api/items/category/:categoryName
 * @access  Public
 */
const getItemsByCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.params;
    const { minPrice, maxPrice, sortBy } = req.query;
    const filter = { category: { $regex: `^${categoryName}$`, $options: 'i' } };
    let sort = { createdAt: -1 };

    if (minPrice || maxPrice) {
        const priceQuery = {};
        if (minPrice) priceQuery.$gte = Number(minPrice);
        if (maxPrice) priceQuery.$lte = Number(maxPrice);
        filter.$or = [ { pricePerDay: priceQuery }, { sellingPrice: priceQuery } ];
    }

    if (sortBy === 'price_asc') sort = { pricePerDay: 1, sellingPrice: 1 };
    if (sortBy === 'price_desc') sort = { pricePerDay: -1, sellingPrice: -1 };

    const items = await Item.find(filter).populate('user', 'name address').sort(sort);
    res.json({ success: true, items });
});

/**
 * @desc    Fetch item data for map display
 * @route   GET /api/items/map-data
 * @access  Public
 */
const getItemsForMap = asyncHandler(async (req, res) => {
    try {
        const { city, lat, lng, radius, limit = 50, page = 1 } = req.query;
        let query = { "location.coordinates": { $exists: true, $ne: [] } };
        
        if (city) { query.city = new RegExp(`^${city}$`, "i"); }
        if (lat && lng && radius) {
            query.location = { $near: { $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] }, $maxDistance: parseInt(radius) } };
        }
        
        const skip = (page - 1) * limit;
        const items = await Item.find(query)
            .populate("user", "name avatar")
            .select("name pricePerDay sellingPrice location images category user city")
            .skip(skip)
            .limit(Number(limit))
            .lean();
            
        res.json({ success: true, count: items.length, page: Number(page), items });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

/**
 * @desc    Fetch all items for the logged-in user
 * @route   GET /api/items/my-items
 * @access  Private
 */
const getMyItems = asyncHandler(async (req, res) => {
    const items = await Item.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
});

/**
 * @desc    Create a new item
 * @route   POST /api/items
 * @access  Private
 */
const createItem = asyncHandler(async (req, res) => {
    const { name, description, category, price, address, listingType, itemAge, anyDefects, isFeatured } = req.body;

    if (!name || !category || !price || !address || !listingType) { 
        res.status(400); 
        throw new Error('Please fill all required fields.'); 
    }

    const images = req.files?.map(file => ({ public_id: file.filename, url: file.path })) || [];
    if (images.length === 0) { 
        res.status(400); 
        throw new Error("Please upload at least one image."); 
    }

    const itemData = { 
        name, 
        description, 
        category, 
        address, 
        listingType, 
        itemAge, 
        anyDefects, 
        isFeatured: isFeatured === 'true' || isFeatured === true, 
        images, 
        user: req.user._id, 
        // Note: Hardcoded coordinates, consider using a geocoding service
        location: { type: 'Point', coordinates: [75.8577, 22.7196] } 
    };

    if (listingType === 'rent') { 
        itemData.pricePerDay = Number(price); 
    } else if (listingType === 'sell') { 
        itemData.sellingPrice = Number(price); 
    }

    const item = await Item.create(itemData);
    res.status(201).json(item);
});

/**
 * @desc    Update an item
 * @route   PUT /api/items/:id
 * @access  Private
 */
const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) { 
        res.status(404); 
        throw new Error('Item not found'); 
    }
    if (item.user.toString() !== req.user._id.toString()) { 
        res.status(401); 
        throw new Error('User not authorized'); 
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
});

/**
 * @desc    Delete an item
 * @route   DELETE /api/items/:id
 * @access  Private
 */
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) { 
        res.status(404); 
        throw new Error('Item not found'); 
    }
    if (item.user.toString() !== req.user._id.toString()) { 
        res.status(401); 
        throw new Error('User not authorized'); 
    }

    await item.deleteOne();
    res.json({ message: 'Item removed successfully' });
});

/**
 * @desc    Suggest a rental price for an item
 * @route   POST /api/items/suggest-price
 * @access  Private
 */
const suggestPrice = asyncHandler(async (req, res) => {
    const { category, itemAge } = req.body;
    if (!category || !itemAge) { 
        res.status(400); 
        throw new Error('Please provide category and item age.'); 
    }

    let basePrice = 100;
    switch (category.toLowerCase()) {
        case 'electronics': basePrice = 200; break;
        case 'furniture': basePrice = 150; break;
        case 'vehicles': basePrice = 500; break;
    }

    switch (itemAge) {
        case '1-3 years': basePrice *= 0.8; break;
        case '3+ years': basePrice *= 0.6; break;
    }

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.1);
    res.json({ suggestion: `Suggested daily rent: ₹${minPrice} - ₹${maxPrice}` });
});

module.exports = {
    getItems,
    getItemById,
    getFeaturedItems,
    getItemsByCategory,
    getMyItems,
    createItem,
    updateItem,
    deleteItem,
    suggestPrice,
    getItemsForMap,
};