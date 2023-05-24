import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {type: String, required:true},
    title: {type: String, required:true},
    recipient: {type: String, required:true},
    creator: {type: String, required:false},
    createdAt: {
        type: Date,
        default: new Date()
    },
    read: {type: Boolean, default: false},
    messageGroup: {type: [String], default: []},

  });


const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    id: {type: String},
    role: {type: String, default: "user"},
    messages: {
        type: [messageSchema],
        default: []
    },
   
    
})

export default mongoose.model("User", userSchema);