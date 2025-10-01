import jwt from "jsonwebtoken";
import userModel from "../models/userModal.js";

export const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Token N/A" });
    };
    try {
        const decodeData = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = await userModel.findById(decodeData._id)
        next();
    } catch (error) {
        console.log("error in isAuth middleware", error);
    }
};

//    only admin permission isAuth middleware
export const isAdmin = async (req, res, next) => {
    if(!req.user){
        return res.status(401).json({ message: "User N/A" });
    }
    if(req.user.role !== "admin"){
        return res.status(401).json({ message: "You are not an admin" });
    };
    next();
};
