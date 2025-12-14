import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="spinner-container relative w-16 h-16">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="spinner-blade absolute left-1/2 bottom-0 w-[0.18rem] h-[1.3rem] rounded-full"
            style={{
              backgroundColor: "#CBD5E1",
              transformOrigin: "center -2rem",
              transform: `rotate(${i * 30}deg)`,
              animation: `spinnerFade 1.2s linear infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
          Loading...
        </div>
      </div>

      <style>
        {`
        /* Custom Keyframes for the fading effect */
        @keyframes spinnerFade {
          0%, 39%, 100% { 
            background-color: #CBD5E1; /* Lighter/Initial Color */
            opacity: 1; 
          }
          40% { 
            background-color: #64748B; /* Darker/Faded Color (slate-600) */
            opacity: 0.2; 
          }
        }
        `}
      </style>
    </div>
  );
};

export default Loading;
