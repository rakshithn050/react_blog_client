import axios from "axios";
import { Badge, Table, Spinner, Modal, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineTrash } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination"; // Adjust the import path as necessary
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";

function Posts() {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deletePost, setDeletePost] = useState("");

  useEffect(() => {
    fetchPosts(1);
  }, [currentUser._id]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/post/getPosts?page=${page}&perPage=10`);
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

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `/api/post/deletePost/${deletePost}/${currentUser._id}`
      );
      if (res.status === 200) {
        toast.info("Post deleted successfully");
        setPosts((prev) => prev.filter((post) => post._id !== deletePost));
        if (posts.length === 1 && currentPage > 1) {
          fetchPosts(currentPage - 1);
        } else {
          fetchPosts(currentPage);
        }
      } else {
        toast.error("Couldn't delete the post");
        console.log(res);
      }
    } catch (error) {
      toast.error("Couldn't delete the post");
      console.log(error);
    }
  };

  return (
    <>
      <div className="table-auto md:w-full m-10 overflow-x-scroll md:mx-auto p-3 flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <Spinner size="lg" />
          </div>
        ) : posts.length > 0 ? (
          <div className="flex-1">
            <Table hoverable className="shadow-sm">
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>View Post</Table.HeadCell>
                {currentUser.isAdmin && (
                  <>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>
                      <span>Edit</span>
                    </Table.HeadCell>
                  </>
                )}
              </Table.Head>
              <Table.Body className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <Table.Row
                    key={post._id}
                    className="border-b border-gray-300"
                  >
                    <Table.Cell className="py-4 px-6">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt="Post Image"
                          className="w-10 h-10 object-cover rounded-full bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6 flex">
                      <Badge color="info">{post.category}</Badge>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <Link
                        to={`/post/${post.slug}`}
                        className="flex items-center text-blue-500"
                      >
                        <FaEye className="mr-2" /> View Post
                      </Link>
                    </Table.Cell>
                    {currentUser.isAdmin && (
                      <>
                        <Table.Cell className="py-4 px-6">
                          <span
                            className="flex items-center text-red-500 cursor-pointer"
                            onClick={() => {
                              setShowModal(true);
                              setDeletePost(post._id);
                            }}
                          >
                            <HiOutlineTrash className="mr-2" /> Delete
                          </span>
                        </Table.Cell>
                        <Table.Cell className="py-4 px-6">
                          <Link
                            to={`/updatePost/${post._id}`}
                            className="flex items-center text-blue-500"
                          >
                            <MdOutlineEdit className="mr-2" /> Edit
                          </Link>
                        </Table.Cell>
                      </>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <p className="dark:text-white h-full w-full flex items-center justify-center font-bold text-xl">
            There are no posts
          </p>
        )}
        {posts.length > 0 && (
          <div className="self-end mb-5 mr-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
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
              Are you sure, you want to delete this post?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeletePost}>
              Yes!! I'm Sure
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

export default Posts;
