import axios from "axios";
import { userActions } from "../Reducers/User";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies, authorization headers, etc.)
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axiosInstance.post("/login", { email, password });
    console.log(data);
    if (data.success) {
      dispatch(userActions.LoginSuccess(data.user));
    }
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: {
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      },
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axiosInstance.get("/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: {
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      },
    });
  }
};
