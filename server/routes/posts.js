import express from 'express';
import { getPosts, getPost, getPostsBySearch ,createPost, updatePost, deletePost, likePost, commentPost, deleteComment} from '../controllers/posts.js'; 
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/',getPosts);
router.get('/search',getPostsBySearch);

router.get('/:id', getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth,  updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/:id/commentPost',auth, commentPost);
router.patch("/:id/deleteComment", auth, deleteComment);





// get request method the has a request and sends a response

//localhost:5000/posts


export default router;