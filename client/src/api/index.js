import axios from 'axios';

const API = //axios.create({baseURL:`http://localhost:5000` })
   axios.create({baseURL:`https://mern-proj-api.vercel.app` })

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
})// checks our tokens


export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts',newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, {value});
export const deleteComment = (value, id) => API.patch(`/posts/${id}/deleteComment`, {value});

export const getUsers = () => API.get('/user');
export const getUser = (id) => API.get(`/user/${id}`);
export const editUser = (id,updatedUser) => API.patch(`/user/${id}`,updatedUser);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);


export const sendMessage = (id,message) => API.post(`/user/${id}`, message);


