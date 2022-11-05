import * as api from '../api';

//api.fetchPosts

export const getPosts = () =>async (dispatch) => {
    try{
    const {data} = await api.fetchPosts();
    dispatch({type: 'FETCH_ALL', payload:data}); // same as return
    } catch(error){
       console.log(error.message)
    }
    
     

} // async data so we use redux thunk
  // a function returning another function


  export const createPost = (post) => async (dispatch) => {
    try{
      const {data} = await api.createPost(post);
      dispatch({type: "CREATE", payload: data });
    }
    catch(error){
       console.log(error);
    }
  }