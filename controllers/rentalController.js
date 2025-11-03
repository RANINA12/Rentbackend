// const asyncHandler = require('express-async-handler');
// const Rental = require('../models/rentalModel');
// const Item = require('../models/itemModel');

// // @desc    Create a new rental order
// // @route   POST /api/rentals
// // @access  Private
// const createRental = asyncHandler(async (req, res) => {
//     const { itemId, startDate, endDate, totalPrice } = req.body;
//     const renterId = req.user._id;

//     const item = await Item.findById(itemId);
//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     // Yahaan hum naya rental document bana rahe hain
//     const rental = new Rental({
//         item: itemId,
//         renter: renterId,
//         owner: item.user, // Item model se owner ki ID
//         rentStartDate: startDate,
//         rentEndDate: endDate,
//         totalPrice,
//         // Status by default 'pending' set ho jaayega (model se)
//     });

//     const createdRental = await rental.save();
//     res.status(201).json(createdRental);
// });

// // @desc    Get all rentals for the logged-in user (as a renter)
// // @route   GET /api/rentals/myrentals
// // @access  Private
// const getMyRentals = asyncHandler(async (req, res) => {
//     // Woh saare rentals dhundo jahan logged-in user renter hai
//     const rentals = await Rental.find({ renter: req.user._id })
//         .populate('item', 'name images price') // Item ki zaroori details
//         .populate('owner', 'name avatar');     // Owner ki zaroori details

//     res.json(rentals);
// });

// // === NAYA FUNCTION ===
// // @desc    Update rental status (for item owner to accept/reject)
// // @route   PATCH /api/rentals/:id
// // @access  Private (Only for item owner)
// const updateRentalStatus = asyncHandler(async (req, res) => {
//     // 1. Request body se naya status nikalo (e.g., "accepted" ya "rejected")
//     const { status } = req.body;

//     // Sirf 'accepted' ya 'rejected' status hi allow karein
//     if (status !== 'accepted' && status !== 'rejected') {
//         res.status(400);
//         throw new Error('Invalid status. Only "accepted" or "rejected" is allowed.');
//     }

//     // 2. Rental request ko uski ID se database mein dhundo
//     const rental = await Rental.findById(req.params.id);

//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental request not found');
//     }

//     // 3. **Sabse Zaroori Security Check:**
//     // Check karo ki jo user request kar raha hai (req.user._id),
//     // woh is rental ka asli owner (rental.owner) hai ya nahi.
//     if (rental.owner.toString() !== req.user._id.toString()) {
//         res.status(401); // Unauthorized
//         throw new Error('Not authorized to update this rental.');
//     }
    
//     // Agar request 'pending' nahi hai, toh use update na karne dein
//     if (rental.status !== 'pending') {
//         res.status(400);
//         throw new Error(`This rental is already ${rental.status} and cannot be changed.`);
//     }

//     // 4. Status update karke database mein save karo
//     rental.status = status;
//     const updatedRental = await rental.save();

//     // 5. Frontend ko response bhej do
//     res.status(200).json(updatedRental);
// });


// // Sabhi functions ko export karein taaki routes mein use ho sakein
// module.exports = {
//     createRental,
//     getMyRentals,
//     updateRentalStatus, // Naye function ko yahaan add karein
// };

//chnage 2

// 

//chnge 3

// const asyncHandler = require('express-async-handler');
// const Rental = require('../models/rentalModel');
// const Item = require('../models/itemModel');
// const PDFDocument = require('pdfkit');

// //--------------------------------------------------------------------------//
// // @desc    Create a new rental order
// // @route   POST /api/rentals
// // @access  Private
// //--------------------------------------------------------------------------//
// const createRental = asyncHandler(async (req, res) => {
//     const { itemId, startDate, endDate, totalPrice } = req.body;

//     const item = await Item.findById(itemId);
//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     const rental = new Rental({
//         itemId,
//         renterId: req.user._id,
//         ownerId: item.user,
//         startDate,
//         endDate,
//         totalPrice,
//     });

//     const createdRental = await rental.save();

//     // --- Notification Logic ---
//     const io = req.io;
//     const getActiveUserSocketId = req.getActiveUserSocketId;
//     const ownerSocketId = getActiveUserSocketId(item.user.toString());
//     if (ownerSocketId) {
//         io.to(ownerSocketId).emit('getNotification', {
//             type: 'new_request',
//             message: `You have a new rental request for "${item.name}"`,
//             rentalId: createdRental._id,
//         });
//     }

