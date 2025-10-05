import express from 'express';
const orderRouter = express.Router();
import orderController from '../controllers/orderController.js';
import { isAuth, isAdmin } from '../middleWare/authMiddleware.js';



orderRouter.post('/createorder', isAuth, orderController.createOrder);
orderRouter.get('/getallorders', isAuth, orderController.getAllOrders);
orderRouter.delete('/deleteorder/:id', isAuth, isAdmin, orderController.deleteOrder);
orderRouter.put('/updateorder/:id', isAuth, isAdmin, orderController.updateOrder);
orderRouter.put('/updateisrated/:id', isAuth, orderController.updateIsRated);



export default orderRouter;
