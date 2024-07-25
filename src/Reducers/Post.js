import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  loading: false,
  likes: [],
  comments: [],
  error: null,
  message: null,
};

const likeReducer = createSlice({
  name: "Like",
  initialState: initialUserState,
  reducers: {
    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action) => {
      state.loading = false;
      state.likes = action.payload.likes;
      state.message = action.payload.message;
    },
    likeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload.comments;
      state.message = action.payload.message;
    },
    addCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    deleteCommentRequest: (state) => {
      state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload.comments;
      state.message = action.payload.message;
    },
    deleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    ClearErrors: (state) => {
      state.error = null;
    },
    ClearMessage: (state) => {
      state.message = null;
    },
  },
});

const initialPostState = {
  posts: [],
  loading: false,
  error: null,
};

const myPostsReducer = createSlice({
  name: "myPost",
  initialState: initialPostState,
  reducers: {
    myPostsRequest: (state) => {
      state.loading = true;
    },
    myPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state) => {
      state.error = null;
    },
  },
});

export const likeActions = likeReducer.actions;
export const PostActions = myPostsReducer.actions;

export { likeReducer, myPostsReducer };
