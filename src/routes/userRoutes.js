import express from 'express';
const userRouter = express.Router();
import userController from '../controllers/userController.js';
import isAuth from '../middleWare/authMiddleware.js';
import { upload } from '../middleWare/multer.js';



userRouter.post('/createuser', userController.registerUser);
userRouter.post('/loginuser', userController.loginUser);
userRouter.get('/logoutuser/:id', isAuth, userController.logoutUser);
userRouter.get('/getalluser', isAuth, userController.getAllUsers);
userRouter.get('/getsingleuser/:id', isAuth, userController.getSingleUser);
userRouter.delete('/deleteuser/:id', isAuth, userController.deleteUser);
userRouter.put('/updateuser/:id', isAuth, userController.updateUser);
userRouter.put('/updatepassword/:id', isAuth, userController.updatePassword);
userRouter.put('/updateprofilepicture/:id', isAuth, upload.single("image"), userController.updateProfilePicture);

export default userRouter;