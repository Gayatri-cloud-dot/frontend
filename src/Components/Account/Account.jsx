import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getmyPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { useAlert } from "react-alert";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import User from "../User/User";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, posts } = useSelector(
    (state) => state.myPosts || { posts: [] }
  );
  const { user } = useSelector((state) => state.user);
  const { error: likeError, message } = useSelector(
    (state) => state.like || {}
  );
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  useEffect(() => {
    dispatch(getmyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
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
  }, [alert, error, message, likeError, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) =>
            post ? (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption || "No caption"}
                postImage={post.image?.url || "default-image-url"}
                likes={post.likes || 0}
                comments={post.comments || []}
                ownerImage={post.owner?.avatar?.url || "default-avatar-url"}
                ownerName={post.owner?.name || "Unknown"}
                ownerId={post.owner?._id || "unknown"}
                isAccount={true}
                isDelete={true}
              />
            ) : null
          )
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user?.avatar?.url || "default-avatar-url"}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user?.name}</Typography>
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user?.followers?.length || 0}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user?.following?.length || 0}</Typography>
        </div>
        <div>
          <Typography>Post</Typography>
          <Typography>{user?.posts?.length || 0}</Typography>
        </div>
        <Button variant="contained">Logout</Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button variant="text" style={{ color: "red", margin: "2vmax" }}>
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers?.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar?.url || "default-avatar-url"}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following?.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar?.url || "default-avatar-url"}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
