import { FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, 
    UPDATE, DELETE, LIKE, COMMENT, 
    DELETECOM, GET_USERS, GET_USER, 
    EDIT_USER, SEND_MESSAGE, GET_MESSAGES, DELETE_MESSAGE } from '../actions/constants.js';
   // from our constants file

export default (state = {isLoading: true, posts:[], users: [], curUserInquiry: [], messages: []}, action) => {
    switch (action.type) {
        case START_LOADING:  // if we are loading
            return {...state, isLoading: true}

        case END_LOADING:  // if we are not loading
            return {...state, isLoading:false}
        case DELETE: // if we are deleting a post
            return {...state, posts: state.posts.filter((post)=> post._id !== action.payload )};
        case UPDATE: // if we are updating a post
        case LIKE: // if we are liking a post
            return {...state, posts: state.posts.map((post)=> (post._id === action.payload._id ? action.payload : post))};
        case DELETECOM: // if we are deleting a comment
        case COMMENT: // if we are commenting on a post
            return {...state, posts: state.posts.map((post) => {
               if(post._id === action.payload._id){
                  return action.payload;
               }
               return post;
            }),
        } 
        case FETCH_ALL:     // if we are fetching all posts
            return {...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage || 1,
                numberOfPages: action.payload.numberOfPages};
        case FETCH_BY_SEARCH:  // if we are fetching by search
            return {...state,
                posts: action.payload}
        case FETCH_POST:  // if we are fetching a single post
            return {...state, post: action.payload}
        case CREATE: // if we are creating a post
            return { ...state, posts: [...state.posts, action.payload]};
        case GET_USERS: // if we are getting all users
            return {...state, users:  action.payload};
        case GET_USER: // if we are getting a single user
            return {...state, curUserInquiry: [action.payload]};
        case EDIT_USER: // if we are editing a user
            return {...state, users: action.payload};

        case SEND_MESSAGE: // if we are sending a message
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        case GET_MESSAGES: // if we are getting all messages
            return {
                ...state,
                messages: action.payload,
            }
        case DELETE_MESSAGE: // if we are deleting a message
            return {
                ...state,
                messages: state.messages.filter((message) => message.recipient !== action.payload),
            }
            
       
        default:
            return state;
    }
}
