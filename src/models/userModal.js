import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// userSchema functionality
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fcmToken: {
        type: String,
    },
    profilePicture: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    readableDate: {
        type: String,
        default: new Date().toLocaleString()
    },
}, { timestamps: true });


// hash password functionality
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// comparePasswrod function 
userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};


// jwt token function 
userSchema.methods.jwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, { expiresIn: 1 * 30 * 24 * 60 * 60 });
};


const userModel = mongoose.model('User', userSchema);
export default userModel;