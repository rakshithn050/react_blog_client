import React, { useState, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DarkThemeToggle,
  Button,
  Navbar as FlowbiteNavbar,
} from "flowbite-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../store/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Handle sign out action
  const handleSignOut = async () => {
    try {
      const res = await axios.post("/api/user/signout");
      if (res.status !== 200) {
        toast.error("Something went wrong!! Please try again later.");
      } else {
        toast.info("Signing out successfully.");
        setTimeout(() => {
          dispatch(signOutSuccess(res.data));
        }, 1000);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Conditional navigation to search page based on URL search params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    const currentPath = location.pathname;
    const searchPath = "/search";

    if (searchTermFromURL && currentPath !== searchPath) {
      const searchQuery = urlParams.toString();
      navigate(`${searchPath}?${searchQuery}`);
    }
  }, [location, navigate]);

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
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white hidden sm:block">
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
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`bg-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-full md:w-16 sm:w-full `}
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
          <DarkThemeToggle className="mx-3" />

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
                <Link to="/dashboard?tab=profile">Profile</Link>
              </Dropdown.Item>
              {currentUser && currentUser.isAdmin && (
                <>
                  <Dropdown.Item>
                    <Link to="/createPost">Create Post</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/dashboard?tab=settings">Settings</Link>
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="hidden md:flex lg:flex flex-col md:flex-row">
              <NavLink to="/login" className="mx-2">
                <Button gradientMonochrome="info" className="w-full">
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/register" className="mx-2 mt-2 md:mt-0">
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
            to="contact"
            className={({ isActive }) =>
              isActive
                ? "text-purple-900 dark:text-blue-500"
                : "text-blue-500 dark:text-white"
            }
          >
            Contact
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
