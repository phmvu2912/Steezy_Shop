import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer'

import connectDB from './connect.js';
import router from './routes/index.js';

const app = express();

//Middlewares
dotenv.config();
app.use(cors());

// bodyParser
app.use(bodyParser.json());
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
// // multipart/form-data
// app.use(multer());

// PORT
const port = process.env.PORT || 8000;

// URI
const uri = process.env.MONGO_URI || null;
connectDB(uri)

// ROUTING
router(app);


app.listen(port, () => {
    console.log(`Server đang được chạy trên cổng ${port}`);
})