import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import { ToastContainer } from "react-toastify";
import Posts from "../components/Posts";

const Dashboard = () => {
  const location = useLocation();
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ToastContainer />
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      {tab === "profile" && <DashboardProfile />}
      {tab === "posts" && <Posts />}
    </div>
  );
};

export default Dashboard;
