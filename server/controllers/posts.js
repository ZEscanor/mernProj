import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


export const getPost = async (req,res) => {
   const {id} = req.params;

   try{
      const post = await PostMessage.findById(id);

      res.status(200).json(post);
   }
   catch(error){
      res.status(404).json({message:error.message})
   }
}  // we will get a singular post by finding it by its id in the mongoDB database



export const getPosts = async (req,res)=>{
   const {page} = req.query;
   try {
      const LIMIT = 8;
      const startIndex = (Number(page) -1) * LIMIT // the start index

      const total = await PostMessage.countDocuments({});

     const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
     //console.log(postMessages)
     res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
   }
   catch(error) {
      res.status(404).json({message: error.message})
   }
}  /* get posts will first get the page number from the query, 
 find the total number of posts,find the posts by the page number and the limit of 8 posts per page, 
 sort the posts by the most recent post, 
 skip the posts that are not on the current page,
 then finally 
 send the posts, 
the current page, and the number of pages to the client side
*/
export const getPostsBySearch = async (req,res) => {
   const {searchQuery, tags} = req.query 
   
   try{
     const title = new RegExp(searchQuery, 'i');
     const posts = await PostMessage.find({$or : [{title}, {tags: {$in: tags.split(',')}}]}); // find me title or tags, if tags = to tag in array of tags

     res.json({data: posts})
   }
   catch(error) {
      res.status(404).json({message: error.message})
   }
}
/* get posts by search will first get the search query and the tags from the query,
   then it will find the posts by the search query and the tags,
   then it will send the posts to the client side
*/


export const createPost = async (req,res) => {
  const post = req.body;

  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
   try{
    await newPost.save();

    res.status(201).json(newPost)
   }
   catch(error){
     res.status(400).json({message:error.message})
   }
}
/*
create post will first get the post from the request body,
then it will create a new post with the post from the request body, the creator id, and the current date,
then it will save the new post,
then it will send the new post to the client side
*/

export const updatePost = async (req,res) => {
   const {id:_id} = req.params;
   const post = req.body;

   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with the current Id"); // checks if it is valid in our mongoose schema
   
   const updatedPost =  await PostMessage.findByIdAndUpdate(_id, post, {new:true});

   
   res.json(updatedPost);
}
/*
update post will first get the id from the request parameters,
get the post from the request body,
 check if the id is valid in our mongoose schema,
update the post with the id and the post from the request body,
 send the updated post to the client side
*/

export const deletePost = async (req,res) => {
   const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with the current Id");

   await PostMessage.findByIdAndRemove(id);

   res.json({message: 'Post deleted successfully'})
}

/*
delete post will first get the id from the request parameters,
check if the id is valid in our mongoose schema,
delete the post with the id,
send a message to the client side
*/

export const likePost = async (req, res) => {
   const {id} = req.params
   
   if(!req.userId) return res.json({message:'Unauthed'})

   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with the current Id");
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id)=> id=== String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }
    else{
      //dislike the post
      post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new: true});

    res.json(updatedPost);
}

/*
like post will first get the id from the request parameters,
check if the id is valid in our mongoose schema,
check if the user is authenticated,
find the post by the id,
find the index of the user id in the post likes array,
if the index is -1, then push the user id to the post likes array,
else, dislike the post by filtering the user id from the post likes array,
update the post with the id and the post from the request body,
send the updated post to the client side
*/

export const commentPost = async (req, res) => {
   const {id} = req.params;
   const {value} = req.body;

   const post = await PostMessage.findById(id);

   post.comments.push(value);

   const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

   res.json(updatedPost)
}
/*
comment post will first get the id from the request parameters,
get the comment from the request body,
find the post by the id,
push the comment to the post comments array,
update the post with the id and the post from the request body,
send the updated post to the client side
*/


export const deleteComment = async (req,res) => {
   //console.log(req)
   const {id} = req.params;
   const {value} = req.body
   
   const post = await PostMessage.findById(id);
   const index = post.comments.indexOf(value)
   post.comments.splice(index,1)
   const hello2 = post.comments

   const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new:true});

  res.json(updatedPost)

}
/*
delete comment will first get the id from the request parameters,
get the comment from the request body,
find the post by the id,
find the index of the comment in the post comments array,
splice the comment from the post comments array,
update the post with the id and the post from the request body,
send the updated post to the client side
*/

