import { FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH, 
  START_LOADING, END_LOADING, CREATE,
   UPDATE, DELETE, LIKE, COMMENT, DELETECOM,
  GET_USERS, GET_USER, EDIT_USER, SEND_MESSAGE} from './constants';
import * as api from '../api';


//api.fetchPosts

export const getPost = (id) => async (dispatch) => {
  try{
    dispatch({type: START_LOADING})
  const {data} = await api.fetchPost(id);

  //console.log(data)
  dispatch({type: FETCH_POST, payload:data}); // same as return
  dispatch({type: END_LOADING})
  } catch(error){
     console.log(error.message)
  }
}
export const getPosts = (page) => async (dispatch) => {
    try{
      dispatch({type: START_LOADING})
    const {data} = await api.fetchPosts(page);

    //console.log(data)
    dispatch({type: FETCH_ALL, payload:data}); // same as return
    dispatch({type: END_LOADING})
    } catch(error){
       console.log(error.message)
    }
    
     

} // async data so we use redux thunk
  // a function returning another function

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
 try{
  dispatch({type: START_LOADING});
  const {data: {data}} = await api.fetchPostsBySearch(searchQuery)
  //console.log("data", data, {data})
  dispatch({type: FETCH_BY_SEARCH, payload: data});
  dispatch({type: END_LOADING})
 }
 catch(error){
  console.log(error)
 }
}


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
  }

  export const updatePost = (id, post) => async (dispatch) => {
    try{
      const {data} = await api.updatePost(id,post);

      dispatch({type: UPDATE, payload: data})
    }
    catch(error){
         console.log(error)
    }
  }

  export const deletePost = (id) => async (dispatch) => {
    try{
    
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id})

    }
    catch(error){
    console.log(error)
    }
  }

  export const likePost = (id) => async (dispatch) => {
    try{
     const {data} = await api.likePost(id);

     dispatch({type:LIKE, payload: data})
    }
    catch(error){
      console.log(error)
    }
  }



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
  }

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

  }

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
  }

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
  }

  export const editUser = (id,user) => async (dispatch) => {
    try{
         const {data} = await api.editUser(id,user)

         dispatch({type: EDIT_USER, payload: data});
         return data
    }
  
  catch(error){
    console.log(error)
  }
}

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
}