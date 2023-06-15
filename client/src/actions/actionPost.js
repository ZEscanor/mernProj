import { FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH, 
  START_LOADING, END_LOADING, CREATE,
   UPDATE, DELETE, LIKE, COMMENT, DELETECOM,
  GET_USERS, GET_USER, EDIT_USER, SEND_MESSAGE,
GET_MESSAGES, DELETE_MESSAGE} from './constants';
import * as api from '../api';  // we get all our constants that we use in our reducers and actions from our api folder


//api.fetchPosts

export const getPost = (id) => async (dispatch) => {
  try{
    dispatch({type: START_LOADING}) // we dispatch this action to our reducer to set loading to true
  const {data} = await api.fetchPost(id);

  //console.log(data)
  dispatch({type: FETCH_POST, payload:data}); // same as return
  dispatch({type: END_LOADING})  // we dispatch this action to our reducer to set loading to false
  } catch(error){
     console.log(error.message)
  }
}  // an async function that will return a single post and dispatch it to our reducer to make it available to our local state
   // we will use this function in our PostDetails component and pass in the id of the post we want to fetch
   // primarily used for when we want to view a single post
export const getPosts = (page) => async (dispatch) => {
    try{
      dispatch({type: START_LOADING})
    const {data} = await api.fetchPosts(page);
    dispatch({type: FETCH_ALL, payload:data}); 
    dispatch({type: END_LOADING})
    } catch(error){
       console.log(error.message)
    }
    
     

} // an async function that will return ALL posts and dispatch it to our reducer to make it available to our local state
  // we will use this function in our Home component to display all posts to our users
  



export const getPostsBySearch = (searchQuery) => async (dispatch) => {
 try{
  dispatch({type: START_LOADING});
  const {data: {data}} = await api.fetchPostsBySearch(searchQuery)
  dispatch({type: FETCH_BY_SEARCH, payload: data});
  dispatch({type: END_LOADING})
 }
 catch(error){
  console.log(error)
 }
}   // function that will return all posts that match the search query
    // we will use this function in our Search component to display all posts that match the search query
    


  export const createPost = (post) => async (dispatch) => {
    try{
      dispatch({type: START_LOADING})
      const {data} = await api.createPost(post);
      dispatch({type: CREATE, payload: data });
      dispatch({type: END_LOADING})
    }
    catch(error){
       console.log(error);
    }
  }  // function that will create a new post and dispatch it to our reducer
      // we will use this function in our Form component to create a new post
      // we pass in the post we want to create as an argument to this function
      // the post will be an object with title, message, tags, selectedFile, and creator


  export const updatePost = (id, post) => async (dispatch) => {
    try{
      const {data} = await api.updatePost(id,post);

      dispatch({type: UPDATE, payload: data})
    }
    catch(error){
         console.log(error)
    }
  } // function that will update a post and dispatch it to our reducer
    // we will use this function in our Form component to update a post
    // we get the id of the post the user wants to update and the new post data as arguments to this function


  export const deletePost = (id) => async (dispatch) => {
    try{
    
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id})

    }
    catch(error){
    console.log(error)
    }
  }  // function that will delete a post and dispatch it to our reducer
    // we will use this function in our PostDetails component to delete a post
    // we get the id of the post the user wants to delete as an argument to this function

  export const likePost = (id) => async (dispatch) => {
    try{
     const {data} = await api.likePost(id);

     dispatch({type:LIKE, payload: data})
    }
    catch(error){
      console.log(error)
    }
  }  // function that will like a post and dispatch it to our reducer
     // used in PostDetails
     // we get the id of the post the user wants to like as an argument to this function 



  export const commentPost = (value, id) => async (dispatch) => {
    try{
    const {data} = await api.comment(value,id)
    //console.log(data, "IT WORKS")
    dispatch({type:COMMENT, payload: data});
    return data.comments;
    }
    catch(error){
      console.log(error)
    }
  }   // function that will comment on a post and dispatch it to our reducer
      // used in PostDetails
      // we get the id of the post the user wants to comment on and the comment as arguments to this function
      

  export const deleteComments = (value, id) => async (dispatch) => {
    try{
      console.log(value, "valuen", id)
     const {data} = await api.deleteComment(value,id)
     console.log(data)
      dispatch({type: DELETECOM, payload: data});
      return data.comments
    }
    catch(error){
      console.log(error)
    }

  }  // function that will delete a comment on a post and dispatch it to our reducer
      // used in PostDetails
      // we get the id of the post the user wants to delete a comment on and the comment as arguments to this function

  export const getUsers = () => async (dispatch) => {
    try{
      const {data} = await api.getUsers();

      dispatch({type: GET_USERS, payload: data});
      // console.log("data", data)
       return data
    }

    catch(error){
      console.log(error)
    }
  } // function that will return all users in our database and dispatch it to our reducer
   


  export const getUser = (id) => async (dispatch) => {
    try{
      const {data} = await api.getUser(id);
      //console.log("data", data)
      dispatch({type: GET_USER, payload: data});
       //console.log("data", data)
       return data
    } 

    catch(error){
      console.log(error)
    }
  }   // function that will return a specific single user and dispatch it to our reducer
  // we get the id of the user we want to get as an argument to this function

  export const editUser = (id,user) => async (dispatch) => {
    try{
         const {data} = await api.editUser(id,user)

         dispatch({type: EDIT_USER, payload: data});
         return data
    }
  
  catch(error){
    console.log(error)
  }
} // function that will edit a specific single user and dispatch it to our reducer
// pass in the id of the user we want to edit and the new user data as arguments to this function

export const sendMessage = (id,message) => async (dispatch) => {
  try{
    console.log(id,message, "id,message")
    const {data} = await api.sendMessage(id,message)

    dispatch({
      type: SEND_MESSAGE,
      payload: data 
    });
    return data
  }
  catch(error){
    console.log(error)
  }
} // function that will send a private message to a user and dispatch it to our reducer
  // we get the id of the user we want to send a message to and the message as arguments to this function

  
     

export const getMessages = (id) => async (dispatch) => {
  try{
    const {data} = await api.getMessages(id)
    //console.log(data, "data")
    dispatch({
      type: GET_MESSAGES,
      payload: data
    });
    return data
  }
  catch(error){
    console.log(error)
  }
}   // function that will return all messages for a specific user
    // get the id of the logged in user as an argument

export const deleteMessage = (id, messageID) => async (dispatch) => {
  try{
    const {data} = await api.deleteMessage(id, messageID)
    console.log(data, "data")
    dispatch({
      type: DELETE_MESSAGE,
      payload: data
    });
    return data
  }
  catch(error){
    console.log(error)
  }
}   // function that will delete a specific message for a specific user
    // get the id of the logged in user and the id of the message to delete as arguments
    // will only delete the message for the logged in user because wouldn't make sense to delete it both ways xD unless you are into that sort of thing