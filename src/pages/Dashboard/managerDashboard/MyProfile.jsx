import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useTheme from "../../../Hooks/useTheme"; // <-- theme hook

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { theme } = useTheme(); // <-- theme

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
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <span className="text-yellow-400">Profile</span> Page
          </h1>
        </div>

        {/* Main Profile Card */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden mb-8 ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-100"
          }`}
        >
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-yellow-300 to-yellow-400"></div>

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

            {/* Logout Button */}
            <div className="absolute top-4 right-4">
              <button
                className={`font-medium py-2 px-4 rounded-lg shadow transition duration-200 cursor-pointer ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                    : "bg-white/90 hover:bg-white text-gray-800"
                }`}
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
                <h2
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {name}
                </h2>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  {role}
                </p>
                <div className="flex items-center mt-2">
                  <svg
                    className="w-5 h-5 mr-1"
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
                  <span
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    Dhaka , Bangladesh
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-4">
                <div className="text-center">
                  <div
                    className={
                      theme === "dark"
                        ? "text-xl font-bold text-gray-100"
                        : "text-xl font-bold text-gray-800"
                    }
                  >
                    127
                  </div>
                  <div
                    className={
                      theme === "dark"
                        ? "text-sm text-gray-300"
                        : "text-sm text-gray-600"
                    }
                  >
                    Posts
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={
                      theme === "dark"
                        ? "text-xl font-bold text-gray-100"
                        : "text-xl font-bold text-gray-800"
                    }
                  >
                    542
                  </div>
                  <div
                    className={
                      theme === "dark"
                        ? "text-sm text-gray-300"
                        : "text-sm text-gray-600"
                    }
                  >
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={
                      theme === "dark"
                        ? "text-xl font-bold text-gray-100"
                        : "text-xl font-bold text-gray-800"
                    }
                  >
                    286
                  </div>
                  <div
                    className={
                      theme === "dark"
                        ? "text-sm text-gray-300"
                        : "text-sm text-gray-600"
                    }
                  >
                    Following
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                About Me
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
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
              <h3
                className={`text-lg font-semibold mb-3 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Team Leadership
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Team Motivation",
                  "Conflict Resolution",
                  "Decision Making",
                  "Delegation",
                  "Emotional Intelligence",
                  "TypeScript",
                  "Feedback Handling",
                ].map((skill) => (
                  <span
                    key={skill}
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-100"
                        : skill.includes("TypeScript")
                        ? "bg-indigo-100 text-indigo-800"
                        : skill.includes("Decision")
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      {updatedAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Social Links
                </h3>
                <div className="flex space-x-4">
                  {["f", "t", "in", "ig", "Git"].map((s, i) => (
                    <a
                      key={i}
                      href="#"
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition duration-200 ${
                        i === 0
                          ? "bg-blue-600 hover:bg-blue-700"
                          : i === 1
                          ? "bg-blue-400 hover:bg-blue-500"
                          : i === 2 || i === 4
                          ? "bg-gray-800 hover:bg-black"
                          : "bg-pink-600 hover:bg-pink-700"
                      }`}
                    >
                      <span className="font-semibold">{s}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suspend Details */}
        <div
          className={`w-full mx-auto rounded-xl p-5 space-y-3 ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700 text-gray-100"
              : "bg-white border border-yellow-600 text-gray-900"
          }`}
        >
          <h3 className="text-lg font-semibold">Suspend Details</h3>
          <div
            className={`p-3 rounded-lg border ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p>
              <span className="font-medium text-amber-700">Reason:</span>{" "}
              {reason}
            </p>
          </div>
          <div
            className={`p-3 rounded-lg border ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p>
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