//     res.status(201).json(createdRental);
// });

// //--------------------------------------------------------------------------//
// // @desc    Update rental status (for item owner to accept/reject)
// // @route   PATCH /api/rentals/:id
// // @access  Private
// //--------------------------------------------------------------------------//
// const updateRentalStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;
//     if (status !== 'accepted' && status !== 'rejected') {
//         res.status(400);
//         throw new Error('Invalid status.');
//     }

//     const rental = await Rental.findById(req.params.id).populate('itemId', 'name');
//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental request not found');
//     }
//     if (rental.ownerId.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('Not authorized to update this rental.');
//     }
//     if (rental.status !== 'pending') {
//         res.status(400);
//         throw new Error(`This rental is already ${rental.status}.`);
//     }

//     rental.status = status;
//     const updatedRental = await rental.save();

//     // --- Notification Logic ---
//     const io = req.io;
//     const getActiveUserSocketId = req.getActiveUserSocketId;
//     const renterSocketId = getActiveUserSocketId(updatedRental.renterId.toString());
//     if (renterSocketId) {
//         io.to(renterSocketId).emit('getNotification', {
//             type: 'status_update',
//             message: `Your request for "${rental.itemId.name}" has been ${updatedRental.status}.`,
//             rentalId: updatedRental._id,
//         });
//     }

//     res.status(200).json(updatedRental);
// });

// //--------------------------------------------------------------------------//
// // @desc    Get all rentals for the logged-in user (as a renter)
// // @route   GET /api/rentals/myrentals
// // @access  Private
// //--------------------------------------------------------------------------//
// const getMyRentals = asyncHandler(async (req, res) => {
//     const rentals = await Rental.find({ renterId: req.user._id })
//         .populate({ path: 'itemId', select: 'name images price' })
//         .populate({ path: 'ownerId', select: 'name avatar' })
//         .sort({ createdAt: -1 });
//     res.json(rentals);
// });

// //--------------------------------------------------------------------------//
// // @desc    Get incoming rental requests for an owner
// // @route   GET /api/rentals/incoming
// // @access  Private
// //--------------------------------------------------------------------------//
// const getIncomingRequests = asyncHandler(async (req, res) => {
//     const requests = await Rental.find({ ownerId: req.user._id })
//         .populate({ path: 'itemId', select: 'name images' })
//         .populate({ path: 'renterId', select: 'name avatar email' })
//         .sort({ createdAt: -1 });
//     res.json(requests);
// });

// //--------------------------------------------------------------------------//
// // @desc    Generate a PDF rental agreement
// // @route   GET /api/rentals/:id/agreement
// // @access  Private
// //--------------------------------------------------------------------------//
// const generateAgreement = asyncHandler(async (req, res) => {
//     const rental = await Rental.findById(req.params.id)
//         .populate('renterId', 'name')
//         .populate('ownerId', 'name')
//         .populate('itemId', 'name description');

//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental not found');
//     }

//     const doc = new PDFDocument({ margin: 50 });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename=agreement_${rental._id}.pdf`);
//     doc.pipe(res);

//     doc.fontSize(20).font('Helvetica-Bold').text('Rental Agreement', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(12).font('Helvetica').text(`Agreement Date: ${new Date(rental.createdAt).toLocaleDateString()}`);
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Parties:');
//     doc.font('Helvetica').text(`- Owner: ${rental.ownerId.name}`);
//     doc.text(`- Renter: ${rental.renterId.name}`);
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Item:');
//     doc.font('Helvetica').text(`- Name: ${rental.itemId.name}`);
//     doc.text(`- Description: ${rental.itemId.description}`);
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Terms:');
//     doc.font('Helvetica').text(`- Start Date: ${new Date(rental.startDate).toLocaleDateString()}`);
//     doc.text(`- End Date: ${new Date(rental.endDate).toLocaleDateString()}`);
//     doc.text(`- Total Rent Paid: ₹${rental.totalPrice.toLocaleString()}`);
//     doc.moveDown(2);
//     doc.fontSize(10).text('Terms & Conditions:', { underline: true });
//     doc.fontSize(8).list([
//         'Renter agrees to return the item in its original condition.',
//         'Any damage is the responsibility of the renter.',
//         'This is a legally binding digital agreement.'
//     ], { bulletRadius: 1 });
//     doc.moveDown(3);
//     doc.fontSize(10).text('_________________________', { continued: true });
//     doc.text('_________________________', { align: 'right' });
//     doc.text('Owner Signature', { continued: true });
//     doc.text('Renter Signature', { align: 'right' });

