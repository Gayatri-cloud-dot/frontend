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
    console.log("LoadUserRequest dispatched");

    const { data } = await axiosInstance.get("/me");
    console.log("Response from /me:", data);

    dispatch(userActions.LoadUserSuccess(data.user));
    console.log("LoadUserSuccess dispatched");
  } catch (error) {
    console.error("Error in loadUser:", error); // Log the error for debugging
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

export const logOutUser = () => async (dispatch) => {
  try {
    dispatch(userActions.LogOutUserRequest());

    const { data } = await axiosInstance.get("/logout");

    dispatch(userActions.LogOutUserSuccess(data.user));
  } catch (error) {
    console.error("Logout error:", error);
    console.error("Response:", error.response);

    dispatch(
      userActions.LogOutUserFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        "/api/v1/register",
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };
