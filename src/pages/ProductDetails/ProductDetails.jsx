import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../components/Loading";

const ProductDetails = () => {
  const axiosSecure = useAxiosSecure();
  const params = useParams();
  const id = params.id;
  const { user, loading } = useAuth();

  const { data: product = {} } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { data: userStatus = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/myProfile?email=${user.email}`);
      return res.data;
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 1. Product Media */}
          <div className="flex-1 space-y-4">
            {/* Main Product Photo */}
            <img
              src={product.image}
              alt={product.productTitle}
              className="h-20 w-20 rounded-2xl shadow-lg object-cover"
            />

            {/* Thumbnail/Secondary Images */}
            <div className="flex gap-3 overflow-x-auto p-1">
              <img
                src={product.image}
                alt="Product thumbnail"
                className="object-cover rounded-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition"
              />
              {/* Add more images here if available */}
            </div>
          </div>

          <div className="flex-1 space-y-6 md:mt-0">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              {product.productTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Details Table/List */}
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h2 className="text-xl font-bold text-yellow-600">
                Product Specifications
              </h2>
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Category:
                </span>{" "}
                {product.category}
              </p>
              <p className="text-green-600 text-2xl font-bold">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Price:
                </span>{" "}
                ${product.price}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Available Quantity:
                </span>{" "}
                {product.availableQuantity} units
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Minimum Order:
                </span>{" "}
                {product.minimumOrderQuantity} units
              </p>
            </div>

            {/* Payment Options */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold mb-2 text-xl text-gray-900 dark:text-gray-100">
                Payment Options:
              </h2>
              <span
                className={
                  product.paymentOptions === "online"
                    ? "text-green-700 dark:text-green-400"
                    : "text-yellow-700 dark:text-yellow-400"
                }
              >
                {product.paymentOptions}
              </span>
            </div>

            {/* Order Button */}
            <div className="mt-6">
              {userStatus.status === "suspended" ? (
                <p className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 p-3 rounded-lg font-semibold">
                  Your account is suspended. Ordering is not available.
                </p>
              ) : (
                <Link
                  to={`/booking/${product._id}`}
                  className="inline-block bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                >
                  Place Order Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