//     doc.end();
// });

// //--------------------------------------------------------------------------//
// // @desc    Accept the rental agreement
// // @route   POST /api/rentals/:id/accept-agreement
// // @access  Private
// //--------------------------------------------------------------------------//
// const acceptAgreement = asyncHandler(async (req, res) => {
//     const rental = await Rental.findById(req.params.id);
//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental not found');
//     }

//     if (req.user._id.toString() === rental.ownerId.toString()) {
//         rental.ownerAgreed = true;
//     } else if (req.user._id.toString() === rental.renterId.toString()) {
//         rental.renterAgreed = true;
//     } else {
//         res.status(401);
//         throw new Error('Not authorized to accept this agreement');
//     }

//     const updatedRental = await rental.save();
//     res.json(updatedRental);
// });

// //--------------------------------------------------------------------------//
// // @desc    Mark a rental as complete by owner or renter
// // @route   POST /api/rentals/:id/complete
// // @access  Private
// //--------------------------------------------------------------------------//
// const markRentalComplete = asyncHandler(async (req, res) => {
//     const rental = await Rental.findById(req.params.id).populate('itemId', 'name');
//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental not found');
//     }
//     if (rental.status !== 'paid') {
//         res.status(400);
//         throw new Error(`Rental cannot be marked as complete. Current status: ${rental.status}`);
//     }

//     const isOwner = req.user._id.toString() === rental.ownerId.toString();
//     const isRenter = req.user._id.toString() === rental.renterId.toString();

//     if (isOwner) {
//         rental.ownerMarkedComplete = true;
//     } else if (isRenter) {
//         rental.renterMarkedComplete = true;
//     } else {
//         res.status(401);
//         throw new Error('Not authorized for this action');
//     }

//     if (rental.ownerMarkedComplete && rental.renterMarkedComplete) {
//         rental.status = 'completed';
        
//         // --- Notification Logic ---
//         const io = req.io;
//         const getActiveUserSocketId = req.getActiveUserSocketId;
//         const ownerSocketId = getActiveUserSocketId(rental.ownerId.toString());
//         const renterSocketId = getActiveUserSocketId(rental.renterId.toString());

//         const notification = {
//             type: 'rental_completed',
//             message: `Your rental for "${rental.itemId.name}" is now complete. Please leave a review!`,
//             rentalId: rental._id,
//         };

//         if(ownerSocketId) io.to(ownerSocketId).emit('getNotification', notification);
//         if(renterSocketId) io.to(renterSocketId).emit('getNotification', notification);
//     }

//     const updatedRental = await rental.save();
//     res.json(updatedRental);
// });


// module.exports = {
//     createRental,
//     getMyRentals,
//     updateRentalStatus,
//     getIncomingRequests,
//     generateAgreement,
//     acceptAgreement,
//     markRentalComplete
// };


//change 4

// const asyncHandler = require('express-async-handler');
// const Rental = require('../models/rentalModel');
// const Item = require('../models/itemModel');
// const PDFDocument = require('pdfkit');

// //--------------------------------------------------------------------------//
// // @desc    Create a new rental order
// // @route   POST /api/rentals
// // @access  Private
// //--------------------------------------------------------------------------//
// const createRental = asyncHandler(async (req, res) => {
//     const { itemId, startDate, endDate, totalPrice } = req.body;

//     const item = await Item.findById(itemId);
//     if (!item) {
//         res.status(404);
//         throw new Error('Item not found');
//     }

//     const rental = new Rental({
//         itemId,
//         renterId: req.user._id,
//         ownerId: item.user,
//         startDate,
//         endDate,
//         totalPrice,
//     });

//     const createdRental = await rental.save();

