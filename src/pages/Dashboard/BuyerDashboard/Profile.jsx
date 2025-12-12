import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, logOut, loading } = useAuth();
  const { data: buyer = {} } = useQuery({
    queryKey: ["users"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/myProfile?email=${user?.email}`
      );
      return res.data;
    },
  });

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
  const { data: userStatus = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/myProfile?email=${user.email}`);

      return res.data;
    },
  });

  console.log(userStatus);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-6 w-lg text-center h-[500px]">
          <h2 className="mb-5 text-4xl font-bold">Buyer Profile</h2>
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <img
              src={buyer.photoURL}
              alt="Student"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-semibold font-semibold mb-3">
            {buyer.name}
          </h2>

          {/* Info */}
          <div className="text-left space-y-1 text-gray-700">
            <p>
              <span className="font-semibold text-xl">Buyer Email:</span>{" "}
              {buyer.email}
            </p>
            <p>
              <span className="font-semibold  text-xl">Role:</span> {buyer.role}
            </p>
            <p>
              <span className="font-semibold  text-xl">Phone:</span>{" "}
              01**********
            </p>
            <button
              className="btn mt-5 w-full bg-blue-500 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-6 w-lg text-center mx-auto">
        <p>
          <span>Suspend reason:</span>
          {userStatus.reason}
        </p>
        <p>
          <span>Feedback:</span>
          {userStatus.feedback}
        </p>
      </div>
    </div>
  );
};

export default Profile;
