import express from 'express';
const userRouter = express.Router();
import userController from '../controllers/userController.js';
import { isAuth, isAdmin } from '../middleWare/authMiddleware.js';
import { upload } from '../middleWare/multer.js';

//  user create logout or login 
userRouter.post('/createuser', userController.registerUser);
userRouter.post('/loginuser', userController.loginUser);
userRouter.post('/logoutuser', isAuth, userController.logoutUser);

//  get user and users 
userRouter.get('/getalluser',isAuth, isAdmin, userController.getAllUsers);
userRouter.get('/getsingleuser/:id', isAuth, isAdmin, userController.getSingleUser);

// user delete 
userRouter.delete('/deleteuser', isAuth, isAdmin, userController.deleteUser);

// get profile 
userRouter.get('/getuserprofile', isAuth, userController.getUserProfile);

// user update password profile or picture 
userRouter.put('/updateuserprofile', isAuth, userController.updateUser);
userRouter.put('/updateuserpassword', isAuth, userController.updatePassword);
userRouter.post('/updateuserprofilepicture', isAuth, upload.single("image"), userController.updateProfilePicture);

export default userRouter;