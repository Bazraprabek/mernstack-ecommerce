import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function UserLayout({ isAuth, isAdmin }) {
  return (
    <>
      <Navbar isAuth={isAuth} isAdmin={isAdmin} />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout;
