import { FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT, DELETECOM, GET_USERS, GET_USER, EDIT_USER, SEND_MESSAGE, GET_MESSAGES } from '../actions/constants.js';
export default (state = {isLoading: true, posts:[], users: [], curUserInquiry: [], messages: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true}

        case END_LOADING:
            return {...state, isLoading:false}
        case DELETE:
            return {...state, posts: state.posts.filter((post)=> post._id !== action.payload )};
        case UPDATE:
        case LIKE:
            return {...state, posts: state.posts.map((post)=> (post._id === action.payload._id ? action.payload : post))};
        case DELETECOM:
        case COMMENT:
            return {...state, posts: state.posts.map((post) => {
               if(post._id === action.payload._id){
                  return action.payload;
               }
               return post;
            }),
        } 
        case FETCH_ALL:
            return {...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage || 1,
                numberOfPages: action.payload.numberOfPages};
        case FETCH_BY_SEARCH:
            return {...state,
                posts: action.payload}
        case FETCH_POST:
            return {...state, post: action.payload}
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload]};
        case GET_USERS:
            return {...state, users:  action.payload};
        case GET_USER:
            return {...state, curUserInquiry: [action.payload]};
        case EDIT_USER:
            return {...state, users: action.payload};

        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            }
            
       
        default:
            return state;
    }
}