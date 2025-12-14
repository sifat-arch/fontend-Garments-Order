import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const TrackOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-center md:text-left">
        <span className="text-yellow-400">My</span> Orders
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">No</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2 text-sm">{i + 1}</td>
                <td className="px-4 py-2 text-sm font-semibold">
                  {order?.productTitle}
                </td>
                <td className="px-4 py-2 text-sm">{order?.email}</td>
                <td className="px-4 py-2 text-sm break-words">{order?._id}</td>
                <td className="px-4 py-2">
                  <Link
                    className="inline-block bg-yellow-200 hover:bg-yellow-300 text-black rounded text-sm py-1 px-2 text-center transition"
                    to={`/dashboard/view-trackings/${order?._id}`}
                  >
                    Track Your Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
          No orders found.
        </p>
      )}
    </div>
  );
};

export default TrackOrder;
