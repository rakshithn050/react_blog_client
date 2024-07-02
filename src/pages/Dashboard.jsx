import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import { ToastContainer } from "react-toastify";
import Posts from "../components/Posts";
import Users from "../components/Users";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const allowedTabs = ["profile", "posts", "users"];

    if (tabFromUrl && allowedTabs.includes(tabFromUrl)) {
      setTab(tabFromUrl);
    } else {
      setTab("PageNotFound");
    }
  }, [location]);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <ToastContainer />
        <div className="md:w-56">
          <DashboardSidebar />
        </div>
        {tab === "profile" && <DashboardProfile />}
        {tab === "posts" && <Posts />}
        {tab === "users" && <Users />}
        {tab === "PageNotFound" && (
          <p className="w-full h-screen flex justify-center items-center">
            Could not find the page!! Check the url once again
          </p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
