const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Rental = require('../models/rentalModel');

// @desc    Create a Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { rentalId } = req.body;

    const rental = await Rental.findById(rentalId);

    if (!rental || rental.renterId.toString() !== req.user._id.toString()) {
        res.status(404);
        throw new Error('Rental not found or not authorized');
    }

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: rental.totalPrice * 100, // Amount in paisa
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(200).json({ data: order });
    });
});


// @desc    Verify payment and update rental status
// @route   POST /api/payments/verify-payment
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, rentalId } = req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        // Payment is successful, update rental
        const rental = await Rental.findById(rentalId);
        if(rental) {
            rental.paymentId = razorpay_payment_id;
            rental.orderId = razorpay_order_id;
            rental.paymentStatus = 'success';
            rental.status = 'paid'; // Rental status is now paid
            await rental.save();

            // TODO: Yahaan owner ko notification bhej sakte hain
            
            return res.status(200).json({ message: "Payment verified successfully" });
        }
    } else {
        return res.status(400).json({ message: "Invalid signature sent!" });
    }
});


module.exports = { createOrder, verifyPayment };