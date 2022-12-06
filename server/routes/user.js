import express from 'express';

import {signin,signup } from '../controllers/user.js'; 


const router = express.Router();

router.post('/signin',signin)
router.post('/signup',signup)

export default router;


//create .use for the route
// ctrate controller
// create model with schema