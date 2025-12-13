import React from "react";
import heroImg from "../../assets/heroImg.jpg";
import { Link } from "react-router";

const HeroBanar = ({ logoUrl, readMoreLink }) => {
  return (
    <div className="w-full mt-2">
      <div className="flex flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden bg-white">
        <div className="lg:w-1/2 p-8 lg:p-12 text-white bg-gray-900 relative flex items-center justify-center min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImg})` }}
          ></div>

          <div className="relative z-10">
            <div className="mb-4">
              {/*  */}
              <img
                src={logoUrl}
                alt="Logo"
                className="h-8 w-auto filter invert"
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

        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-red-500 mb-2">
            SMALL BUSINESS TIPS
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold leading-snug text-gray-900 mb-8">
            Trendy looks + Perfect comfort: Explore premium collections made to
            elevate your everyday look
          </h2>

          <Link to="/all-products" href={readMoreLink} className="w-fit">
            <button className="flex items-center justify-center px-6 py-3 font-semibold text-white font-bold bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition duration-300 rounded-lg">
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
