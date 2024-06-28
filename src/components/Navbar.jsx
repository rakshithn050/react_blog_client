import React, { useState, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DarkThemeToggle,
  Button,
  Navbar as FlowbiteNavbar,
} from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../store/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
    console.log(currentUser?.username);
  }, [currentUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality if needed
  };

  const handleSignOut = async () => {
    try {
      const res = await axios.post("/api/user/signout");
      if (res.status !== 200) {
        toast.error("Something went wrong!! please try again later.");
        console.log(res.message);
      } else {
        toast.info("Signing out Successfully.");
        setTimeout(() => {
          dispatch(signOutSuccess(res.data));
        }, 1000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <FlowbiteNavbar
      fluid
      className="bg-white px-2 py-[15px] border dark:border-gray-700 dark:bg-gray-800 sm:px-4"
    >
      {/* Logo and Brand */}
      <Link className="flex" to="/">
        <img
          src="https://img.freepik.com/free-vector/geometric-leaves-logo-business-template_23-2148707652.jpg?w=740&t=st=1718532568~exp=1718533168~hmac=251fd52394c242e2e2a7c3b6d85d72ed9b8ef91ad402d057bb159856ec153e5c"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          React Blog
        </span>
      </Link>
      {/* Logo End */}

      {/* Side Navigation and Search */}
      <div className="flex md:flex-row md:items-center md:justify-between md:order-2">
        <div className="flex-shrink-0 mr-4 mb-2 md:mb-0">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder={window.innerWidth > 768 ? "Search..." : ""}
              className="bg-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-full md:w-16 sm:w-16 hidden md:flex"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-2 focus:outline-none"
              aria-label="Search"
            >
              <RiSearchLine className="h-6 w-6 text-gray-600" />
            </button>
          </form>
        </div>

        <div className="flex items-center">
          <DarkThemeToggle />

          {isLoggedIn ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={
                    currentUser
                      ? currentUser.profilePicture
                      : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                  }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {currentUser ? currentUser.username : ""}
                </span>
                <span className="block truncate text-sm font-medium">
                  {currentUser ? currentUser.email : ""}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to={"/dashboard?tab='profile'"}>Dashboard</Link>
              </Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="hidden md:flex lg:flex">
              <NavLink to="/login" className="mx-2">
                <Button gradientMonochrome="info" className="w-full">
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/register" className="mx-2">
                <Button gradientMonochrome="success" className="w-full">
                  Sign Up
                </Button>
              </NavLink>
            </div>
          )}

          <FlowbiteNavbar.Toggle />
        </div>
      </div>
      {/* Side Navigation and Search End */}

      {/* Navigation Links and Collapsible Menu */}
      <FlowbiteNavbar.Collapse>
        {/* Main Navigation Links */}
        <FlowbiteNavbar.Link as={"div"}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-purple-900 dark:text-blue-500"
                : "text-blue-500 dark:text-white"
            }
          >
            Home
          </NavLink>
        </FlowbiteNavbar.Link>

        <FlowbiteNavbar.Link as={"div"}>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive
                ? "text-purple-900 dark:text-blue-500"
                : "text-blue-500 dark:text-white"
            }
          >
            About
          </NavLink>
        </FlowbiteNavbar.Link>

        <FlowbiteNavbar.Link as={"div"}>
          <NavLink
            to="projects"
            className={({ isActive }) =>
              isActive
                ? "text-purple-900 dark:text-blue-500"
                : "text-blue-500 dark:text-white"
            }
          >
            Projects
          </NavLink>
        </FlowbiteNavbar.Link>

        {/* Conditional Sign In/Sign Up Buttons */}
        {!isLoggedIn && (
          <div className="mt-4 md:hidden">
            {/* Hide on medium screens and above */}
            <NavLink to="/login" className="block">
              <Button gradientMonochrome="info" className="w-full">
                Sign In
              </Button>
            </NavLink>
            <NavLink to="/register" className="block mt-2">
              <Button gradientMonochrome="success" className="w-full">
                Sign Up
              </Button>
            </NavLink>
          </div>
        )}
      </FlowbiteNavbar.Collapse>

      {/* Navigation Links End */}
    </FlowbiteNavbar>
  );
};

export default Navbar;
