import { combineReducers } from "redux";

import posts from './reducerPost'
import authReducer from "./authReducer";

export default combineReducers({
  posts, authReducer
});