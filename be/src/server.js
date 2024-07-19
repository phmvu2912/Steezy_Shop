import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connect.js';

const app = express();

//Config dotenv
dotenv.config();

// PORT
const port = process.env.PORT;

// URI
const uri = process.env.MONGO_URI;
connectDB(uri)

// ROUTING

app.listen(port, () => {
    console.log(`Server đang được chạy trên cổng ${port}`);
})