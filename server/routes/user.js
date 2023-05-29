import express from 'express';

import {editUser, getUser,getUsers,signin,signup, sendMessage, getMessages, deleteMessage } from '../controllers/user.js'; 
import auth from '../middleware/authMiddleware.js';


const router = express.Router();


router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/messages',getMessages)
router.patch('/:id',auth,editUser)

router.post('/signin',signin)
router.post('/signup',signup)

router.post('/:id',sendMessage)
router.patch('/:id/deleteMessage',deleteMessage)




export default router;


//create .use for the route
// ctrate controller
// create model with schema