import React, {useState, useRef} from "react";
import {Typography, TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {commentPost,deleteComments} from "../../actions/actionPost";

import { Redirect} from "react-router-dom";

import useStyles from "./styles";

// this component is for the comment section of the post
const CommentSection = ({post}) => {
    //console.log("COMMENTO",post);
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    
    const handleClick = async () => {
     const finComment = `${user.result.name}: ${comment}`;
     //console.log(post)
    const newComments = await dispatch(commentPost(finComment, post._id));
    //console.log(post)
     //console.log(newComments, "NEW COMMENT")
     
     setComments(newComments)
     setComment("")
      // set are comments to the new comments received from database
      // set textfield to empty string
      commentsRef.current.scrollIntoView({behavior:"smooth"}) 
  }

  const handleDel = async (val) => {

    //console.log(comment2Delete,val, "hmm")
    if(val === '' || null){
      console.log("no data found")
    }
    else{
      const newComments = await dispatch(deleteComments(val, post._id))
      //console.log( newComments, "new comments")
      setComments(newComments)
    }
    
   //console.log(itWork,"itWork")
  }

    return (
      <div>
        <div className={classes.commentsOuterContainer}>
         <div className={classes.commentsInnerContainer}>
             <Typography gutterBottom variant="h6">
                Comments
             </Typography>
             {comments?.map((c,i)=>(
                
                <Typography key={i} gutterBottom variant="subtitle1">
                    
                    <strong>  {c.split(': ')[0]}:</strong>
                     {c.split(':')[1]}
                  {(user?.result?.name === c.split(': ')[0]) && (
                     <Button style={{width:"20px", color:"red",position:"relative"}} onClick={function(){
                  handleDel(c);
                  }}>X</Button>)}
                </Typography>
             ))}
             
             <div ref={commentsRef} />
         </div>
         {user?.result?.name && (
         <div style={{width: "70%"}}>
           <Typography gutterBottom variant="h6">
            Write a comment
           </Typography>
           <TextField fullWidth 
           minRows={4} 
           variant="outlined" 
           label="Comment" 
           multiline
           value={comment}
           onChange={(e)=> setComment(e.target.value)}/>
           <Button style={{marginTop:"10px"}} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">
             COMMENT NOW
           </Button>
           </div>
         )}
         </div>
        
        </div>
    );
}

export default CommentSection;