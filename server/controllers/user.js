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
  // get users will find all the users in the database and send them to the client side

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
// get user will find a user by the id in the params and send it to the client side

export const editUser = async (req,res) => {
    const {id} =req.params
    const user = req.body

    //console.log(user, "user")
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with the current Id");

    const updatedUser =  await User.findByIdAndUpdate(id, user, {new:true}); // new returns the user after the user is updated in db

    res.json(updatedUser)
    
}

// edit user will find a user by the id in the params and update it with the user from the request body



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
/*
signin will get the email and password from the request body,
find the user by the email,
compare the password from the request body with the password from the database,
if the password is correct, create a token with the user email and id,
send the token and the user to the client side


*/


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

/*
same as signin but instead of finding the user, 
it creates a new user with the email, password, and name from the request body
*/

export const getMessages = async (req, res) => {
    const {id} = req.params


    try{
        const thisUser = await User.findOne({_id: id}) // or name or id etc.
        
        //console.log(thisUser.messages, "thisUser.messages")

        if(thisUser?.messages.length === 0){ return res.status(404).json({message:"No messages"}) }
        
        else {return res.status(200).json(thisUser.messages)}
        
        
    }
    catch(error){
        res.status(404).json({message:"user NOT FOUND"})

    }
}
// getMessages will find a user by the id in the params and send the messages to the client side


export const sendMessage = async (req, res) => {

    const {id} = req.params;
    const value = req.body;
    const {recipient} = req.body;
  
 
     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with the current Id");
     if(!mongoose.Types.ObjectId.isValid(recipient)) return res.status(404).send("No user with the current Id");
     if(!value.recipent && !value.creator) return res.status(404).send("No recipient or creator");
 
    try{
    const message = await User.findOne({_id:id});
    const receiver = await User.findOne({_id:recipient});
     
    
    

    


    message.messages.push(value)
    receiver.messages.push(value)

   const updatedMessages = await message.save();
 const updatedReceiver =await receiver.save();
 
    res.status(200).json({message: 'Message sent successfully', updatedMessages, updatedReceiver});
    }
    catch(error){
       res.status(500).json({ message: 'Error sending message', error: error.message});
    }
 
 }
    // sendMessage will find a user by the id in the params and push the message from the request body to the messages array

    export const deleteMessage = async (req, res) => {
        const {id} = req.params;
        const messageId = req.body
        // console.log(messageId, "messageId")
        // console.log(messageId.message, "messageId.message"
        // )
        

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with the current Id");
        
        try{
            const message = await User.findOne({_id:id});
            const index = message.messages.findIndex((message) =>
            message.message === messageId.message &&
            message.title === messageId.title &&
            message.recipient === messageId.recipient &&
            message.creator === messageId.creator &&
            message.read === messageId.read 
                
            );
             message.messages.splice(index, 1);
             const updatedMessages = await message.save();
            res.status(200).json({message: 'Message deleted successfully'});
        }
        catch(error){
            res.status(500).json({ message: 'Error deleting message', error: error.message});
        }
    }
    // deleteMessage will find a user by the id in the params and delete the message from the request body from the messages array



 