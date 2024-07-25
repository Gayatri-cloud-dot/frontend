import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/post";
import { getFollowingPosts } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));
    if (isAccount) {
      // Optionally, you can add a message or a different action here
      console.log(`Deleted comment from my post`);
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={"frontend/public/avatar.penguinjpg.webp"} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {isAccount || userId === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
