import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, posts } = useSelector(
    (state) => state.postofFollowing || {}
  );
  const {
    users = [],
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.allUsers || {});
  const { error: likeError, message } = useSelector(
    (state) => state.like || {}
  );

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (usersError) {
      alert.error(usersError);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [usersError, likeError, message, alert, dispatch]);

  if (loading || usersLoading) {
    return <Loader />;
  }

  return (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image ? post.image.url : ""}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>

      <div className="homeright">
        {users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={"avatar.penguinjpg.webp"}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
