// src/Actions/User.js
import axios from "axios";
import { postActions, userActions } from "../Reducers/User";
import { PostActions } from "../Reducers/Post";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(userActions.LoginRequest());

    const { data } = await axiosInstance.post("/login", { email, password });
    console.log(data);

    dispatch(userActions.LoginSuccess(data.user));
  } catch (error) {
    dispatch(
      userActions.LoginFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(userActions.LoadUserRequest());

    const { data } = await axiosInstance.get("/me");

    dispatch(userActions.LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(
      userActions.LoadUserFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch(postActions.postofFollowingRequest());

    const { data } = await axiosInstance.get("/posts");

    dispatch(postActions.postofFollowingSuccess(data.posts));
  } catch (error) {
    dispatch(
      postActions.postofFollowingFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(postActions.allUsersRequest());

    const { data } = await axiosInstance.get("/users");

    dispatch(postActions.allUsersSuccess(data.users));
  } catch (error) {
    dispatch(
      postActions.allUsersFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};

export const getmyPosts = () => async (dispatch) => {
  try {
    dispatch(PostActions.myPostsRequest());

    const { data } = await axiosInstance.get("/my/posts");

    dispatch(PostActions.myPostsSuccess(data.posts));
  } catch (error) {
    dispatch(
      PostActions.myPostsFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};
