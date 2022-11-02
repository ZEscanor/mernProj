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