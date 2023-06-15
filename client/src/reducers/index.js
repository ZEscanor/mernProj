import { combineReducers } from "redux";

import posts from './reducerPost'
import authReducer from "./authReducer";

export default combineReducers({
  posts, authReducer
});
// combine reducers makes it easier to add more reducers in the future