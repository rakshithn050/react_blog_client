import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiDocumentDuplicate, HiUser, HiUsers } from "react-icons/hi";
import { HiArrowSmallRight } from "react-icons/hi2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signOutSuccess } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { CiSettings } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl && tabFromUrl === "stats") {
      setTab("stats");
    }
    if (tabFromUrl && tabFromUrl === "profile") {
      setTab("profile");
    }
    if (tabFromUrl && tabFromUrl === "posts") {
      setTab("posts");
    }
    if (tabFromUrl && tabFromUrl === "users") {
      setTab("users");
    }
    if (tabFromUrl && tabFromUrl === "comments") {
      setTab("comments");
    }
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {currentUser && (
            <Sidebar.Item
              icon={HiUser}
              className="cursor-pointer"
              label={currentUser?.isAdmin ? "Admin" : `User`}
              active={tab === "profile"}
              onClick={() => handleNavigation("/dashboard?tab=profile")}
            >
              Profile
            </Sidebar.Item>
          )}
          <Sidebar.Item
            icon={HiDocumentDuplicate}
            className="cursor-pointer"
            active={tab === "posts"}
            onClick={() => handleNavigation("/dashboard?tab=posts")}
          >
            Posts
          </Sidebar.Item>
          {currentUser && currentUser.isAdmin && (
            <>
              <Sidebar.Item
                icon={FaChartBar}
                className="cursor-pointer"
                active={tab === "stats"}
                onClick={() => handleNavigation("/dashboard?tab=stats")}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                icon={MdOutlineSpaceDashboard}
                className="cursor-pointer"
                active={tab === "createPost"}
                onClick={() => handleNavigation("/createPost")}
              >
                Create Post
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiUsers}
                className="cursor-pointer"
                active={tab === "users"}
                onClick={() => handleNavigation("/dashboard?tab=users")}
              >
                Users
              </Sidebar.Item>
              <Sidebar.Item
                icon={BiMessageDetail}
                className="cursor-pointer"
                active={tab === "comments"}
                onClick={() => handleNavigation("/dashboard?tab=comments")}
              >
                Comments
              </Sidebar.Item>
            </>
          )}
          {currentUser && (
            <Sidebar.Item
              icon={HiArrowSmallRight}
              className="cursor-pointer"
              onClick={() => {
                handleSignOut();
              }}
            >
              SignOut
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
