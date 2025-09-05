import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['cod', 'online'],
        default: 'cod'
    },
    orderStatus: {
        type: String,
        enum: ['shipped', 'delivered', 'cancelled'],
        default: 'shipped'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timeseries: true });


const orderModal = mongoose.model("Order", orderSchema);

export default orderModal;