//     // --- Notification Logic ---
//     const io = req.io;
//     const getActiveUserSocketId = req.getActiveUserSocketId;
//     const ownerSocketId = getActiveUserSocketId(item.user.toString());
//     if (ownerSocketId) {
//         io.to(ownerSocketId).emit('getNotification', {
//             type: 'new_request',
//             message: `You have a new rental request for "${item.name}"`,
//             rentalId: createdRental._id,
//         });
//     }

//     res.status(201).json(createdRental);
// });

// //--------------------------------------------------------------------------//
// // @desc    Update rental status (accept/reject)
// // @route   PATCH /api/rentals/:id
// // @access  Private
// //--------------------------------------------------------------------------//
// const updateRentalStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;
//     if (status !== 'accepted' && status !== 'rejected') {
//         res.status(400);
//         throw new Error('Invalid status.');
//     }

//     const rental = await Rental.findById(req.params.id).populate('itemId', 'name');
//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental request not found');
//     }
//     if (rental.ownerId.toString() !== req.user._id.toString()) {
//         res.status(401);
//         throw new Error('Not authorized to update this rental.');
//     }
//     if (rental.status !== 'pending') {
//         res.status(400);
//         throw new Error(`This rental is already ${rental.status}.`);
//     }

//     rental.status = status;
//     const updatedRental = await rental.save();

//     // --- Notification Logic ---
//     const io = req.io;
//     const getActiveUserSocketId = req.getActiveUserSocketId;
//     const renterSocketId = getActiveUserSocketId(updatedRental.renterId.toString());
//     if (renterSocketId) {
//         io.to(renterSocketId).emit('getNotification', {
//             type: 'status_update',
//             message: `Your request for "${rental.itemId.name}" has been ${updatedRental.status}.`,
//             rentalId: updatedRental._id,
//         });
//     }

//     res.status(200).json(updatedRental);
// });

// //--------------------------------------------------------------------------//
// // @desc    Get all rentals for the logged-in user (as a renter)
// // @route   GET /api/rentals/myrentals
// // @access  Private
// //--------------------------------------------------------------------------//
// const getMyRentals = asyncHandler(async (req, res) => {
//     const rentals = await Rental.find({ renterId: req.user._id })
//         .populate({ path: 'itemId', select: 'name images price' })
//         .populate({ path: 'ownerId', select: 'name avatar' })
//         .sort({ createdAt: -1 });
//     res.json(rentals);
// });

// //--------------------------------------------------------------------------//
// // @desc    Get incoming rental requests for an owner
// // @route   GET /api/rentals/incoming
// // @access  Private
// //--------------------------------------------------------------------------//
// const getIncomingRequests = asyncHandler(async (req, res) => {
//     const requests = await Rental.find({ ownerId: req.user._id })
//         .populate({ path: 'itemId', select: 'name images' })
//         .populate({ path: 'renterId', select: 'name avatar email' })
//         .sort({ createdAt: -1 });
//     res.json(requests);
// });

// //--------------------------------------------------------------------------//
// // @desc    Generate a PDF rental agreement
// // @route   GET /api/rentals/:id/agreement
// // @access  Private
// //--------------------------------------------------------------------------//
// const generateAgreement = asyncHandler(async (req, res) => {
//     const rental = await Rental.findById(req.params.id)
//         .populate('renterId', 'name')
//         .populate('ownerId', 'name')
//         .populate('itemId', 'name description');

//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental not found');
//     }

//     const doc = new PDFDocument({ margin: 50 });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename=agreement_${rental._id}.pdf`);
//     doc.pipe(res);

//     doc.fontSize(20).font('Helvetica-Bold').text('Rental Agreement', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(12).font('Helvetica').text(`Agreement Date: ${new Date(rental.createdAt).toLocaleDateString()}`);
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Parties:');
//     doc.font('Helvetica').text(`- Owner: ${rental.ownerId.name}`);
//     doc.text(`- Renter: ${rental.renterId.name}`);
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Item:');
//     doc.font('Helvetica').text(`- Name: ${rental.itemId.name}`);
//     doc.text(`- Description: ${rental.itemId.description}`);
//     doc.moveDown();
//     doc.font('Helvetica-Bold').text('Terms:');
//     doc.font('Helvetica').text(`- Start Date: ${new Date(rental.startDate).toLocaleDateString()}`);
//     doc.text(`- End Date: ${new Date(rental.endDate).toLocaleDateString()}`);
//     doc.text(`- Total Rent Paid: ₹${rental.totalPrice.toLocaleString()}`);
//     doc.moveDown(2);
//     doc.fontSize(10).text('Terms & Conditions:', { underline: true });
//     doc.fontSize(8).list([
//         'Renter agrees to return the item in its original condition.',
//         'Any damage is the responsibility of the renter.',
//         'This is a legally binding digital agreement.'
//     ], { bulletRadius: 1 });
//     doc.moveDown(3);
//     doc.fontSize(10).text('_________________________', { continued: true });
//     doc.text('_________________________', { align: 'right' });
//     doc.text('Owner Signature', { continued: true });
//     doc.text('Renter Signature', { align: 'right' });

