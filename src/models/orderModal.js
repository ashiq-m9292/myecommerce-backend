import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shippingAddress: {
        street: String,
        village: String,
        city: String,
        zipCode: String,
        phone: String
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: String,
            price: Number,
            quantity: Number,
            image: String
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
    isRated: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timeseries: true });


const orderModal = mongoose.model("Order", orderSchema);

export default orderModal;