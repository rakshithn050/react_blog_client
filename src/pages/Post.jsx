import axios from "axios";
import { Badge, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { VscTag } from "react-icons/vsc";
import "../assets/postDescription.css";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

function Post() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts(1);
  }, [postSlug]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/post/getPosts?slug=${postSlug}&page=${page}&perPage=1`
      );
      if (res.status === 200) {
        const { posts: fetchedPosts, totalPages: fetchedTotalPages } = res.data;
        setPost(fetchedPosts[0]);
        setTotalPages(fetchedTotalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center flex-1 w-screen h-screen">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-56 mb-8 md:mb-0">
            <DashboardSidebar />
          </div>
          <div className="flex-1 p-10">
            <div className="mb-4 relative">
              <div className="px-4 lg:px-0 flex items-center space-x-4">
                <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                  {post?.title}
                </h2>
                <Link to={`/search?category=${post?.category}`}>
                  <Badge color="gray" icon={VscTag}>
                    {post?.category}
                  </Badge>
                </Link>
              </div>

              <img
                src={post?.image}
                className="w-full object-cover lg:rounded h-96 m-4"
              />
              <div className="flex justify-between mb-5 border-b-2 p-5 dark:border-gray-600">
                <span className="dark:text-gray-400">
                  {new Date(post?.createdAt).toLocaleDateString()}
                </span>
                <span className="italic dark:text-gray-400">
                  {Math.ceil(post.description.length / 1000)} mins read
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-12">
              <div
                className="px-4 lg:px-0 mt-12 text-gray-700 dark:text-gray-300 text-lg leading-relaxed w-full postContent"
                dangerouslySetInnerHTML={{ __html: post?.description }}
              ></div>
            </div>
            <CallToAction />
            <CommentSection postID={post?._id} />
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
