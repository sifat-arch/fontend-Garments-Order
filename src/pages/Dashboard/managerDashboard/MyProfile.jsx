import { useQuery } from "@tanstack/react-query";
import React from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { data: myData = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/myProfile?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { name, email, photoURL, role, updatedAt, feedback, reason } = myData;
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Profile Page
          </h1>
        </div>
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="absolute top-4 right-4">
              <button
                className="bg-white/90 hover:bg-white text-gray-800 font-medium py-2 px-4 rounded-lg shadow transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <p className="text-gray-600">{role}</p>
                <div className="flex items-center mt-2">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600">Dhaka , Bangladesh</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">127</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">542</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">286</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About Me
              </h3>
              <p className="text-gray-700">
                I am a results-driven Manager with a strong focus on team
                leadership, strategic planning, and efficient workflow
                management. I enjoy solving operational challenges, improving
                productivity, and helping my team achieve both individual and
                organizational goals. With a positive attitude and strong
                communication skills, I aim to create an environment where
                people feel motivated, valued, and supported.
              </p>
            </div>

            {/* Skills/Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Team Leadership
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Team Motivation
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Conflict Resolution
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                  Decision Making
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Delegation
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  Emotional Intelligence
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  TypeScript
                </span>
                <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                  Feedback Handling
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-700">{email}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{updatedAt}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Social Links
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition duration-200"
                  >
                    <span className="font-semibold">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition duration-200"
                  >
                    <span className="font-semibold">t</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-black transition duration-200"
                  >
                    <span className="font-semibold">in</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition duration-200"
                  >
                    <span className="font-semibold">ig</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-black transition duration-200"
                  >
                    <span className="font-semibold">Git</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-purple-600 p-5 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Suspend Details
          </h3>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              <span className="font-medium text-amber-700">Reason:</span>{" "}
              {reason}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              <span className="font-medium text-amber-700">Feedback:</span>{" "}
              {feedback}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
