import React, {useEffect} from 'react';
import { Paper, Typography, CircularProgress, Divider, Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/actionPost';
import CommentSection from './CommentSection';
import useStyles from "./styles";

// if an individual post is clicked, it will show the details of that post
const PostDetails = () => {
 
 const {post, posts, isLoading} = useSelector((state) => state.posts);
   // console.log("PostDetails")
const dispatch = useDispatch();
const history = useHistory();
const {id} = useParams(); // id of the post
const classes = useStyles();

useEffect(()=>{
dispatch(getPost(id));
},[id])

useEffect(()=>{
  if(post){
    dispatch(getPostsBySearch({search:"none", tags: post?.tags.join(',') }));
  }
},[post])

if(!post) return null;

const openPost = (_id) => history.push(`/posts/${_id}`);
if(isLoading){
  return (<Paper elevation={6} className={classes.loadingPaper}>
    <CircularProgress size="7em" />
  </Paper> );
} // if the post is loading, it will show the circular progress bar

const recommendedPosts = posts.filter(({_id}) => _id !== post._id)
//console.log(recommendedPosts,  "rec")
//console.log(posts, post,  "post")
  return (
  <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
    <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          
          
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }}  />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.imageSection} src={post.selectedFile} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
         <Typography gutterBottom variant='h5'>
               You might Also like:
         </Typography>
         <Divider/>
         <div className={classes.recommendedPosts}>
           {recommendedPosts.map(({title,message,name,likes,selectedFile, _id}) => (
            <div className={classes.postCards} onClick={() => openPost(_id)} key={_id}>
             <Typography gutterBottom variant='h6'> {title} </Typography>
             <img className={classes.recommendedImg} src={selectedFile}/>
             <Typography gutterBottom variant='subtitle2'> {name} </Typography>
             <Typography gutterBottom variant='subtitle2'> {message} </Typography>
             <Typography gutterBottom variant='subtitle1' > Likes: {likes.length} </Typography>
             
             
            </div>
           ))}
         </div>
        </div>
      )}
      </Paper>
  )
}
export default PostDetails