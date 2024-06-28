import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { HiArrowSmallRight } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";
import { signOutSuccess } from "../store/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl && tabFromUrl === "profile") {
      setTab("profile");
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
            active={tab === "profile"}
            onClick={() => handleNavigation("/dashboard?tab=profile")}
          >
            Profile
          </Sidebar.Item>
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
