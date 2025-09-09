import express from 'express';
const productRouter = express.Router();
import productControll from '../controllers/productController.js';
import { upload } from '../middleWare/multer.js';
import isAuth from '../middleWare/authMiddleware.js';


productRouter.post('/createproduct', isAuth, upload.array("images"), productControll.createProduct);
productRouter.get('/getsingleproduct/:id', isAuth, productControll.getSingleProduct);
productRouter.get('/getallproducts', productControll.getAllProducts);
productRouter.delete('/deleteproduct/:id', isAuth, productControll.deleteProduct);
productRouter.put('/updateproduct/:id', isAuth, upload.array("images"), productControll.updateProduct);
productRouter.get('/topproducts', productControll.topProducts);
productRouter.get('/vageproducts', productControll.vageProducts);
productRouter.get('/nonvageproducts', productControll.nonVageProducts);
productRouter.get('/searchproducts', productControll.searchProducts);

export default productRouter;