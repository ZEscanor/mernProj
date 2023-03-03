import express from 'express';

import {editUser, getUser,getUsers,signin,signup } from '../controllers/user.js'; 
import auth from '../middleware/authMiddleware.js';


const router = express.Router();


router.get('/', getUsers)
router.get('/:id', getUser)
router.patch('/:id',auth,editUser)
router.post('/signin',signin)
router.post('/signup',signup)

export default router;


//create .use for the route
// ctrate controller
// create model with schema