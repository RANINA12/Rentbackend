// const mongoose = require('mongoose');

// const itemSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     images: [
//       {
//         type: String,
//         required: true,
//       },
//     ],
//     isAvailable: {
//       type: Boolean,
//       required: true,
//       default: true,
//     },
//     rating: {
//       type: Number,
//       required: true,
//       default: 0
//     },
//     numReviews: {
//       type: Number,
//       required: true,
//       default: 0
//     },
    
//     // --- Naye Fields (Sahi Jagah Par) ---
//     listingType: {
//       type: String,
//       enum: ['rent', 'sell'],
//       required: true,
//       default: 'rent',
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;
//chnage 1
// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema(
//   {
//     // YEH SABSE ZAROORI HAI: Field ka naam 'owner' hona chahiye
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User', // Isse Mongoose ko pata chalega ki 'owner' ek User hai
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     // Images ka structure controller se match hona chahiye
//     images: [{
//         public_id: { type: String, required: true },
//         url: { type: String, required: true },
//     }],
//     listingType: {
//       type: String,
//       enum: ['rent', 'sell'],
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     isFeatured: {
//       type: Boolean,
//       default: true,
//     },
//     // Baaki ke form fields
//     ownerName: { type: String },
//     itemAge: { type: String },
//     anyDefects: { type: String },
//     duration: { type: Number },
//     durationType: { type: String },
//     availableFrom: { type: Date },
//     availableTo: { type: Date },
//     isAvailable: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;


//chnage 2
// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema(
//     {
//         // --- Core Details ---
//         name: {
//             type: String,
//             required: [true, 'Please provide an item name.'],
//             trim: true,
//         },
//         description: {
//             type: String,
//             required: [true, 'Please provide a description.'],
//         },
//         category: {
//             type: String,
//             required: [true, 'Please select a category.'],
//         },
//         images: [{
//             public_id: { type: String, required: true },
//             url: { type: String, required: true },
//         }],
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: 'User', // Yeh 'User' model se link karega
//         },

//         // --- Listing & Pricing Details ---
//         listingType: {
//             type: String,
//             enum: ['rent', 'sell'],
//             required: true,
//         },
//         price: {
//             type: Number,
//             required: [true, 'Please set a price.'],
//             default: 0,
//         },

//         // --- Rating Fields ---
//         rating: {
//             type: Number,
//             default: 0,
//         },
//         numReviews: {
//             type: Number,
//             default: 0,
//         },
        
//         // === NAYA LOCATION FIELD (Map ke liye) ===
//         location: {
//             type: {
//                 type: String,
//                 enum: ['Point'],
//                 default: 'Point',
//             },
//             coordinates: {
//                 type: [Number], // Format: [longitude, latitude]
//                 index: '2dsphere' // Geospatial queries ke liye zaroori
//             }
//         },

//         // --- Owner Provided Details ---
//         ownerName: { 
//             type: String 
//         },
//         itemAge: { 
//             type: String 
//         },
//         anyDefects: { 
//             type: String,
//             default: 'No defects mentioned.'
//         },

//         // --- Rental-Specific Details (Optional) ---
//         duration: { type: Number },
//         durationType: { type: String },
//         availableFrom: { type: Date },
//         availableTo: { type: Date },

//         // --- Status Flags ---
//         isFeatured: {
//             type: Boolean,
//             default: false,
//         },
//         isAvailable: {
//             type: Boolean,
//             default: true,
//         },
//     },
//     {
//         // Automatically adds createdAt and updatedAt fields
//         timestamps: true,
//     }
// );

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;

// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema(
//     {
//         // --- Core Details ---
//         name: { type: String, required: true, trim: true },
//         description: { type: String, required: true },
//         category: { type: String, required: true },
//         images: [{
//             public_id: { type: String, required: true },
//             url: { type: String, required: true },
//         }],
        
//         // --- SABSE ZAROORI BADLAAV ---
//         // 'user' ko 'owner' se badal diya hai taaki poore project mein consistency rahe
//         owner: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: 'User',
//         },

//         // --- DOOSRA ZAROORI BADLAAV ---
//         // 'price' ko 'pricePerDay' kiya gaya hai for rental clarity
//         pricePerDay: {
//             type: Number,
//             required: [true, 'Please set a daily rental price.'],
//             default: 0,
//         },

//         // --- Naya Zaroori Field ---
//         address: {
//             type: String,
//             required: [true, "Please provide the item's pickup address."],
//         },
        
//         // --- Map ke liye Naya Field ---
//         // GeoJSON format for storing location coordinates
//         location: {
//             type: {
//                 type: String,
//                 enum: ['Point'],
//                 default: 'Point'
//             },
//             coordinates: {
//                 type: [Number], // Format: [longitude, latitude]
//             }
//         },

//         // --- Rating Details ---
//         rating: { type: Number, default: 0 },
//         numReviews: { type: Number, default: 0 },

//         // --- Additional Details ---
//         itemAge: { type: String },
//         anyDefects: { type: String, default: 'No defects mentioned.' },

//         // --- Status Flags ---
//         isFeatured: { type: Boolean, default: false },
//         isAvailable: { type: Boolean, default: true },
//     },
//     {
//         timestamps: true, // Automatically adds createdAt and updatedAt
//     }
// );

// // --- Map Search ko Fast banane ke liye Index ---
// itemSchema.index({ location: '2dsphere' });

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;

//chatgpt 

// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema(
//   {
//     // --- Core Details ---
//     name: { type: String, required: true, trim: true },
//     description: { type: String, required: true },
//     category: { type: String, required: true },

//     // --- Images (Cloudinary / Upload) ---
//     images: [
//       {
//         public_id: { type: String, required: true },
//         url: { type: String, required: true },
//       },
//     ],

//     // --- Owner (User reference) ---
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User', // Yeh User model ko refer karega
//     },

//     // --- Pricing ---
//     pricePerDay: {
//       type: Number,
//       required: [true, 'Please set a daily rental price.'],
//       default: 0,
//     },

//     // --- Address & Location ---
//     address: {
//       type: String,
//       required: [true, "Please provide the item's pickup address."],
//     },
//     location: {
//       type: {
//         type: String,
//         enum: ['Point'],
//         default: 'Point',
//       },
//       coordinates: {
//         type: [Number], // Format: [longitude, latitude]
//       },
//     },

//     // --- Ratings ---
//     rating: { type: Number, default: 0 },
//     numReviews: { type: Number, default: 0 },

//     // --- Extra Details ---
//     itemAge: { type: String },
//     anyDefects: { type: String, default: 'No defects mentioned.' },

//     // --- Status Flags ---
//     isFeatured: { type: Boolean, default: false },
//     isAvailable: { type: Boolean, default: true },
//   },
//   {
//     timestamps: true, // createdAt & updatedAt auto add hote hain
//   }
// );

// // --- Geospatial index for map search ---
// itemSchema.index({ location: '2dsphere' });

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;



//----------------------------------------------

// const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
//   public_id: { type: String, required: true },
//   url: { type: String, required: true },
// });

// const itemSchema = new mongoose.Schema(
//   {
//     // ✅ YAHI SABSE BADA BADLAV HAI
//     // Humne maalik ko 'user' naam diya hai aur use 'User' model se joda hai
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User', // Yeh 'User' model ko refer karta hai
//     },
//     name: {
//       type: String,
//       required: [true, 'Please add a name'],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, 'Please add a description'],
//     },
//     category: {
//       type: String,
//       required: [true, 'Please add a category'],
//     },
//     price: {
//       type: Number,
//       required: [true, 'Please add a price'],
//     },
//     priceType: {
//       type: String,
//       required: true,
//       enum: ['day', 'week', 'month'],
//       default: 'day',
//     },
//     images: [imageSchema],
//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },
//     // Baaki ke fields...
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       zip: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model('Item', itemSchema);






//---------------------------------------------------

// const mongoose = require('mongoose');

// // Item ke andar hi reviews ko store karne ke liye schema
// const reviewSchema = mongoose.Schema(
//     {
//         user: { 
//             type: mongoose.Schema.Types.ObjectId, 
//             required: true, 
//             ref: 'User' 
//         },
//         name: { type: String, required: true },
//         rating: { type: Number, required: true },
//         comment: { type: String, required: true },
//     },
//     { 
//         timestamps: true 
//     }
// );

// // Mukhya Item Schema
// const itemSchema = mongoose.Schema(
//     {
//         // --- Sabse Zaroori ---
//         // Item ke maalik ko 'user' naam diya gaya hai taaki poore project mein consistency rahe
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: 'User', // Yeh 'User' model se juda hai
//         },
        
//         // --- Mukhya Jaankari ---
//         name: { 
//             type: String, 
//             required: [true, 'Please provide an item name.'],
//             trim: true,
//         },
//         description: { 
//             type: String, 
//             required: [true, 'Please provide a description.'] 
//         },
//         category: { 
//             type: String, 
//             required: [true, 'Please select a category.'] 
//         },

//         // --- Price ---
//         pricePerDay: { 
//             type: Number, 
//             required: [true, 'Please set a daily rental price.'],
//             default: 0 
//         },

//         // --- Images (Cloudinary se) ---
//         images: [
//             {
//                 public_id: { type: String, required: true },
//                 url: { type: String, required: true },
//             },
//         ],
        
//         // --- Extra Details ---
//         itemAge: { 
//             type: String, 
//             required: [true, 'Please specify the item age.'] 
//         },
//         anyDefects: { 
//             type: String, 
//             default: 'None' 
//         },
//         address: { 
//             type: String,
//             required: [true, "Please provide the item's pickup address."]
//         },
        
//         // --- Map ke liye Location (GeoJSON) ---
//         location: {
//             type: { 
//                 type: String, 
//                 enum: ['Point'],
//             },
//             coordinates: { 
//                 type: [Number], // Format: [longitude, latitude]
//             },
//         },
        
//         // --- Reviews aur Rating ---
//         reviews: [reviewSchema],
//         rating: { 
//             type: Number, 
//             required: true, 
//             default: 0 
//         },
//         numReviews: { 
//             type: Number, 
//             required: true, 
//             default: 0 
//         },
        
//         // --- Status ---
//         isAvailable: { 
//             type: Boolean, 
//             required: true, 
//             default: true 
//         },
//         isFeatured: { 
//             type: Boolean, 
//             default: false 
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// // Map par location search ko tez banane ke liye Geospatial Index
// itemSchema.index({ location: '2dsphere' });

// const Item = mongoose.model('Item', itemSchema);
// module.exports = Item;


//************************** */
//chnage 3

const mongoose = require('mongoose');

// =================================================================
// REVIEW SCHEMA (Yeh Item ke andar use hoga)
// =================================================================
const reviewSchema = mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: 'User' 
        },
        name: { // User ka naam yahan denormalize kiya hai taaki har baar populate na karna pade
            type: String, 
            required: true 
        },
        rating: { 
            type: Number, 
            required: true 
        },
        comment: { 
            type: String, 
            required: true 
        },
    },
    { 
        timestamps: true 
    }
);

