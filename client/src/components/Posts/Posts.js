import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

import useStyles from './styles';

// this component will display all of the posts we have in the database
const Posts = ({setCurrentId}) => {
  const {posts, isLoading} = useSelector((state)=> state.posts) // get the posts and isLoading state from the global state
  const classes = useStyles();

 // console.log(posts)
 if(!posts.length && !isLoading) return <div className={classes.noPosts} >No Posts match that search, Try Again</div> 
 // if there are no posts and we are not loading, display a message to the user
  return (
   isLoading ? <CircularProgress/> : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
     {posts.map((post) =>(
      <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}> 
           <Post  post={post} setCurrentId={setCurrentId}/>
      </Grid>
     ))}
    </Grid>
   )
  )
}

export default Posts