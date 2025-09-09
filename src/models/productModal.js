import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    readableDate: {
        type: String,
        default: new Date().toLocaleString()
    },
    sold: {
        type: Number,
        default: 0
    }
}, { timeseries: true });

const productModel = mongoose.model('Product', productSchema);

export default productModel;