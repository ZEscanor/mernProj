import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'; 

const router = express.Router();

router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id', updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost', likePost);


// get request method the has a request and sends a response

//localhost:5000/posts


export default router;