//     doc.end();
// });

// //--------------------------------------------------------------------------//
// // @desc    Accept the rental agreement
// // @route   POST /api/rentals/:id/accept-agreement
// // @access  Private
// //--------------------------------------------------------------------------//
// const acceptAgreement = asyncHandler(async (req, res) => {
//     const rental = await Rental.findById(req.params.id);
//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental not found');
//     }

//     if (req.user._id.toString() === rental.ownerId.toString()) {
//         rental.ownerAgreed = true;
//     } else if (req.user._id.toString() === rental.renterId.toString()) {
//         rental.renterAgreed = true;
//     } else {
//         res.status(401);
//         throw new Error('Not authorized to accept this agreement');
//     }

//     const updatedRental = await rental.save();
//     res.json(updatedRental);
// });

// //--------------------------------------------------------------------------//
// // @desc    Mark a rental as complete by owner or renter
// // @route   POST /api/rentals/:id/complete
// // @access  Private
// //--------------------------------------------------------------------------//
// const markRentalComplete = asyncHandler(async (req, res) => {
//     const rental = await Rental.findById(req.params.id).populate('itemId', 'name');
//     if (!rental) {
//         res.status(404);
//         throw new Error('Rental not found');
//     }
//     if (rental.status !== 'paid') {
//         res.status(400);
//         throw new Error(`Rental cannot be marked as complete. Current status: ${rental.status}`);
//     }

//     const isOwner = req.user._id.toString() === rental.ownerId.toString();
//     const isRenter = req.user._id.toString() === rental.renterId.toString();

//     if (isOwner) {
//         rental.ownerMarkedComplete = true;
//     } else if (isRenter) {
//         rental.renterMarkedComplete = true;
//     } else {
//         res.status(401);
//         throw new Error('Not authorized for this action');
//     }

//     if (rental.ownerMarkedComplete && rental.renterMarkedComplete) {
//         rental.status = 'completed';
        
//         // --- Notification Logic ---
//         const io = req.io;
//         const getActiveUserSocketId = req.getActiveUserSocketId;
//         const ownerSocketId = getActiveUserSocketId(rental.ownerId.toString());
//         const renterSocketId = getActiveUserSocketId(rental.renterId.toString());

//         const notification = {
//             type: 'rental_completed',
//             message: `Your rental for "${rental.itemId.name}" is now complete. Please leave a review!`,
//             rentalId: rental._id,
//         };

//         if(ownerSocketId) io.to(ownerSocketId).emit('getNotification', notification);
//         if(renterSocketId) io.to(renterSocketId).emit('getNotification', notification);
//     }

//     const updatedRental = await rental.save();
//     res.json(updatedRental);
// });


// module.exports = {
//     createRental,
//     getMyRentals,
//     updateRentalStatus,
//     getIncomingRequests,
//     generateAgreement,
//     acceptAgreement,
//     markRentalComplete
// };

//final chnage

const asyncHandler = require('express-async-handler');
const Rental = require('../models/rentalModel');
const Item = require('../models/itemModel');
const PDFDocument = require('pdfkit');
const sendEmail = require('../utils/sendEmail'); // 👈 Email utility import

