import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import {
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  Favorite,
  MoreVert,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentonPost,
  deletePost,
  likePosts,
  updatePost,
} from "../../Actions/post";
import { getFollowingPosts, getmyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
//import { getMyPosts } from "../../../../backend/controllers/user";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes); // Local likes state
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    // Update local likes immediately
    if (newLikedStatus) {
      setLocalLikes([...localLikes, user]); // Add the user to the likes array
    } else {
      setLocalLikes(localLikes.filter((like) => like._id !== user._id)); // Remove the user from likes
    }

    await dispatch(likePosts(postId));

    // Fetch updated posts
    if (isAccount) {
      dispatch(getmyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    dispatch(addCommentonPost(postId, commentValue));
    setCommentValue(""); // Clear the comment input after submission

    // Fetch updated posts
    if (isAccount) {
      dispatch(getmyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };
  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getmyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getmyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  // Update local likes when prop changes
  useEffect(() => {
    setLocalLikes(likes);
  }, [likes]);

  return (
    <div className="post">
      <div className="postHeader"></div>
      {isAccount ? (
        <Button onClick={() => setCaptionToggle(!captionToggle)}>
          <MoreVert />
        </Button>
      ) : null}
      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color={"rgba(0,0,0,0.582)"}
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={localLikes.length === 0 ? true : false} // Update to use localLikes
      >
        <Typography>{localLikes.length} likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        <Button onClick={deletePostHandler}>
          {isDelete ? <DeleteOutline /> : null}
        </Button>
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {localLikes.map(
            (
              like // Update to use localLikes
            ) => (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar}
              />
            )
          )}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
