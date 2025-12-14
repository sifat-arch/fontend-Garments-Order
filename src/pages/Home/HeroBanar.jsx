
import React from "react";
import heroImg from "../../assets/heroImg.jpg";
import { Link } from "react-router";
import useTheme from "../../Hooks/useTheme";

const HeroBanar = ({ logoUrl, readMoreLink }) => {
  const { theme } = useTheme();
  console.log(theme);

  // Conditional classes based on theme
  const leftBgClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white";
  const rightBgClass =
    theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900";
  const buttonClass =
    theme === "dark"
      ? "bg-yellow-600 hover:bg-yellow-500 text-gray-900"
      : "bg-yellow-500 hover:bg-yellow-600 text-white";

  return (
    <div className="w-full mt-2">
      <div
        className={`flex flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden`}
      >
        {/* Left side */}
        <div
          className={`lg:w-1/2 p-8 lg:p-12 relative flex items-center justify-center min-h-[300px] ${leftBgClass}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImg})` }}
          ></div>

          <div className="relative z-10 text-center lg:text-left">
            <div className="mb-4">
              <img
                src={logoUrl}
                alt="Logo"
                className={
                  theme === "dark" ? "h-8 w-auto filter invert" : "h-8 w-auto"
                }
              />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Stay ahead of the fashion game: <br /> New arrivals, bold designs,
              and unbeatable comfort
            </h2>

            <p className="text-base font-semibold opacity-75">
              Midjourney Video
            </p>
          </div>
        </div>

        {/* Right side */}
        <div
          className={`lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center ${rightBgClass}`}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-red-500 mb-2">
            SMALL BUSINESS TIPS
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold leading-snug mb-8">
            Trendy looks + Perfect comfort: Explore premium collections made to
            elevate your everyday look
          </h2>

          <Link to="/all-products" href={readMoreLink} className="w-fit">
            <button
              className={`flex items-center justify-center px-6 py-3 font-semibold font-bold rounded-lg transition duration-300 ${buttonClass}`}
            >
              Our Products
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanar;
