import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useTheme from "../../Hooks/useTheme"; // <-- import useTheme

const Login = () => {
  const { signInGoogle, signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        if (res.user) {
          navigate(location?.state || "/");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
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

        {/* Google Sign Up Button */}
        <button
          className={`btn mb-4 w-full rounded-lg ${
            theme === "dark"
              ? "bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
              : "bg-white text-black border-[#e5e5e5] hover:bg-gray-100"
          }`}
          onClick={handleGoogleRegister}
        >
          {/* Google SVG */}
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
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
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className={`appearance-none block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-400 focus:border-yellow-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            {errors.email?.type === "required" && (
              <p className="text-sm text-red-500 mt-2">Email is required</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum length is 6" },
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

          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium ${
              theme === "dark"
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "bg-yellow-400 text-white hover:bg-yellow-500"
            }`}
          >
            Login
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
              to="/register"
              className="font-medium text-yellow-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
