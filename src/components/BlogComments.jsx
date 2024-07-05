import React from "react";
import Comment from "./Comment";

function BlogComments({
  blogComments = [],
  updateCommentLikes,
  deleteComment,
  editCommentContent,
}) {
  return (
    <>
      {blogComments.length > 0 ? (
        blogComments.map((comment) => {
          return (
            <Comment
              comment={comment}
              key={comment._id} // Use a unique key
              updateCommentLikes={updateCommentLikes}
              deleteComment={deleteComment}
              editCommentContent={editCommentContent}
            />
          );
        })
      ) : (
        <p className="dark:text-white">No Comments on this post yet!!</p>
      )}
    </>
  );
}

export default BlogComments;
