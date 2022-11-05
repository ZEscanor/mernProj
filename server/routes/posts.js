import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js'; 

const router = express.Router();

router.get('/',getPosts);
router.post('/',createPost);


// get request method the has a request and sends a response

//localhost:5000/posts


export default router;