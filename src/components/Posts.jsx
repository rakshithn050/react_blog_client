import axios from "axios";
import { Badge, Table, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination"; // Adjust the import path as necessary

function Posts() {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts(1); // Fetch initial page of posts when component mounts
  }, [currentUser._id]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/post/getPosts?userID=${currentUser._id}&page=${page}&perPage=10`
      );
      if (res.status === 200) {
        const { posts: fetchedPosts, totalPages: fetchedTotalPages } = res.data;
        setPosts(fetchedPosts);
        setTotalPages(fetchedTotalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchPosts(page);
  };

  return (
    <div className="table-auto md:w-full m-10 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {posts.map((post) => (
                <Table.Row key={post._id}>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt="Post Image"
                        className="w-10 h-10 object-cover rounded-full bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell className="flex justify-center items-center">
                    <Badge color="info">{post.category}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="flex items-center text-red-500">
                      <HiOutlineTrash className="mr-2" /> Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="flex items-center text-blue-500"
                    >
                      <MdOutlineEdit className="mr-2" /> Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="dark:text-white h-full w-full flex items-center justify-center font-bold text-xl">
          There are no posts
        </p>
      )}
    </div>
  );
}

export default Posts;
