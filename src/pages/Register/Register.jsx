// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const Register = () => {
//   const { signInGoogle, registerUser, updateUserProfile, user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosSecure = useAxiosSecure();

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const handleGoogleRegister = () => {
//     signInGoogle()
//       .then(() => {
//         navigate(location?.state || "/");

//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Google Login successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         //  add to the databse
//         axiosSecure
//           .post("/users", {
//             name: user.displayName,
//             email: user.email,
//             role: "buyer",
//             photoURL: user.photoURL,
//           })
//           .then((res) => {
//             if (res.data.insertedId) {
//               console.log("user created in the database");
//             }
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   //  test 2
//   const onSubmit = async (data) => {
//     try {
//       const imageFile = data.photo[0];

//       //  Register user
//       const res = await registerUser(data.email, data.password);
//       console.log("User registered:", res.user);

//       // Upload image
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const url = `https://api.imgbb.com/1/upload?&key=${
//         import.meta.env.VITE_image_host
//       }`;
//       const imgRes = await axios.post(url, formData);

//       const photoURL = imgRes.data.data.url;

//       // Update user profile (Firebase)
//       const userProfile = {
//         displayName: data.name,
//         photoURL: photoURL,
//       };

//       await updateUserProfile(userProfile);
//       console.log("User profile updated");

//       // Save user to database
//       const dbRes = await axiosSecure.post("/users", {
//         name: data.name,
//         email: data.email,
//         role: data.role,
//         photoURL: photoURL,
//       });

//       if (dbRes.data.insertedId) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Register successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }

//       // redirect
//       navigate(location.state || "/");
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };

//   // const onSubmit = (data) => {
//   //   const imageFile = data.photo[0];
//   //   registerUser(data.email, data.password)
//   //     .then((res) => {
//   //       console.log(res.user);

//   //       // create formData for axios

//   //       const formData = new FormData();
//   //       formData.append("image", imageFile);

//   //       //  upload the image to imgbb via axios

//   //       const url = `https://api.imgbb.com/1/upload?&key=${
//   //         import.meta.env.VITE_image_host
//   //       }`;

//   //       axios.post(url, formData).then((res) => {
//   //         // updata the user profile

//   //         const userProfile = {
//   //           displayName: data.name,
//   //           photoURL: res.data.data.url,
//   //         };

//   //         updateUserProfile(userProfile)
//   //           .then(() => {
//   //             console.log("user Profile updated done");
//   //             navigate(location.state || "/");
//   //           })

//   //           .catch((err) => {
//   //             console.log(err);
//   //           });
//   //       });

//   //       //  save/post users info in data base

//   //       axiosSecure
//   //         .post("/users", {
//   //           name: data.name,
//   //           email: data.email,
//   //           role: data.role,
//   //           photoURL: photoURL,
//   //         })
//   //         .then((res) => {
//   //           if (res.data.insertedId) {
//   //             console.log("user created in the database");
//   //             Swal.fire({
//   //               position: "top-end",
//   //               icon: "success",
//   //               title: "Register successful",
//   //               showConfirmButton: false,
//   //               timer: 1500,
//   //             });
//   //           }
//   //         });
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // };

//   //
//   return (
//     <div>
//       <h2>Register</h2>
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
//             <span className="text-yellow-400">Create</span> an account
//           </h2>

//           {/* Google Sign Up Button */}
//           <button
//             className="btn w-full mb-4 rounded-lg bg-white text-black border-[#e5e5e5]"
//             onClick={handleGoogleRegister}
//             type="button"
//           >
//             {/* Google SVG */}
//             <svg
//               aria-label="Google logo"
//               width="16"
//               height="16"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 512 512"
//             >
//               <g>
//                 <path d="m0 0H512V512H0" fill="#fff"></path>
//                 <path
//                   fill="#34a853"
//                   d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
//                 ></path>
//                 <path
//                   fill="#4285f4"
//                   d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
//                 ></path>
//                 <path
//                   fill="#fbbc02"
//                   d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
//                 ></path>
//                 <path
//                   fill="#ea4335"
//                   d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
//                 ></path>
//               </g>
//             </svg>
//             Login with Google
//           </button>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Name
//               </label>
//               <input
//                 {...register("name", { required: true })}
//                 name="name"
//                 type="text"
//                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder=""
//               />

