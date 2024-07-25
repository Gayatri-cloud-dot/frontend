import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoginRequest: (state) => {
      console.log("LoginRequest");
      state.loading = true;
      state.error = null;
    },
    LoginSuccess: (state, action) => {
      console.log("LoginSuccess", action.payload);
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    LoginFailure: (state, action) => {
      console.log("LoginFailure", action.payload);
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    RegisterRequest: (state) => {
      console.log("RegisterRequest");
      state.loading = true;
      state.error = null;
    },
    RegisterSuccess: (state, action) => {
      console.log("RegisterSuccess", action.payload);
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    RegisterFailure: (state, action) => {
      console.log("RegisterFailure", action.payload);
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    LoadUserRequest: (state) => {
      console.log("LoadUserRequest");
      state.loading = true;
      state.error = null;
    },
    LoadUserSuccess: (state, action) => {
      console.log("LoadUserSuccess", action.payload);
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    LoadUserFailure: (state, action) => {
      console.log("LoadUserFailure", action.payload);
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    Logout: (state) => {
      console.log("Logout");
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

const initialPostState = {
  posts: [],
  loading: false,
  error: null,
};

const postofFollowingReducer = createSlice({
  name: "postOfFollowing",
  initialState: initialPostState,
  reducers: {
    postofFollowingRequest: (state) => {
      state.loading = true;
    },
    postofFollowingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postofFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state) => {
      state.error = null;
    },
  },
});

const initialUserState = {
  users: [],
  loading: false,
  error: null,
};

const allUsersReducer = createSlice({
  name: "allUsers",
  initialState: initialUserState,
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state) => {
      state.error = null;
    },
  },
});

export const userActions = userReducer.actions;
export const postActions = {
  ...postofFollowingReducer.actions,
  ...allUsersReducer.actions,
};

export { userReducer, postofFollowingReducer, allUsersReducer };
