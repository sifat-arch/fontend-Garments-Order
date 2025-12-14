// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";

// const Profile = () => {
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { user, logOut, loading } = useAuth();
//   const { data: buyer = {} } = useQuery({
//     queryKey: ["users"],
//     enabled: !loading && !!user,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/users/myProfile?email=${user?.email}`
//       );
//       return res.data;
//     },
//   });

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Logout successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         navigate("/login");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const { data: userStatus = {} } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/myProfile?email=${user.email}`);

//       return res.data;
//     },
//   });

//   return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-xl p-6 w-lg text-center h-[500px]">
//           <h2 className="mb-5 text-4xl font-bold">
//             <span className="text-yellow-400">Buyer</span> Profile
//           </h2>
//           {/* Profile Image */}
//           <div className="flex justify-center mb-4">
//             <img
//               src={buyer.photoURL}
//               alt="Student"
//               className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
//             />
//           </div>

//           {/* Name */}
//           <h2 className="text-2xl font-semibold font-semibold mb-3">
//             {buyer.name}
//           </h2>

//           {/* Info */}
//           <div className="text-left space-y-1 text-gray-700">
//             <p>
//               <span className="font-semibold text-xl">Buyer Email:</span>{" "}
//               {buyer.email}
//             </p>
//             <p>
//               <span className="font-semibold text-gray-700 text-xl">Role:</span>{" "}
//               {buyer.role}
//             </p>
//             <p>
//               <span className="font-semibold text-gray-700 text-xl">
//                 Phone:
//               </span>{" "}
//               01**********
//             </p>
//             <button
//               className="btn mt-5 w-full bg-yellow-400 hover:bg-yellow-500 text-white"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-xl p-6 w-lg text-center mx-auto">
//         <p>
//           <span>Suspend reason:</span>
//           {userStatus.reason}
//         </p>
//         <p>
//           <span>Feedback:</span>
//           {userStatus.feedback}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useTheme from "../../../Hooks/useTheme"; // <-- useTheme import

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, logOut, loading } = useAuth();
  const { theme } = useTheme(); // <-- get current theme

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

  const { data: userStatus = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/myProfile?email=${user.email}`);
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

  // Conditional classes based on theme
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const cardBorder = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`min-h-screen p-4 md:p-8 ${textClass} ${bgClass}`}>
      <div className={`flex items-center justify-center mb-6`}>
        <div
          className={`rounded-xl shadow-xl p-6 w-lg text-center h-[500px] ${bgClass} border ${cardBorder}`}
        >
          <h2 className="mb-5 text-4xl font-bold">
            <span className="text-yellow-400">Buyer</span> Profile
          </h2>
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <img
              src={buyer.photoURL}
              alt="Student"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-semibold mb-3">{buyer.name}</h2>

          {/* Info */}
          <div className="text-left space-y-1">
            <p>
              <span className="font-semibold text-xl">Buyer Email:</span>{" "}
              {buyer.email}
            </p>
            <p>
              <span className="font-semibold text-xl">Role:</span> {buyer.role}
            </p>
            <p>
              <span className="font-semibold text-xl">Phone:</span> 01**********
            </p>
            <button
              className="btn mt-5 w-full bg-yellow-400 hover:bg-yellow-500 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div
        className={`rounded-xl shadow-xl p-6 w-lg text-center mx-auto ${bgClass} border ${cardBorder}`}
      >
        <p>
          <span className="font-semibold">Suspend reason:</span>{" "}
          {userStatus.reason}
        </p>
        <p>
          <span className="font-semibold">Feedback:</span> {userStatus.feedback}
        </p>
      </div>
    </div>
  );
};

export default Profile;
