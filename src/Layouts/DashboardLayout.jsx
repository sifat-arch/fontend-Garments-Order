// import React from "react";
// import { Link, Outlet } from "react-router";
// import useRole from "../Hooks/useRole";

// const DashboardLayout = () => {
//   const { role } = useRole();
//   console.log("role is ", role);

//   return (
//     <div>
//       <div className="min-h-screen flex bg-gray-100">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white shadow-xl p-5 flex flex-col gap-4">
//           <h2 className="text-2xl font-bold">Dashboard</h2>
//           <nav className="flex flex-col gap-2 text-lg">
//             <Link className="hover:text-blue-600" to="/">
//               Home
//             </Link>
//             {/* admin routes */}
//             {role === "admin" && (
//               <>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/manage-users"
//                 >
//                   manage-users
//                 </Link>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/all-products"
//                 >
//                   All Products
//                 </Link>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/all-orders"
//                 >
//                   All Orders
//                 </Link>
//               </>
//             )}

//             {/* manager routes */}
//             {role === "manager" && (
//               <>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/add-products"
//                 >
//                   Add Products
//                 </Link>

//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/manage-products"
//                 >
//                   Manage Products
//                 </Link>

//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/pending-orders"
//                 >
//                   Pending Orders
//                 </Link>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/approved-orders"
//                 >
//                   Approved Orders
//                 </Link>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/my-profile"
//                 >
//                   My Profile
//                 </Link>
//               </>
//             )}

//             {role === "buyer" && (
//               <>
//                 <Link className="hover:text-blue-600" to="/dashboard/my-orders">
//                   My Orders
//                 </Link>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/track-order"
//                 >
//                   Track Orders
//                 </Link>
//                 <Link
//                   className="hover:text-blue-600"
//                   to="/dashboard/buyer-profile"
//                 >
//                   Profile
//                 </Link>
//               </>
//             )}

//             {/* buyer Route */}
//           </nav>
//         </aside>

//         {/* Content Area */}
//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  const [open, setOpen] = useState(false);

  const baseLinkClasses =
    "w-full text-left px-4 py-2 rounded-lg transition-colors duration-200";

  const activeLinkClasses = "bg-yellow-400 text-white font-semibold";

  const linkClass = ({ isActive }) =>
    `${baseLinkClasses} ${isActive ? activeLinkClasses : "hover:bg-gray-200"}`;

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 w-64 bg-white shadow-xl p-6 flex flex-col gap-6
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

        <nav className="flex flex-col gap-2 text-lg">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={linkClass}>
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/all-products" className={linkClass}>
                All Products
              </NavLink>
              <NavLink to="/dashboard/all-orders" className={linkClass}>
                All Orders
              </NavLink>
            </>
          )}

          {role === "manager" && (
            <>
              <NavLink to="/dashboard/add-products" className={linkClass}>
                Add Products
              </NavLink>
              <NavLink to="/dashboard/manage-products" className={linkClass}>
                Manage Products
              </NavLink>
              <NavLink to="/dashboard/pending-orders" className={linkClass}>
                Pending Orders
              </NavLink>
              <NavLink to="/dashboard/approved-orders" className={linkClass}>
                Approved Orders
              </NavLink>
              <NavLink to="/dashboard/my-profile" className={linkClass}>
                My Profile
              </NavLink>
            </>
          )}

          {role === "buyer" && (
            <>
              <NavLink to="/dashboard/my-orders" className={linkClass}>
                My Orders
              </NavLink>
              <NavLink to="/dashboard/track-order" className={linkClass}>
                Track Orders
              </NavLink>
              <NavLink to="/dashboard/buyer-profile" className={linkClass}>
                Profile
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Mobile Topbar */}
        <div className="lg:hidden bg-white shadow px-4 py-3 flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="text-2xl font-bold">
            ☰
          </button>
          <h3 className="text-xl font-semibold">Dashboard</h3>
        </div>

        <main className="p-4 md:p-8 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
