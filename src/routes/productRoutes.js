import express from 'express';
const productRouter = express.Router();
import productControll from '../controllers/productController.js';
import { upload } from '../middleWare/multer.js';
import isAuth from '../middleWare/authMiddleware.js';


productRouter.post('/productregister', isAuth, upload.array("images"), productControll.createProduct);
productRouter.get('/getsingleproduct/:id', isAuth, productControll.getSingleProduct);
productRouter.get('/getallproducts', isAuth, productControll.getAllProducts);
productRouter.delete('/deleteproduct/:id', isAuth, productControll.deleteProduct);
productRouter.put('/updateproduct/:id', isAuth, upload.array("images"), productControll.updateProduct);

export default productRouter;