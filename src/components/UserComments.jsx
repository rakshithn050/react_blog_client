import axios from "axios";
import {
  Badge,
  Table,
  Spinner,
  Modal,
  Button,
  ToggleSwitch,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineTrash } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination"; // Adjust the import path as necessary
import { toast } from "react-toastify";

function UserComments() {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteComment, setDeleteComment] = useState("");

  useEffect(() => {
    fetchComments(1);
  }, [currentUser._id]);

  const fetchComments = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/comment/getAllComments?page=${page}&perPage=10`
      );
      if (res.status === 200) {
        const { comments: fetchedComments, totalPages: fetchedTotalPages } =
          res.data;
        setComments(fetchedComments);
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
    fetchComments(page);
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `/api/comment/deleteComment/${deleteComment}`
      );
      if (res.status === 200) {
        toast.info("Comment deleted successfully");
        setComments((prev) =>
          prev.filter((comment) => comment._id !== deleteComment)
        );
        if (comments.length === 1 && currentPage > 1) {
          fetchComments(currentPage - 1);
        } else {
          fetchComments(currentPage);
        }
      } else {
        toast.error("Couldn't delete the comment");
        console.log(res);
      }
    } catch (error) {
      toast.error("Couldn't delete the comment");
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
        ) : currentUser.isAdmin && comments.length > 0 ? (
          <div className="flex-1">
            <Table hoverable className="shadow-sm">
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Comment</Table.HeadCell>
                <Table.HeadCell>Total Likes</Table.HeadCell>
                <Table.HeadCell>Post ID</Table.HeadCell>
                <Table.HeadCell>User ID</Table.HeadCell>
                <Table.HeadCell>Delete Comment</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-gray-200">
                {comments.map((comment) => (
                  <Table.Row
                    key={comment._id}
                    className="border-b border-gray-300"
                  >
                    <Table.Cell className="py-4 px-6">
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      {comment.comment}
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      {comment.numberOfLikes}
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      {comment.postID}
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      {comment.userID}
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <span
                        className="flex items-center text-red-500 cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setDeleteComment(comment._id);
                        }}
                      >
                        <HiOutlineTrash className="mr-2" /> Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <p className="dark:text-white h-full w-full flex items-center justify-center font-bold text-xl">
            There are no comments
          </p>
        )}
        {currentUser.isAdmin && comments.length > 0 && (
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
              Are you sure, you want to delete this comment?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteComment}>
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

export default UserComments;
