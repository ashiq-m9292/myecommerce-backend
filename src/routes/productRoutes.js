import express from 'express';
const productRouter = express.Router();
import productControll from '../controllers/productController.js';
import { upload } from '../middleWare/multer.js';
import { isAuth, isAdmin } from '../middleWare/authMiddleware.js';


productRouter.post('/createproduct', isAuth, isAdmin, upload.array("images"), productControll.createProduct);
productRouter.get('/getsingleproduct/:id', isAuth, isAdmin, productControll.getSingleProduct);
productRouter.get('/getallproducts', productControll.getAllProducts);
productRouter.delete('/deleteproduct/:id', isAuth, isAdmin, productControll.deleteProduct);
productRouter.put('/updateproduct/:id', isAuth, isAdmin, upload.array("images"), productControll.updateProduct);

// extra apis 
productRouter.get('/topproducts', productControll.topProducts);
productRouter.get('/vageproducts', productControll.vageProducts);
productRouter.get('/nonvageproducts', productControll.nonVageProducts);
productRouter.get('/searchproducts', productControll.searchProducts);

export default productRouter;