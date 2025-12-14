// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import { useParams } from "react-router";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const ViewTracking = () => {
//   const params = useParams();
//   const axiosSecure = useAxiosSecure();

//   const { data: tracking = [] } = useQuery({
//     queryKey: ["users", params],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/trackings/${params.id}`);
//       return res.data;
//     },
//   });

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Order Tracking Details
//       </h2>

//       <div className="bg-white shadow-lg rounded-2xl p-6">
//         {tracking.length === 0 ? (
//           <p className="text-gray-500 text-center">
//             No tracking updates available.
//           </p>
//         ) : (
//           <div className="space-y-4">
//             {tracking.map((item, index) => (
//               <div
//                 key={index}
//                 className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-lg">{item.status}</p>
//                   <span className="text-sm text-gray-500">
//                     {new Date(item.dateTime).toLocaleString()}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mt-1">{item.note}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewTracking;

// export default function ViewTrackingUI({ tracking = [] }) {
//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Order Tracking Details
//       </h2>

//       <div className="bg-white shadow-lg rounded-2xl p-6">
//         {tracking.length === 0 ? (
//           <p className="text-gray-500 text-center">
//             No tracking updates available.
//           </p>
//         ) : (
//           <div className="space-y-4">
//             {tracking.map((item, index) => (
//               <div
//                 key={index}
//                 className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-lg">{item.status}</p>
//                   <span className="text-sm text-gray-500">
//                     {new Date(item.dateTime).toLocaleString()}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mt-1">{item.note}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// new

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// Import icons from Lucide React
import {
  Package,
  Truck,
  CheckCircle,
  ClipboardList,
  Loader2,
  MapPin,
} from "lucide-react";

// The icon size and color props will be passed via className

const getStatusIcon = (status) => {
  const lowerStatus = status ? status.toLowerCase() : "";
  if (lowerStatus.includes("placed") || lowerStatus.includes("confirmed")) {
    return <ClipboardList className="w-5 h-5 text-yellow-500" />;
  }
  if (lowerStatus.includes("processing") || lowerStatus.includes("preparing")) {
    return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />; // Loader2 as spinner
  }
  if (lowerStatus.includes("shipped") || lowerStatus.includes("transit")) {
    return <Truck className="w-5 h-5 text-yellow-500" />;
  }
  if (lowerStatus.includes("delivered")) {
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  }
  if (lowerStatus.includes("out for delivery")) {
    return <MapPin className="w-5 h-5 text-yellow-500" />; // Added a new specific status
  }
  return <Package className="w-5 h-5 text-gray-400" />;
};

const ViewTracking = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: tracking = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracking", params.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${params.id}`);
      return res.data;
    },
  });

  const sortedTracking = [...tracking].sort(
    (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
  );

  const getCurrentStatus = (updates) => {
    if (updates.length === 0) return "Awaiting Tracking Updates";
    return updates[updates.length - 1].status;
  };

  const currentStatus = getCurrentStatus(sortedTracking);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 p-6 bg-white rounded-xl shadow-md border-b-4 border-yellow-500">
          <h2 className="text-3xl font-extrabold text-gray-800">
            <Package className="inline w-7 h-7 mr-2 text-yellow-600" /> Order
            Tracking
          </h2>
          <p className="mt-2 text-xl text-yellow-600 font-medium">
            Order ID: **{params.id}**
          </p>
          <div className="mt-4 flex items-center space-x-2">
            {getStatusIcon(currentStatus)}
            <span className="text-lg font-semibold text-gray-700">
              Current Status: {currentStatus}
            </span>
          </div>
        </header>

        {isLoading && (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <Loader2 className="w-8 h-8 text-yellow-500 mx-auto animate-spin" />
            <p className="mt-4 text-gray-600 font-medium">
              Loading tracking history...
            </p>
          </div>
        )}

        {isError && (
          <div className="text-center p-10 bg-red-50 rounded-xl shadow-lg border border-red-300">
            <p className="text-red-600 font-semibold">
              Error loading tracking data. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && sortedTracking.length === 0 && (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-lg font-medium">
              No tracking updates available for this order yet.
            </p>
          </div>
        )}

        {!isLoading && !isError && sortedTracking.length > 0 && (
          <div className="relative p-6 bg-white rounded-2xl shadow-xl">
            {/* The Vertical Timeline Line */}
            <div className="absolute left-10 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-200"></div>

            <div className="space-y-12">
              {sortedTracking.map((item, index) => {
                const isLast = index === sortedTracking.length - 1;
                const icon = getStatusIcon(item.status);

                return (
                  <div
                    key={index}
                    className="relative flex items-start md:items-center w-full"
                  >
                    {/* Circle and Line Connector for Mobile/Small Screens */}
                    <div className="block md:hidden absolute left-0 top-0 mt-1 z-10">
                      <div
                        className={`p-2 rounded-full ${
                          isLast
                            ? "bg-yellow-500 shadow-lg"
                            : "bg-white border-2 border-yellow-500"
                        }`}
                      >
                        {React.cloneElement(icon, {
                          className:
                            "w-4 h-4 " +
                            (isLast ? "text-white" : "text-indigo-500"),
                        })}
                      </div>
                    </div>

                    {/* Timeline Item Content */}
                    <div
                      className={`w-full md:w-5/12 p-4 rounded-xl transition-all duration-300 ${
                        isLast
                          ? "bg-indigo-50 border border-indigo-300 shadow-md"
                          : "bg-gray-50"
                      }`}
                      style={{
                        marginLeft:
                          index % 2 !== 0 && window.innerWidth >= 768
                            ? "50%"
                            : "0",
                      }}
                    >
                      <div className="flex flex-col">
                        <p
                          className={`font-bold text-xl ${
                            isLast ? "text-yellow-600" : "text-gray-800"
                          }`}
                        >
                          {item.status}
                        </p>
                        <span
                          className={`text-sm mt-1 ${
                            isLast ? "text-yellow-500" : "text-gray-500"
                          }`}
                        >
                          {new Date(item.dateTime).toLocaleString()}
                        </span>
                        <p
                          className={`mt-2 text-base ${
                            isLast ? "text-yellow-700" : "text-gray-600"
                          }`}
                        >
                          {item.note}
                        </p>
                      </div>
                    </div>

                    {/* Circle and Line Connector for Desktop/Large Screens */}
                    <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 z-10">
                      <div
                        className={`p-2 rounded-full ${
                          isLast
                            ? "bg-yellow-500 shadow-lg ring-4 ring-indigo-200"
                            : "bg-white border-2 border-yellow-500"
                        }`}
                      >
                        {React.cloneElement(icon, {
                          className:
                            "w-5 h-5 " +
                            (isLast ? "text-white" : "text-yellow-500"),
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTracking;
