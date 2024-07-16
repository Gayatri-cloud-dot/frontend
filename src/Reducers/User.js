import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    LoginRequest: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    LoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RegisterRequest: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    RegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    LoadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userAction = userReducer.actions;
export default userReducer.reducer;
