import userModel from "../models/userModal.js";
import cloudinary from "cloudinary";

class userController {

    // registerUser function 
    static registerUser = async (req, res) => {
        try {
            const { name, email, password, readableDate } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Please fill all the fields" });
            }
            // check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            };

            //    user created successfully    
            const newUser = new userModel({
                name: name,
                email: email,
                password: password,
                readableDate: readableDate
            });
            await newUser.save();
            res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Error registering user", error: error.message });
        }
    };

    // loginUser function
    static loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Please fill all the fields" });
            }
            // check if user exists
            const existingUser = await userModel.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ message: "User does not exist" });
            };

            // password compare function
            const isMatch = await existingUser.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            };

            // jwt token function
            const token = await existingUser.jwtToken();
            res.cookie("token", token, {
                httpOnly: true,
                secure: 'true',
                sameSite: 'strict',
                maxAge: 10 * 60 * 1000 // 10 minutes
            }).status(200).json({ message: "User login successfully", _id: existingUser._id, name: existingUser.name, email: existingUser.email, token });
        } catch (error) {
            res.status(500).json({ message: "Error logging in user", error: error.message });
        }
    };


    // logout User function
    static logoutUser = async (req, res) => {
        try {
            if (!req.cookies.token) {
                return res.status(400).json({ message: "No user is logged in" });
            };
            res.cookie("token", "", {
                expires: new Date(0),
            }).status(200).json({ message: "User logout successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error logging out user", error: error.message });
        }
    };


    // getAll users function
    static getAllUsers = async (req, res) => {
        try {
            const getAll = await userModel.find().select("-password");

            // check if any users found
            if (!getAll || getAll.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            res.status(200).json({ message: "Users retrieved successfully", users: getAll });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users", error: error.message });
        }
    };

    // getSingleUser 
    static getSingleUser = async (req, res) => {
        try {
            const getSingle = await userModel.findById(req.params.id);

            // check if any users found
            if (!getSingle) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "Users retrieved successfully", users: getSingle });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users", error: error.message });
        }
    }

    // updateUser function
    static updateUser = async (req, res) => {
        try {
            const { name, email } = req.body;
            const updateUser = await userModel.findByIdAndUpdate(req.params.id);
            if (!updateUser) {
                return res.status(404).json({ message: "User not found" });
            };
            if (name) updateUser.name = name;
            if (email) updateUser.email = email;
            await updateUser.save();
            res.status(200).json({ message: "User updated successfully", user: updateUser });

        } catch (error) {
            res.status(500).json({ message: "Error updating user", error: error.message });
        }
    };

    // deleteUser function
    static deleteUser = async (req, res) => {
        try {
            const deleteUser = await userModel.findByIdAndDelete(req.params.id);
            if (!deleteUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.cookie("token", "", {
                expires: new Date(0),
            }).status(200).json({ message: "Users deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error: error.message });
        }
    };

    // update password function
    static updatePassword = async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) {
                return res.json({
                    massage: "please fill all field"
                })
            }
            const user = await userModel.findByIdAndUpdate(req.user.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            };
            const isMatch = await user.comparePassword(oldPassword)
            if (!isMatch) {
                return res.json({
                    massage: 'invalid old password'
                })
            }
            user.password = newPassword
            await user.save();
            res.json({
                massage: 'successfully updated',
                user
            })
        } catch (error) {
            res.status(500).json({ message: "Error updating password", error: error.message });
        }
    };

    // update profile picture 
    static updateProfilePicture = async (req, res) => {
        try {
            // check if user exists
            const user = await userModel.findByIdAndUpdate(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            };
            // check if file is present
            if (!req.file) {
                return res.status(400).json({ message: "Please select a profile picture" });
            }

            // already exist profilePicture
            if (user.profilePicture.public_id) {
                await cloudinary.v2.uploader.destroy(user.profilePicture.public_id);
            }

            // upload image to cloudinary
            const fileBase64 = req.file.buffer.toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${fileBase64}`;
            const cdb = await cloudinary.v2.uploader.upload(dataURI, {
                folder: "profilePicture",
            });
            // update user profile picture
            user.profilePicture = {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }
            await user.save();
            res.status(200).json({ message: "Profile picture updated successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Error updating profile picture", error: error.message });
        }

    }


}
export default userController;

