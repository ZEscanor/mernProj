import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/actionPost';
import * as yup from "yup";


const schema = yup.object().shape({

  title: yup.string().required(),
   message:yup.string().required(), 
   tags: yup.string().required(),
  
   
  }) //yup validation for our form, this acts as more of a second layer to ensure valid input

 
const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
     title: '', message: '', tags: '',
    selectedFile: ''
  })  //this is the data we will be sending to the backend when a new post is created
  
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null)); //this useSelector will get the current post that we are editing
  const dispatch = useDispatch();   
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile")) // get the user from local storage
  const history = useHistory();
  

  useEffect(()=>{
  if(post){setPostData(post)}
}, [currentId]) // if the currentId of a post changes, we are in editing mode, so we will set the post data to the post we are editing


const clear = () => {
  setCurrentId(null);
  setPostData({title: '', message: '', tags: '',
  selectedFile: ''})
}  //this function will clear the form after a post is submitted or edited


  const handleSubmit = async (e) => {
   //when user submits send data with whatever the user has typed in
   e.preventDefault();

   if(currentId){
    dispatch(updatePost(currentId, {...postData, name:user?.result?.name}))
   } //if we are in editing mode and the user submits, we will dispatch the updatePost action to update the post
   else{
   
   dispatch(createPost({...postData, name:user?.result?.name}));
   } //if we are not in editing mode and the user submits, we will dispatch the createPost action to create a new post
   clear();
   history.push("/");
  }
  //console.log(!user,"this user") 
  if(!user?.result?.name ){
   if(!user?.user?.name)
    return(
      <Paper className={classes.paper}>
      <Typography variant='h6' align="center">
        Please Sign in First
        </Typography>  
      </Paper>
    )
  } //if the user is not signed in, we will display a message to the user to sign in first

  
  return (
    <Paper className={classes.paper} elevation={6}>
    <form autoComplete='off'  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant='h6'>
        {currentId ? "Editing" : "Creating"} A Memory
      </Typography>
      {/* <TextField name="creator" variant='outlined' label="Creator" fullWidth
       value={postData.creator} onChange={(e)=> setPostData({...postData, creator: e.target.value})}/> */}
      <TextField name="title" variant='outlined' label="Title" fullWidth
       value={postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})} required />
      <TextField name="message" variant='outlined' label="Message" fullWidth
       value={postData.message} onChange={(e)=> setPostData({...postData, message: e.target.value})} required/>
      <TextField name="tags" variant='outlined' label="Tags" fullWidth
       value={postData.tags} onChange={(e)=> setPostData({...postData, tags: e.target.value.split(",")})} required/>
      <div className={classes.fileInput}>
          <FileBase type="file" multiple={false}
          onDone ={({base64}) => setPostData({...postData, selectedFile:base64})}
          />

      </div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    </form>
    </Paper>
  )
}

export default Form