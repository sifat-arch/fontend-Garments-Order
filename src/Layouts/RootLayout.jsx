import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