// =================================================================
// MAIN ITEM SCHEMA
// =================================================================
const itemSchema = mongoose.Schema(
    {
        // --- Item ka Maalik ---
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Yeh 'User' model se juda hai
        },
        
        // --- Mukhya Jaankari ---
        name: { 
            type: String, 
            required: [true, 'Please provide an item name.'],
            trim: true,
        },
        description: { 
            type: String, 
            required: [true, 'Please provide a description.'] 
        },
        category: { 
            type: String, 
            required: [true, 'Please select a category.'] 
        },
        // [IMPROVEMENT] Rent/Sell ka type save karne ke liye
        listingType: {
            type: String,
            enum: ['rent', 'sell'], // In do values ke alawa kuch aur save nahi hoga
            required: true,
            default: 'rent',
        },

        // --- Price Section ---
        pricePerDay: { 
            type: Number, 
            // Ab yeh zaroori tabhi hai jab item rent ke liye ho
            required: function() { return this.listingType === 'rent'; },
        },
        // [IMPROVEMENT] Selling price ke liye naya field
        sellingPrice: {
            type: Number,
            // Yeh zaroori tabhi hai jab item sell ke liye ho
            required: function() { return this.listingType === 'sell'; },
        },

        // --- Images (Cloudinary se) ---
        images: [
            {
                public_id: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        
        // --- Extra Details ---
        itemAge: { 
            type: String, 
            required: [true, 'Please specify the item age.'],
            // [IMPROVEMENT] Enum se data consistent rahega
            enum: ['0-1 year', '1-3 years', '3+ years'],
        },
        anyDefects: { 
            type: String, 
            default: 'None' 
        },
        address: { 
            type: String,
            required: [true, "Please provide the item's pickup address."]
        },
        
        // --- Map ke liye Location (GeoJSON) ---
        location: {
            type: { 
                type: String, 
                enum: ['Point'],
            },
            coordinates: { 
                type: [Number], // Format: [longitude, latitude]
            },
        },
        
        // --- Reviews aur Rating ---
        reviews: [reviewSchema], // Upar banaya gaya reviewSchema yahan use hoga
        rating: { 
            type: Number, 
            required: true, 
            default: 0 
        },
        numReviews: { 
            type: Number, 
            required: true, 
            default: 0 
        },
        
        // --- Status ---
        isAvailable: { 
            type: Boolean, 
            required: true, 
            default: true 
        },
        isFeatured: { 
            type: Boolean, 
            default: false 
        },
    },
    {
        timestamps: true,
    }
);

// =================================================================
// INDEXES (For Performance Boost)
// =================================================================
// [IMPROVEMENT] Map par location-based search ko fast karne ke liye
itemSchema.index({ location: '2dsphere' });
// [IMPROVEMENT] Category aur Price par filter ko fast karne ke liye
itemSchema.index({ category: 1, pricePerDay: 1 });


const Item = mongoose.model('Item', itemSchema);
module.exports = Item;