import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const OrderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: order = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-yellow-500">Loading order...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading order</p>
    );

  const statusBadge = (text, color) => (
    <span
      className={`px-3 py-1 text-sm font-semibold rounded-full bg-${color}-100 text-${color}-800`}
    >
      {text.toUpperCase()}
    </span>
  );

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
          <span className="text-yellow-400">Order</span> Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <p className="text-gray-600 font-medium mb-2">Order ID</p>
            <p className="text-gray-900 font-semibold">{order._id}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <p className="text-gray-600 font-medium mb-2">Customer</p>
            <p className="text-gray-900 font-semibold">{order.user}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <p className="text-gray-600 font-medium mb-2">Email</p>
            <p className="text-yellow-500 font-semibold truncate">
              {order.email}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <p className="text-gray-600 font-medium mb-2">Product</p>
            <p className="text-gray-900 font-semibold">{order.productTitle}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <p className="text-gray-600 font-medium mb-2">Quantity</p>
            <p className="text-gray-900 font-semibold">{order.orderQuantity}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition">
            <p className="text-gray-600 font-medium mb-2">Price</p>
            <p className="text-gray-900 font-semibold">${order.orderPrice}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 flex items-center justify-between">
            <p className="text-gray-600 font-medium">Status</p>
            {statusBadge(order.status, "yellow")}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 flex items-center justify-between">
            <p className="text-gray-600 font-medium">Payment Status</p>
            {statusBadge(order.paymentStatus, "yellow")}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <p className="text-gray-600 font-medium mb-2">Order Placed</p>
            <p className="text-gray-900 font-semibold">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {order.approvedAt && (
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
              <p className="text-gray-600 font-medium mb-2">Approved At</p>
              <p className="text-gray-900 font-semibold">
                {new Date(order.approvedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
