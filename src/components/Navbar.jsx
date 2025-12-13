import React from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { logOut, user } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All-Products</NavLink>
      </li>

      {user ? (
        ""
      ) : (
        <>
          {" "}
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successful",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => {
        console.log(err);
      });
    Navigate("/login");
  };

  // close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            One Garments Shop
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end relative" ref={menuRef}>
          {/* Profile Image */}
          <img
            src={user?.photoURL}
            alt=""
            onClick={() => setOpen(!open)}
            className="w-14 h-14 rounded-full cursor-pointer border shadow"
          />

          {user && (
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute shadow-lg bg-white rounded-xl p-5 top-16 right-0 w-52 z-50"
                >
                  <p className="text-xl font-bold text-center">
                    {user?.displayName}
                  </p>

                  <button
                    className="btn btn-outline w-full mt-4"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
