import express from "express"
const carRouter = express.Router();
import cartController from "../controllers/cartController.js";
import isAuth from "../middleWare/authMiddleware.js";


carRouter.post('/addtocart', isAuth, cartController.createCart);
carRouter.get('/getallcart', isAuth, cartController.getAllCart);
carRouter.delete('/deletecart/:id', isAuth, cartController.deleteCart);
carRouter.put('/updatecartquantity/:id', isAuth, cartController.updateQuantity);

export default carRouter;