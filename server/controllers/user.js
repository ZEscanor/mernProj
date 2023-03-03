import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

import User from "../models/userModel.js";




export const getUsers = async (req, res) => {
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    }
    catch(error){
        res.status(500).json({message:"No users"})
     }

     

}  // can modify this to be find all user with {NAME FROM REQ.BODY}

export const getUser = async (req, res) => {
    const {id} = req.params
    try{
        let thisUser = await User.find({_id: id}) // or name or id etc.
        //await User.findById(id) 
        
        res.status(200).json(thisUser)
    }
    catch(error){
        res.status(404).json({message:"user NOT FOUND"})
    }
}

export const editUser = async (req,res) => {
    const {id} =req.params
    const user = req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with the current Id");

    const updatedUser =  await User.findByIdAndUpdate(id, user, {new:true}); // new returns the user after the user is updated in db

    res.json(updatedUser)
    
}




export const signin = async(req,res) => {
    const {email, password} = req.body
    
    try{
     const existingUser = await User.findOne({email});

     if(!existingUser) return res.status(404).json({message:"user doesnt exist"})

     const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

     if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"})

     const token = jwt.sign({
        email: existingUser.email, id: existingUser._id
     }, "test", {expiresIn: "1h"})

     res.status(200).json({result:existingUser, token});
    }
    catch(error){
       res.status(500).json({message:"Sorry Try Again"})
    }
}


export const signup = async(req,res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;
     
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"user already exist"})
         if(password !== confirmPassword) return res.status(400).json({message:"Passwords dont match"})
         const hashedPassword = await bcrypt.hash(password,12);

         const result = await User.create({email, password:hashedPassword, name:`${firstName} ${lastName}`})
         const token = jwt.sign({
            email:result.email, id: result._id
         }, "test", {expiresIn: "1h"})

         res.status(200).json({result, token});
        }

    catch(error){
        res.status(500).json({message:"Sorry Try Again"})
    }
}