//--------------------------------------------------------------------------//
// @desc    Create a new rental order & send email to owner
// @route   POST /api/rentals
// @access  Private
//--------------------------------------------------------------------------//
const createRental = asyncHandler(async (req, res) => {
    const { itemId, startDate, endDate, totalPrice } = req.body;

    // Owner ka email paane ke liye .populate() ka istemaal karein
    const item = await Item.findById(itemId).populate('user', 'name email');
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    const rental = new Rental({
        itemId,
        renterId: req.user._id,
        ownerId: item.user._id, // item.user._id ka istemaal karein
        startDate,
        endDate,
        totalPrice,
    });

    const createdRental = await rental.save();

    // --- Real-time Notification Logic ---
    const io = req.io;
    const getActiveUserSocketId = req.getActiveUserSocketId;
    const ownerSocketId = getActiveUserSocketId(item.user._id.toString());
    if (ownerSocketId) {
        io.to(ownerSocketId).emit('getNotification', {
            type: 'new_request',
            message: `You have a new rental request for "${item.name}"`,
            rentalId: createdRental._id,
        });
    }
    
    // --- Email Sending Logic ---
    try {
        const renterName = req.user.name;
        const ownerEmail = item.user.email;
        const ownerName = item.user.name;

        const emailHtml = `
            <h3>Hi ${ownerName},</h3>
            <p>You have received a new rental request for your item, <strong>${item.name}</strong>.</p>
            <p><strong>Renter:</strong> ${renterName}</p>
            <p><strong>Rental Period:</strong> ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}</p>
            <p>Please log in to your RentSmart account to accept or reject this request.</p>
            <br>
            <p>Thanks,</p>
            <p>The RentSmart Team</p>
        `;

        await sendEmail({
            to: ownerEmail,
            subject: `New Rental Request for: ${item.name}`,
            html: emailHtml
        });

        console.log('Rental request email sent successfully to:', ownerEmail);

    } catch (error) {
        console.error('Error sending rental request email:', error);
        // Email fail hone par bhi response jaana chahiye
    }

    res.status(201).json(createdRental);
});

//--------------------------------------------------------------------------//
// @desc    Update rental status (accept/reject)
// @route   PATCH /api/rentals/:id
// @access  Private
//--------------------------------------------------------------------------//
const updateRentalStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (status !== 'accepted' && status !== 'rejected') {
        res.status(400);
        throw new Error('Invalid status.');
    }

    const rental = await Rental.findById(req.params.id).populate('itemId', 'name');
    if (!rental) {
        res.status(404);
        throw new Error('Rental request not found');
    }
    if (rental.ownerId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this rental.');
    }
    if (rental.status !== 'pending') {
        res.status(400);
        throw new Error(`This rental is already ${rental.status}.`);
    }

    rental.status = status;
    const updatedRental = await rental.save();

    // --- Notification Logic ---
    const io = req.io;
    const getActiveUserSocketId = req.getActiveUserSocketId;
    const renterSocketId = getActiveUserSocketId(updatedRental.renterId.toString());
    if (renterSocketId) {
        io.to(renterSocketId).emit('getNotification', {
            type: 'status_update',
            message: `Your request for "${rental.itemId.name}" has been ${updatedRental.status}.`,
            rentalId: updatedRental._id,
        });
    }

    res.status(200).json(updatedRental);
});

//--------------------------------------------------------------------------//
// @desc    Get all rentals for the logged-in user (as a renter)
// @route   GET /api/rentals/myrentals
// @access  Private
//--------------------------------------------------------------------------//
const getMyRentals = asyncHandler(async (req, res) => {
    const rentals = await Rental.find({ renterId: req.user._id })
        .populate({ path: 'itemId', select: 'name images price' })
        .populate({ path: 'ownerId', select: 'name avatar' })
        .sort({ createdAt: -1 });
    res.json(rentals);
});

//--------------------------------------------------------------------------//
// @desc    Get incoming rental requests for an owner
// @route   GET /api/rentals/incoming
// @access  Private
//--------------------------------------------------------------------------//
const getIncomingRequests = asyncHandler(async (req, res) => {
    const requests = await Rental.find({ ownerId: req.user._id })
        .populate({ path: 'itemId', select: 'name images' })
        .populate({ path: 'renterId', select: 'name avatar email' })
        .sort({ createdAt: -1 });
    res.json(requests);
});

