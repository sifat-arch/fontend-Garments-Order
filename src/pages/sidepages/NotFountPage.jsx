import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="flex items-center space-x-4">
        <p className="text-5xl font-light border-r border-gray-500 pr-4">404</p>

        <p className="text-lg">This page could not be found.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
