import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoThumbsup } from "react-icons/go";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import "../assets/Comment.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Comment({
  comment = {},
  updateCommentLikes,
  deleteComment,
  editCommentContent,
}) {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(false);
  const [deleteCommentAction, setDeleteCommentAction] = useState(false);
  const [likeAnimate, setLikeAnimate] = useState(false);
  const [deleteAnimate, setDeleteAnimate] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [showModal, setShowModal] = useState(false);

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

  const handleEditClick = async (commentID) => {
    setEditComment(true);
    setEditedComment(comment.comment);
  };

  const handleUpdateComment = async () => {
    try {
      const res = await axios.put(`/api/comment/editComment/${comment._id}`, {
        description: editedComment,
      });
      if (res.status === 200) {
        setEditComment(false);
        editCommentContent(res.data); // Pass the updated comment data
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
        const res = await axios.delete(
          `/api/comment/deleteComment/${commentID}`
        );
        if (res.status === 200) {
          setDeleteCommentAction(!deleteCommentAction);
          setTimeout(() => setDeleteAnimate(false), 300);
          deleteComment(commentID);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
        {editComment ? (
          <>
            <Textarea
              className="mb-2"
              value={editedComment}
              onChange={(e) => {
                setEditedComment(e.target.value);
              }}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleUpdateComment}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={() => {
                  setEditComment(false);
                }}
                outline
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">{comment?.comment}</p>
        )}
        <div className="flex items-center mt-4 space-x-4">
          {(currentUser && currentUser?._id === comment.userID) ||
          currentUser?.isAdmin ? (
            <button
              type="button"
              className="flex items-center space-x-1 text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
              onClick={() => {
                handleEditClick(comment._id);
              }}
            >
              <MdOutlineEdit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            ""
          )}

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
                setShowModal(true);
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
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-red-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                handleDeleteClick(comment._id);
                setShowModal(false);
              }}
            >
              Yes, I'm sure
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Comment;
