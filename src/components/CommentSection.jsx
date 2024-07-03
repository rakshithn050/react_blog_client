import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "flowbite-react";

function CommentSection({ postID }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
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
      }
    } catch (error) {
      toast.error("An error occurred while posting the comment.");
      console.log(error.message);
    }
  };

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
                  Comments
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
                    className="inline-flex items-center text-right text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Post comment
                  </Button>
                </div>
              </form>
              {/* Render comments dynamically here */}
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"
                      />
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time dateTime="2022-02-08" title="February 8th, 2022">
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  Very straight-to-point article. Really worth time reading.
                  Thank you! But tools are just the instruments for the UX
                  designers. The knowledge of the design tools are as important
                  as the creation of the design strategy.
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      className="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
              {/* Add more comment articles here */}
            </div>
          </section>
        </>
      ) : (
        <div className="">
          Please SignIn to comment,{" "}
          <Link to={"/login"} className="text-blue-500 dark:text-blue-400">
            Click here to signin
          </Link>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
