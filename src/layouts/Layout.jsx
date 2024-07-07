import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <div className="dark:bg-gray-900">
        <Header />
        <main>
          <ToastContainer />
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
