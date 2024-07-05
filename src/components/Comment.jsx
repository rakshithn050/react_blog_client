import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoThumbsup } from "react-icons/go";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import "../assets/Comment.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Comment({ comment = {}, updateCommentLikes, deleteComment }) {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);
  const [deleteCommentAction, setDeleteCommentAction] = useState(false);
  const [likeAnimate, setLikeAnimate] = useState(false);
  const [deleteAnimate, setDeleteAnimate] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/getUser/${comment.userID}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (comment.userID) {
      fetchUser();
    }
  }, [comment]);

  const handleLikeClick = async (commentID) => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      } else {
        const res = await axios.put(`/api/comment/likeComment/${commentID}`);
        if (res.status === 200) {
          setLiked(!liked);
          setLikeAnimate(true);
          setTimeout(() => setLikeAnimate(false), 300);
          updateCommentLikes(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async (commentID) => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      } else {
        // Uncomment the following lines to enable actual delete functionality
        // const res = await axios.delete(`/api/comment/deleteComment/${commentID}`);
        // if (res.status === 200) {
        setDeleteCommentAction(!deleteCommentAction);
        setDeleteAnimate(true);
        setTimeout(() => setDeleteAnimate(false), 300);
        //   deleteComment(res.data);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={user?.profilePicture}
              alt="Profile Photo"
            />
            {user?.username}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time
              dateTime={comment?.createdAt}
              title={new Date(comment?.createdAt).toDateString()}
            >
              {new Date(comment?.createdAt).toLocaleString()}
            </time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment?.comment}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center space-x-1 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
        >
          <MdOutlineEdit className="w-4 h-4" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className={`flex items-center text-sm font-medium ${
            liked ? "text-blue-500" : "text-gray-500"
          } ${likeAnimate ? "animate-like" : ""}`}
          onClick={() => {
            handleLikeClick(comment._id);
          }}
        >
          <GoThumbsup
            className={`w-4 h-4 ${
              comment.likes.includes(currentUser._id) || liked
                ? "icon-liked"
                : "icon-unliked"
            }`}
          />
          <span>
            {comment?.numberOfLikes > 0 ? comment?.numberOfLikes : "Like"}
          </span>
        </button>
        {currentUser?.isAdmin ? (
          <button
            type="button"
            className={`flex items-center text-sm font-medium ${
              deleteCommentAction ? "text-red-500" : "text-gray-500"
            } ${deleteAnimate ? "animate-delete" : ""}`}
            onClick={() => {
              handleDeleteClick(comment._id);
            }}
          >
            <MdDeleteOutline
              className={`w-4 h-4 ${
                deleteCommentAction ? "icon-deleted" : "icon-default"
              }`}
            />
            <span>Delete</span>
          </button>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}

export default Comment;
