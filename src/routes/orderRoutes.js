import express from 'express';
const orderRouter = express.Router();
import orderController from '../controllers/orderController.js';
import isAuth from '../middleWare/authMiddleware.js';



orderRouter.post('/createorder', isAuth, orderController.createOrder);
orderRouter.get('/getallorders', isAuth, orderController.getAllOrders);




export default orderRouter;
