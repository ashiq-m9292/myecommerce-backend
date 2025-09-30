import express from 'express';
const wishListRouter = express.Router();
import wishController from '../controllers/wishListController.js';
import isAuth from '../middleWare/authMiddleware.js';

wishListRouter.post('/addtowishlist', isAuth, wishController.createWishList);
wishListRouter.delete('/deletewishlist/:id', isAuth, wishController.deleteWishList);
wishListRouter.get('/getallwishlist', isAuth, wishController.getWishList);


export default wishListRouter;