import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    street: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
}, { timeseries: true });

const address = mongoose.model("Address", addressSchema);

export default address;
