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

function Users() {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState("");

  useEffect(() => {
    fetchUsers(1);
  }, [currentUser._id]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/getUsers?page=${page}&perPage=10`);
      if (res.status === 200) {
        const { users: fetchedUsers, totalPages: fetchedTotalPages } = res.data;
        setUsers(fetchedUsers);
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
    fetchUsers(page);
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(`/api/user/delete-profile/${deleteUser}`);
      if (res.status === 200) {
        toast.info("User deleted successfully");
        setUsers((prev) => prev.filter((user) => user._id !== deleteUser));
        if (users.length === 1 && currentPage > 1) {
          fetchUsers(currentPage - 1);
        } else {
          fetchUsers(currentPage);
        }
      } else {
        toast.error("Couldn't delete the user");

        console.log(res);
      }
    } catch (error) {
      toast.error("Couldn't delete the user");

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
        ) : currentUser.isAdmin && users.length > 0 ? (
          <div className="flex-1">
            <Table hoverable className="shadow-sm">
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>Profile Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>isAdmin</Table.HeadCell>
                <Table.HeadCell>Delete User</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-gray-200">
                {users.map((user) => (
                  <Table.Row
                    key={user._id}
                    className="border-b border-gray-300"
                  >
                    <Table.Cell className="py-4 px-6">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <img
                        src={user.profilePicture}
                        alt="Profile Image"
                        className="w-10 h-10 object-cover rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <span>{user.username}</span>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.isAdmin}
                          className="sr-only peer"
                          disabled
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-6">
                      <span
                        className="flex items-center text-red-500 cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setDeleteUser(user._id);
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
            There are no users
          </p>
        )}
        {currentUser.isAdmin && users.length > 0 && (
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
              Are you sure, you want to delete this user?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteUser}>
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

export default Users;
