import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiDocumentDuplicate, HiUser } from "react-icons/hi";
import { HiArrowSmallRight } from "react-icons/hi2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signOutSuccess } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { CiSettings } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl && tabFromUrl === "profile") {
      setTab("profile");
    }
    if (tabFromUrl && tabFromUrl === "posts") {
      setTab("posts");
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
          <Sidebar.Item
            icon={HiUser}
            className="cursor-pointer"
            label={currentUser.isAdmin ? "Admin" : `User`}
            active={tab === "profile"}
            onClick={() => handleNavigation("/dashboard?tab=profile")}
          >
            Profile
          </Sidebar.Item>
          {currentUser && currentUser.isAdmin && (
            <>
              <Sidebar.Item
                icon={HiDocumentDuplicate}
                className="cursor-pointer"
                active={tab === "posts"}
                onClick={() => handleNavigation("/dashboard?tab=posts")}
              >
                Posts
              </Sidebar.Item>
              <Sidebar.Item
                icon={MdOutlineSpaceDashboard}
                className="cursor-pointer"
                active={tab === "create-post"}
                onClick={() => handleNavigation("/create-post")}
              >
                Create Post
              </Sidebar.Item>
              <Sidebar.Item
                icon={CiSettings}
                className="cursor-pointer"
                active={tab === "settings"}
                onClick={() => handleNavigation("/settings")}
              >
                Settings
              </Sidebar.Item>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmallRight}
            className="cursor-pointer"
            onClick={() => {
              handleSignOut();
            }}
          >
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
