import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInGoogle, signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
          title: "google Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    console.log(data);
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
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
          {/* Logo/Brand Name */}
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-gray-700 tracking-widest">
              IIElevenLabs
            </p>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Create an account
          </h2>

          {/* Google Sign Up Button */}
          <button
            className="btn mb-4 w-full rounded-lg bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleRegister}
          >
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                name="email"
                type="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder=""
              />
              {errors.email?.type === "required" && (
                <p className="text-sm text-red-500 mt-2">Email is required</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
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
                  name="password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                  placeholder=""
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.password.message}
                  </p>
                )}
                {/* Eye Icon placeholder */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"></div>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Login
            </button>
          </form>

          {/* Already Registered Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
