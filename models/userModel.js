const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// [FIX] Naya package import kiya
const AutoIncrement = require('mongoose-sequence')(mongoose);

// User model schema
const userSchema = mongoose.Schema(
    {
        // --- Sabse pehle, hamari nayi unique ID ---
        user_id: {
            type: Number,
            unique: true
        },

        // --- Basic User Info ---
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        token: { type: String, default: null },

        // --- RATING FIELDS ---
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },

        // --- User Profile Details ---
        avatar: {
            public_id: { type: String, default: null },
            url: { type: String, default: '' },
        },
        bio: { 
            type: String, 
            default: 'No bio yet.' 
        },

        // --- Address ---
        address: {
            street: { type: String, default: '' },
            city: { type: String, required: true, default: '' },
            state: { type: String, default: '' },
            zipCode: { type: String, default: '' },
        },

        // --- Verification System ---
        verification: {
            status: {
                type: String,
                enum: ['unverified', 'pending', 'verified', 'rejected'],
                default: 'unverified',
            },
            aadhaarImage: { type: String },
            selfieImage: { type: String },
            collegeIdImage: { type: String },
            rejectionReason: { type: String },
        },
        isPhoneVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// [FIX] Auto-increment plugin ko schema se joda
// Yeh 'user_id' field ko 10001 se shuru karega aur har naye user ke liye 1 badhata jayega.
userSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 10001 });


// Password hashing before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
