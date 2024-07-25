import axios from "axios";
import { likeActions } from "../Reducers/Post";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const likePosts = (id) => async (dispatch) => {
  try {
    dispatch(likeActions.likeRequest());

    const { data } = await axiosInstance.get(`/post/${id}`);

    dispatch(
      likeActions.likeSuccess({ likes: data.likes, message: data.message })
    ); // Assuming data.likes and data.message are in the response
  } catch (error) {
    dispatch(
      likeActions.likeFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};

export const addCommentonPost = (id, comment) => async (dispatch) => {
  try {
    dispatch(likeActions.addCommentRequest());

    const { data } = await axiosInstance.put(
      `/post/comment/${id}`,
      { comment },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(
      likeActions.addCommentSuccess({
        comments: data.comments,
        message: data.message,
      })
    ); // Assuming data.comments and data.message are in the response
  } catch (error) {
    dispatch(
      likeActions.addCommentFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch(likeActions.deleteCommentRequest());

    const { data } = await axiosInstance({
      method: "delete",
      url: `/post/comment/${id}`,
      data: { commentId },
    });

    dispatch(
      likeActions.deleteCommentSuccess({
        comments: data.comments,
        message: data.message,
      })
    ); // Assuming data.comments and data.message are in the response
  } catch (error) {
    dispatch(
      likeActions.deleteCommentFailure({
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      })
    );
  }
};
