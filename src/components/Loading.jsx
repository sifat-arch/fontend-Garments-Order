import React from "react";

const Loading = () => {
  return (
    <div className="w-10 h-10 fixed inset-0 flex items-center justify-center mx-auto\">
      <div className="spinner center absolute inset-0 m-auto w-full h-full">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="spinner-blade absolute left-[46%] bottom-0 w-[0.3rem] h-[1rem] rounded-sm bg-transparent"
            style={{
              transformOrigin: "center -0.8rem",
              transform: `rotate(${i * 30}deg)`,
              animation: `spinnerFade 1s linear infinite`,
              animationDelay: `${i * 0.083}s`,
            }}
          ></div>
        ))}
      </div>

      <style>
        {`
        @keyframes spinnerFade {
          0% { background-color: #69717d; }
          100% { background-color: transparent; }
        }
        `}
      </style>
    </div>
  );
};

export default Loading;
