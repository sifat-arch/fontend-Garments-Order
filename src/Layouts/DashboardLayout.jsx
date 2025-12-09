import React from "react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-xl p-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <nav className="flex flex-col gap-2 text-lg">
            <Link className="hover:text-blue-600" to="/">
              Home
            </Link>
            <Link className="hover:text-blue-600" to="/dashboard/my-orders">
              My-Orders
            </Link>
            <Link className="hover:text-blue-600" to="/dashboard/manage-users">
              manage-users
            </Link>
            <Link className="hover:text-blue-600" to="/dashboard/all-products">
              All Products
            </Link>
            <Link className="hover:text-blue-600" to="/dashboard/all-orders">
              All Orders
            </Link>
            <Link className="hover:text-blue-600" to="/dashboard/add-products">
              Add Products
            </Link>

            <Link
              className="hover:text-blue-600"
              to="/dashboard/manage-products"
            >
              Manage Products
            </Link>

            <Link
              className="hover:text-blue-600"
              to="/dashboard/pending-orders"
            >
              Pending Orders
            </Link>
            <Link
              className="hover:text-blue-600"
              to="/dashboard/approved-orders"
            >
              Approved Orders
            </Link>
            <Link className="hover:text-blue-600" to="/dashboard/my-profile">
              My Profile
            </Link>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
