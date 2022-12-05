import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express(); // initialize our app backend
dotenv.config();




app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use('/posts', postRoutes); // every route will start with posts
app.use('/user',userRoutes)
  
const PORT = process.env.PORT || 5000; // will deploy to our env port or a local 5000 port



mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology: true}) 
.then(()=> app.listen(PORT,()=> console.log(`Server running on PORT: ${PORT}`))) 
.catch((error)=> console.log(error.message));


