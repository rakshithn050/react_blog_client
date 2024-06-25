import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { HiArrowSmallRight } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
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
            onClick={() => handleNavigation("/signout")}
          >
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
