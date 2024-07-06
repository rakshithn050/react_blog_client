import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "flowbite-react";
import BlogComments from "./BlogComments";
import RecentArticles from "./RecentArticles";

function CommentSection({ postID }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [blogComments, setBlogComments] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [remainingChars, setRemainingChars] = useState(200);
  const { postSlug } = useParams();

  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
    setRemainingChars(200 - newComment.length);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/comment/createComment", {
        comment,
        postID,
        userID: currentUser._id,
      });

      if (res.status !== 200) {
        toast.error("Something went wrong!! please try again later.");
        console.log(res.message);
      } else {
        setComment("");
        setRemainingChars(200);
        toast.success("Comment posted successfully!");
        addNewComment(res.data); // Add the new comment to the state
      }
    } catch (error) {
      toast.error("An error occurred while posting the comment.");
      console.log(error.message);
    }
  };

  const addNewComment = (newComment) => {
    setBlogComments((prevComments) => [newComment, ...prevComments]);
  };

  const updateCommentLikes = (updatedComment) => {
    setBlogComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
  };

  const deleteComment = (deletedComment) => {
    setBlogComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== deletedComment)
    );
  };

  const editCommentContent = (editedComment) => {
    setBlogComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === editedComment._id
          ? { ...comment, comment: editedComment.comment }
          : comment
      )
    );
  };

  const getComments = async () => {
    try {
      const res = await axios.get(`/api/comment/getPostComments/${postID}`);
      if (res.status === 200) {
        setBlogComments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentArticles = async () => {
    try {
      const res = await axios.get(`/api/post/getPosts?page=1&perPage=3`);
      if (res.status === 200) {
        setRecentArticles(res.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [postID]);

  useEffect(() => {
    getRecentArticles();
  }, []);

  return (
    <div className="w-full px-3 my-5">
      {currentUser ? (
        <>
          <div className="flex items-center gap-1 my-5 text-gray-500 text-sm dark:text-gray-400">
            <p>Signed in as </p>
            <img
              src={currentUser.profilePicture}
              alt="Profile Picture"
              className="h-5 w-5 object-cover rounded-full"
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-xs text-cyan-600 hover:underline dark:text-cyan-400"
            >
              @{currentUser.username}
            </Link>
          </div>
          <section className="bg-white dark:bg-gray-900 py-4 lg:py-8 antialiased">
            <div className="px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Your Comment
                </h2>
              </div>
              <form className="mb-6" onSubmit={handleCommentSubmit}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                    maxLength={200}
                    required
                  ></textarea>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                    {remainingChars} characters remaining
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    gradientMonochrome="info"
                    type="submit"
                    className="inline-flex items-center text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Post comment
                  </Button>
                </div>
              </form>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Comments ({blogComments.length})
                </h2>
              </div>
              <BlogComments
                blogComments={blogComments}
                updateCommentLikes={updateCommentLikes}
                deleteComment={deleteComment}
                editCommentContent={editCommentContent}
              />
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Articles
                </h2>
              </div>
              <RecentArticles articles={recentArticles} />
            </div>
          </section>
        </>
      ) : (
        <div className="">
          Please SignIn to comment,
          <Link to={"/login"} className="text-blue-500 dark:text-blue-400">
            Click here to signin
          </Link>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
