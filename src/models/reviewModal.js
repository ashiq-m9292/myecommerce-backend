import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const reviewModal = mongoose.model('Review', reviewSchema);
export default reviewModal;