//               {errors.name?.type === "required" && (
//                 <p className="text-sm text-red-500 mt-2">Name is required</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="photo"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Photo URL
//               </label>
//               <input
//                 {...register("photo", { required: true })}
//                 name="photo"
//                 type="file"
//                 className="file-input w-full rounded-lg"
//                 placeholder=""
//               />
//               {errors.photo?.type === "required" && (
//                 <p className="text-sm text-red-500 mt-2">Photo is required</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 {...register("email", { required: true })}
//                 name="email"
//                 type="email"
//                 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder=""
//               />
//               {errors.email?.type === "required" && (
//                 <p className="text-sm text-red-500 mt-2">Email is required</p>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("password", {
//                     required: true,
//                     minLength: 6,
//                     pattern: {
//                       value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
//                       message:
//                         "Password must have at least one uppercase and one lowercase letter",
//                     },
//                   })}
//                   name="password"
//                   type="password"
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
//                   placeholder=""
//                 />
//                 {errors.password && (
//                   <p className="text-sm text-red-500 mt-2">
//                     {errors.password.message}
//                   </p>
//                 )}
//                 {/* Eye Icon placeholder */}
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"></div>
//               </div>
//             </div>

//             {/* select */}
//             <div>
//               <select
//                 {...register("role")}
//                 defaultValue="Buyer"
//                 className="select  select-neutral mb-4 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option>Buyer</option>
//                 <option>Manager</option>
//               </select>
//             </div>

//             {/* Sign Up Button */}
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//             >
//               Register
//             </button>
//           </form>

//           {/* Already Registered Link */}
//           <div className="text-center mt-6">
//             <p className="text-sm text-gray-600">
//               Already registered?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-yellow-600 hover:text-indigo-500"
//               >
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTheme from "../../Hooks/useTheme"; // <-- useTheme

const Register = () => {
  const { signInGoogle, registerUser, updateUserProfile, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleGoogleRegister = () => {
    signInGoogle()
      .then(() => {
        navigate(location?.state || "/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Login successful",
          showConfirmButton: false,
          timer: 1500,
        });

        axiosSecure
          .post("/users", {
            name: user.displayName,
            email: user.email,
            role: "buyer",
            photoURL: user.photoURL,
          })
          .then((res) => {
            if (res.data.insertedId) console.log("user created in DB");
          });
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data) => {
    try {
      const imageFile = data.photo[0];
      const res = await registerUser(data.email, data.password);

      const formData = new FormData();
      formData.append("image", imageFile);
      const url = `https://api.imgbb.com/1/upload?&key=${
        import.meta.env.VITE_image_host
      }`;
      const imgRes = await axios.post(url, formData);
      const photoURL = imgRes.data.data.url;

      await updateUserProfile({ displayName: data.name, photoURL });

      const dbRes = await axiosSecure.post("/users", {
        name: data.name,
        email: data.email,
        role: data.role,
        photoURL,
      });

      if (dbRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate(location.state || "/");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-xl ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Title */}
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          <span className="text-yellow-400">Create</span> an account
        </h2>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className={`btn w-full mb-4 rounded-lg ${
            theme === "dark"
              ? "bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
              : "bg-white text-black border-[#e5e5e5] hover:bg-gray-100"
          }`}
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-2">Name is required</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Photo URL
            </label>
            <input
              {...register("photo", { required: true })}
              type="file"
              className={`file-input w-full rounded-lg ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : ""
              }`}
            />
            {errors.photo && (
              <p className="text-sm text-red-500 mt-2">Photo is required</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-2">Email is required</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Password must have at least one uppercase and one lowercase letter",
                },
              })}
              type="password"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <select
              {...register("role")}
              defaultValue="Buyer"
              className={`select select-neutral block w-full px-3 py-2 border rounded-lg shadow-sm sm:text-sm ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            >
              <option>Buyer</option>
              <option>Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium ${
              theme === "dark"
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "bg-yellow-400 text-white hover:bg-yellow-500"
            }`}
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already registered?{" "}
            <Link
              to="/login"
              className="font-medium text-yellow-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
