import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ViewTracking = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();

  console.log(params.id);

  const { data: tracking = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${params.id}`);
      return res.data;
    },
  });

  console.log(tracking);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Order Tracking Details
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        {tracking.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tracking updates available.
          </p>
        ) : (
          <div className="space-y-4">
            {tracking.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">{item.status}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(item.dateTime).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTracking;

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
