import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import Posts from "../components/Posts";
import Users from "../components/Users";
import UserComments from "../components/UserComments";
import DashboardStats from "../components/DashboardStats";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("posts");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const allowedTabs = ["stats", "profile", "posts", "users", "comments"];
    if (tabFromUrl && allowedTabs.includes(tabFromUrl)) {
      setTab(tabFromUrl);
    } else {
      setTab("PageNotFound");
    }
  }, [location]);

  useEffect(() => {
    if (
      !currentUser.isAdmin &&
      !["posts", "profile", "PageNotFound"].includes(tab)
    ) {
      setTab("PageNotFound");
    }
  }, [currentUser, tab]);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          <DashboardSidebar />
        </div>
        {tab === "stats" && <DashboardStats />}
        {tab === "profile" && <DashboardProfile />}
        {tab === "posts" && <Posts />}
        {tab === "users" && <Users />}
        {tab === "comments" && <UserComments />}
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
