// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router";
// import useRole from "../Hooks/useRole";
// import {
//   Home,
//   Users,
//   Package,
//   ShoppingCart,
//   PlusCircle,
//   ClipboardList,
//   Clock,
//   CheckCircle,
//   User,
//   Truck,
// } from "lucide-react";

// const DashboardLayout = () => {
//   const { role } = useRole();
//   const [open, setOpen] = useState(false);

//   const baseLinkClasses =
//     "w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors duration-200";

//   const activeLinkClasses = "bg-yellow-400 text-white font-semibold";

//   const linkClass = ({ isActive }) =>
//     `${baseLinkClasses} ${isActive ? activeLinkClasses : "hover:bg-gray-200"}`;

//   return (
//     <div className="min-h-screen flex bg-gray-100 relative">
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static z-40 w-64 bg-white shadow-xl p-6 flex flex-col gap-6
//         transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       >
//         <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

//         <nav className="flex flex-col gap-2 text-lg">
//           <NavLink to="/" className={linkClass}>
//             <Home size={20} />
//             Home
//           </NavLink>

//           {role === "admin" && (
//             <>
//               <NavLink to="/dashboard/manage-users" className={linkClass}>
//                 <Users size={20} />
//                 Manage Users
//               </NavLink>
//               <NavLink to="/dashboard/all-products" className={linkClass}>
//                 <Package size={20} />
//                 All Products
//               </NavLink>
//               <NavLink to="/dashboard/all-orders" className={linkClass}>
//                 <ShoppingCart size={20} />
//                 All Orders
//               </NavLink>
//             </>
//           )}

//           {role === "manager" && (
//             <>
//               <NavLink to="/dashboard/add-products" className={linkClass}>
//                 <PlusCircle size={20} />
//                 Add Products
//               </NavLink>
//               <NavLink to="/dashboard/manage-products" className={linkClass}>
//                 <ClipboardList size={20} />
//                 Manage Products
//               </NavLink>
//               <NavLink to="/dashboard/pending-orders" className={linkClass}>
//                 <Clock size={20} />
//                 Pending Orders
//               </NavLink>
//               <NavLink to="/dashboard/approved-orders" className={linkClass}>
//                 <CheckCircle size={20} />
//                 Approved Orders
//               </NavLink>
//               <NavLink to="/dashboard/my-profile" className={linkClass}>
//                 <User size={20} />
//                 My Profile
//               </NavLink>
//             </>
//           )}

//           {role === "buyer" && (
//             <>
//               <NavLink to="/dashboard/my-orders" className={linkClass}>
//                 <ShoppingCart size={20} />
//                 My Orders
//               </NavLink>
//               <NavLink to="/dashboard/track-order" className={linkClass}>
//                 <Truck size={20} />
//                 Track Orders
//               </NavLink>
//               <NavLink to="/dashboard/buyer-profile" className={linkClass}>
//                 <User size={20} />
//                 Profile
//               </NavLink>
//             </>
//           )}
//         </nav>
//       </aside>

//       <div className="flex-1 w-full">
//         <div className="lg:hidden bg-white shadow px-4 py-3 flex items-center gap-3">
//           <button onClick={() => setOpen(true)} className="text-2xl font-bold">
//             ☰
//           </button>
//           <h3 className="text-xl font-semibold">Dashboard</h3>
//         </div>

//         <main className="p-4 md:p-8 bg-gray-50 min-h-screen">
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
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  PlusCircle,
  ClipboardList,
  Clock,
  CheckCircle,
  User,
  Truck,
} from "lucide-react";

const DashboardLayout = () => {
  const { role } = useRole();
  const [open, setOpen] = useState(false);

  const baseLinkClasses =
    "w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors duration-200";

  const activeLinkClasses = "bg-yellow-400 text-white font-semibold";

  const linkClass = ({ isActive }) =>
    `${baseLinkClasses} ${
      isActive ? activeLinkClasses : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 relative">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 w-64 bg-white dark:bg-gray-800 shadow-xl dark:shadow-black/30 p-6 flex flex-col gap-6
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-2 text-lg">
          <NavLink to="/" className={linkClass}>
            <Home size={20} />
            Home
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users" className={linkClass}>
                <Users size={20} />
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/all-products" className={linkClass}>
                <Package size={20} />
                All Products
              </NavLink>
              <NavLink to="/dashboard/all-orders" className={linkClass}>
                <ShoppingCart size={20} />
                All Orders
              </NavLink>
            </>
          )}

          {role === "manager" && (
            <>
              <NavLink to="/dashboard/add-products" className={linkClass}>
                <PlusCircle size={20} />
                Add Products
              </NavLink>
              <NavLink to="/dashboard/manage-products" className={linkClass}>
                <ClipboardList size={20} />
                Manage Products
              </NavLink>
              <NavLink to="/dashboard/pending-orders" className={linkClass}>
                <Clock size={20} />
                Pending Orders
              </NavLink>
              <NavLink to="/dashboard/approved-orders" className={linkClass}>
                <CheckCircle size={20} />
                Approved Orders
              </NavLink>
              <NavLink to="/dashboard/my-profile" className={linkClass}>
                <User size={20} />
                My Profile
              </NavLink>
            </>
          )}

          {role === "buyer" && (
            <>
              <NavLink to="/dashboard/my-orders" className={linkClass}>
                <ShoppingCart size={20} />
                My Orders
              </NavLink>
              <NavLink to="/dashboard/track-order" className={linkClass}>
                <Truck size={20} />
                Track Orders
              </NavLink>
              <NavLink to="/dashboard/buyer-profile" className={linkClass}>
                <User size={20} />
                Profile
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      <div className="flex-1 w-full">
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow dark:shadow-black/20 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            ☰
          </button>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Dashboard
          </h3>
        </div>

        <main className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