//--------------------------------------------------------------------------//
// @desc    Generate a PDF rental agreement
// @route   GET /api/rentals/:id/agreement
// @access  Private
//--------------------------------------------------------------------------//
const generateAgreement = asyncHandler(async (req, res) => {
    const rental = await Rental.findById(req.params.id)
        .populate('renterId', 'name')
        .populate('ownerId', 'name')
        .populate('itemId', 'name description');

    if (!rental) {
        res.status(404);
        throw new Error('Rental not found');
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=agreement_${rental._id}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).font('Helvetica-Bold').text('Rental Agreement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica').text(`Agreement Date: ${new Date(rental.createdAt).toLocaleDateString()}`);
    doc.moveDown();
    doc.font('Helvetica-Bold').text('Parties:');
    doc.font('Helvetica').text(`- Owner: ${rental.ownerId.name}`);
    doc.text(`- Renter: ${rental.renterId.name}`);
    doc.moveDown();
    doc.font('Helvetica-Bold').text('Item:');
    doc.font('Helvetica').text(`- Name: ${rental.itemId.name}`);
    doc.text(`- Description: ${rental.itemId.description}`);
    doc.moveDown();
    doc.font('Helvetica-Bold').text('Terms:');
    doc.font('Helvetica').text(`- Start Date: ${new Date(rental.startDate).toLocaleDateString()}`);
    doc.text(`- End Date: ${new Date(rental.endDate).toLocaleDateString()}`);
    doc.text(`- Total Rent Paid: ₹${rental.totalPrice.toLocaleString()}`);
    doc.moveDown(2);
    doc.fontSize(10).text('Terms & Conditions:', { underline: true });
    doc.fontSize(8).list([
        'Renter agrees to return the item in its original condition.',
        'Any damage is the responsibility of the renter.',
        'This is a legally binding digital agreement.'
    ], { bulletRadius: 1 });
    doc.moveDown(3);
    doc.fontSize(10).text('_________________________', { continued: true });
    doc.text('_________________________', { align: 'right' });
    doc.text('Owner Signature', { continued: true });
    doc.text('Renter Signature', { align: 'right' });

    doc.end();
});

//--------------------------------------------------------------------------//
// @desc    Accept the rental agreement
// @route   POST /api/rentals/:id/accept-agreement
// @access  Private
//--------------------------------------------------------------------------//
const acceptAgreement = asyncHandler(async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
        res.status(404);
        throw new Error('Rental not found');
    }

    if (req.user._id.toString() === rental.ownerId.toString()) {
        rental.ownerAgreed = true;
    } else if (req.user._id.toString() === rental.renterId.toString()) {
        rental.renterAgreed = true;
    } else {
        res.status(401);
        throw new Error('Not authorized to accept this agreement');
    }

    const updatedRental = await rental.save();
    res.json(updatedRental);
});

//--------------------------------------------------------------------------//
// @desc    Mark a rental as complete by owner or renter
// @route   POST /api/rentals/:id/complete
// @access  Private
//--------------------------------------------------------------------------//
const markRentalComplete = asyncHandler(async (req, res) => {
    const rental = await Rental.findById(req.params.id).populate('itemId', 'name');
    if (!rental) {
        res.status(404);
        throw new Error('Rental not found');
    }
    if (rental.status !== 'paid') {
        res.status(400);
        throw new Error(`Rental cannot be marked as complete. Current status: ${rental.status}`);
    }

    const isOwner = req.user._id.toString() === rental.ownerId.toString();
    const isRenter = req.user._id.toString() === rental.renterId.toString();

    if (isOwner) {
        rental.ownerMarkedComplete = true;
    } else if (isRenter) {
        rental.renterMarkedComplete = true;
    } else {
        res.status(401);
        throw new Error('Not authorized for this action');
    }

    if (rental.ownerMarkedComplete && rental.renterMarkedComplete) {
        rental.status = 'completed';
        
        const io = req.io;
        const getActiveUserSocketId = req.getActiveUserSocketId;
        const ownerSocketId = getActiveUserSocketId(rental.ownerId.toString());
        const renterSocketId = getActiveUserSocketId(rental.renterId.toString());

        const notification = {
            type: 'rental_completed',
            message: `Your rental for "${rental.itemId.name}" is now complete. Please leave a review!`,
            rentalId: rental._id,
        };

        if(ownerSocketId) io.to(ownerSocketId).emit('getNotification', notification);
        if(renterSocketId) io.to(renterSocketId).emit('getNotification', notification);
    }

    const updatedRental = await rental.save();
    res.json(updatedRental);
});


module.exports = {
    createRental,
    getMyRentals,
    updateRentalStatus,
    getIncomingRequests,
    generateAgreement,
    acceptAgreement,
    markRentalComplete
};