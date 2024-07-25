import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  postofFollowingReducer,
  allUsersReducer,
} from "./Reducers/User";
import { likeReducer, myPostsReducer } from "./Reducers/Post";

const rootReducer = combineReducers({
  user: userReducer.reducer,
  postofFollowing: postofFollowingReducer.reducer,
  allUsers: allUsersReducer.reducer,
  Like: likeReducer.reducer,
  myPosts: myPostsReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
