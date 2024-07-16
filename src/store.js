// src/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/User";

const rootReducer = combineReducers({
  user: userReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
