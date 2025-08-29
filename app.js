// dotenv setup 
import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
const app = express();


import userRouter from './src/routes/userRoutes.js';
import productRouter from './src/routes/productRoutes.js';
import addressRouter from './src/routes/addressRoutes.js';
import orderRouter from './src/routes/orderRoutes.js';

// database connection 
import connectDB from './src/db/connectdb.js';
const databaseConnection = process.env.DB_URL
connectDB(databaseConnection);

// cookie setup 
import cookieParser from 'cookie-parser';
app.use(cookieParser({
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
}));

// bodyParser
import bodyParser from 'body-parser';
app.use(bodyParser.json());

// cors setup 
import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// morgan setup 
import morgan from 'morgan';
app.use(morgan('dev'));



// cloudinary setup 
import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// router routes setup
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/address', addressRouter);
app.use('/api/v1/order', orderRouter);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});