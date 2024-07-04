import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoThumbsup } from "react-icons/go";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import "../assets/Comment.css";

function Comment({ comment = {} }) {
  const [user, setUser] = useState({});

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

  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300); // Reset animation state after 300ms
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
          } ${animate ? "animate-like" : ""}`}
          onClick={handleLikeClick}
        >
          <GoThumbsup
            className={`w-4 h-4 ${liked ? "icon-liked" : "icon-unliked"}`}
          />
          <span>Like</span>
        </button>
        <button
          type="button"
          className="flex items-center space-x-1 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
        >
          <MdDeleteOutline className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}

export default Comment;
