import express from "express";
const reviewRouter = express.Router();
import reviewController from "../controllers/ReviewController.js";
import { isAuth, isAdmin } from '../middleWare/authMiddleware.js';

reviewRouter.post('/createreview', isAuth, reviewController.createReview);
reviewRouter.delete('/deletereview/:id', isAuth, isAdmin, reviewController.deleteReview);
reviewRouter.get('/getallreviews', isAuth, reviewController.getAllReview);



export default reviewRouter;