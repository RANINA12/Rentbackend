const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
      required: [true, "Rental must belong to an item."],
    },
    renterId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Rental must have a renter."],
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Rental must have an owner."],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide a start date."],
    },
    endDate: {
      type: Date,
      required: [true, "Please provide an end date."],
    },
    totalPrice: {
      type: Number,
      required: [true, "Rental must have a price."],
    },
    status: {
      type: String,
      // --- NAYA BADLAAV: 'paid' status joda gaya hai ---
      enum: [
        "pending",
        "accepted",
        "paid",
        "rejected",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    ownerAgreed: {
      type: Boolean,
      default: false,
    },
    renterAgreed: {
      type: Boolean,
      default: false,
    },
    // --- NAYE PAYMENT FIELDS ---
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

        ownerMarkedComplete: {
            type: Boolean,
            default: false,
        },
        renterMarkedComplete: {
            type: Boolean,
            default: false,
        },
  },
  {
    timestamps: true, // CreatedAt aur UpdatedAt fields automatically add ho jaayengi
  }
);

module.exports = mongoose.model("Rental", rentalSchema);
