import React from "react";
import Comment from "./Comment";

function BlogComments({ blogComments = [] }) {
  return (
    <>
      {blogComments.length > 0 ? (
        blogComments.map((comment, index) => {
          return <Comment comment={comment} key={index} />;
        })
      ) : (
        <p className="dark:text-white">No Comments on this post yet!!</p>
      )}
    </>
  );
}

export default BlogComments;
