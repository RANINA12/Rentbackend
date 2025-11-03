const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Apne cloudinary config file se configuration import karein
// Maan rahe hain ki aapne config folder mein cloudinary.js file banayi hai
require('../config/cloudinary'); 

// Cloudinary par files kaise save hongi, yeh batayein
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rentsmart_uploads', // Cloudinary par is folder mein save hoga
    allowed_formats: ['jpeg', 'png', 'jpg'],
    // Transformation can be added here if needed
    // transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

// Multer middleware ko storage ke saath configure karein
const upload = multer({ storage: storage });

// YEH LINE SABSE ZAROORI HAI: Poore upload object ko export karein
module.exports = upload;
