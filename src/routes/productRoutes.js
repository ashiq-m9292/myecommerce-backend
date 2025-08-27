import express from 'express';
const productRouter = express.Router();
import productControll from '../controllers/productController.js';
import { upload } from '../middleWare/multer.js';
import isAuth from '../middleWare/authMiddleware.js';


productRouter.post('/createproduct', upload.array("images"), productControll.createProduct);
productRouter.get('/getsingleproduct/:id', isAuth, productControll.getSingleProduct);
productRouter.get('/getallproducts', productControll.getAllProducts);
productRouter.delete('/deleteproduct/:id', productControll.deleteProduct);
productRouter.put('/updateproduct/:id', upload.array("images"), productControll.updateProduct);

export default productRouter;