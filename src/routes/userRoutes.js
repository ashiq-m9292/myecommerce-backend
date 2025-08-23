import express from 'express';
const userRouter = express.Router();
import userController from '../controllers/userController.js';
import isAuth from '../middleWare/authMiddleware.js';
import { upload } from '../middleWare/multer.js';


userRouter.post('/createuser', userController.registerUser);
userRouter.post('/loginuser', userController.loginUser);
userRouter.post('/logoutuser', isAuth, userController.logoutUser);
userRouter.get('/guetalluser', isAuth, userController.getAllUsers);
userRouter.get('/getsingleuser/:id', isAuth, userController.getSingleUser);
userRouter.delete('/deleteuser', isAuth, userController.deleteUser);
userRouter.get('/getuserprofile', isAuth, userController.getUserProfile);
userRouter.put('/updateuserprofile', isAuth, userController.updateUser);
userRouter.put('/updateuserpassword', isAuth, userController.updatePassword);
userRouter.put('/updateuserprofilepicture', isAuth, upload.single("image"), userController.updateProfilePicture);

export default userRouter;