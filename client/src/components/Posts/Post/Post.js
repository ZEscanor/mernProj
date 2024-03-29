import React,{useState,useEffect} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";

import { deletePost, likePost } from '../../../actions/actionPost';

 
// individual post component that renders each post from an array of posts received in the POSTS component
const Post = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
   

  
   
  
  const user = JSON.parse(localStorage.getItem("profile"))

  //console.log(!user)

  //console.log(post)

 const name = post.name.split(",").join("")
  
// console.log(name)
  
  const Likes = () => {
   if (post?.likes?.length > 0) {
     return post.likes.find((like) => like === (user?.result?._id))
       ? (
         <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
       ) : (
         <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
       );
   }

   return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
 };
  
 const openPost = () => history.push(`/posts/${post._id}`) // when a post is clicked, we will redirect the user to the post details page
   
  return (
    <Card className={classes.card} raised elevation={6}>
     <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' } title={post.title} onClick={openPost}/>
     
     <div className={classes.overlay}>
      <Typography variant='h6'>
        
        {name || post.name}
        </Typography>
      <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography> 
     </div>
     {(user?.result?._id === post?.creator)  && (
     
     <div className={classes.overlay2} >
      <Button style={{color:'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
       <MoreHorizIcon fontSize="medium" />
      </Button>
     </div>
     )}
     <div className={classes.details} >
      <Typography variant='body2' color="textSecondary">
       {post.tags.map((tag) => `#${tag} `)}
      </Typography>
      
     </div>
     <Typography className={classes.title} variant='h5'>{post.title}</Typography>
     <CardContent>
     <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
     </CardContent>
     
     <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user} onClick={()=>dispatch(likePost(post._id))}>
           <Likes/>
        </Button>
        {(user?.result?._id === post?.creator)  && ( <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
           <DeleteIcon fontSize='small'/>
           Delete
        </Button>)}
       
     </CardActions>
    </Card>
  )
}

export default Post;