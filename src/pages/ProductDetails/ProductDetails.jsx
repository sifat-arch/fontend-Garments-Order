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
    // <div>
    //   <div className="max-w-5xl mx-auto p-6">
    //     {/* Product Media */}
    //     <div className="flex flex-col md:flex-row gap-6">
    //       <div className="flex-1 not-open:space-y-4">
    //         <img src={product.photo} className="w-full rounded-2xl shadow" />

    //         {/* {product.demoVideo && (
    //           <video controls className="w-full rounded-2xl shadow">
    //             <source src={product.demoVideo} type="video/mp4" />
    //           </video>
    //         )} */}

    //         <div className="flex gap-3 overflow-x-auto">
    //           <img src={product.image} alt="" />
    //         </div>
    //       </div>

    //       {/* Product Info */}
    //       <div className="flex-1 space-y-4 mt-4">
    //         <h1 className="text-3xl font-bold">{product.productTitle}</h1>
    //         <p className="text-gray-700 leading-relaxed">
    //           {product.description}
    //         </p>

    //         <div className="space-y-2">
    //           <p>
    //             <span className="font-semibold">Category:</span>{" "}
    //             {product.category}
    //           </p>
    //           <p>
    //             <span className="font-semibold">Price:</span> ${product.price}
    //           </p>
    //           <p>
    //             <span className="font-semibold">Available Quantity:</span>{" "}
    //             {product.availableQuantity}
    //           </p>
    //           <p>
    //             <span className="font-semibold">Minimum Order:</span>{" "}
    //             {product.minimumOrderQuantity}
    //           </p>
    //         </div>

    //         {/* Payment Options */}
    //         <div className="mt-4 flex gap-2">
    //           <h2 className="font-semibold mb-2">Payment Options:</h2>
    //           <span>{product.paymentOptions}</span>
    //         </div>

    //         {/* Order Button */}
    //         {userStatus.status === "suspended" ? (
    //           ""
    //         ) : (
    //           <Link to={`/booking/${product._id}`} className="btn w-md">
    //             Order
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className=" min-h-screen py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
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
                className=" object-cover rounded-md border border-gray-200 cursor-pointer hover:border-blue-500 transition"
              />
              {/* Add more images here if available */}
            </div>
          </div>

          <div className="flex-1 space-y-6 md:mt-0">
            {" "}
            <h1 className="text-4xl font-extrabold text-gray-900 border-b border-gray-200 pb-2">
              {product.productTitle}
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
            {/* Details Table/List */}
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-bold text-blue-700">
                Product Specifications
              </h2>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">Category:</span>{" "}
                {product.category}
              </p>
              <p className="text-green-600 text-2xl font-bold">
                <span className="font-semibold text-gray-800">Price:</span> $
                {product.price}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Available Quantity:
                </span>{" "}
                {product.availableQuantity} units
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Minimum Order:
                </span>{" "}
                {product.minimumOrderQuantity} units
              </p>
            </div>
            {/* Payment Options */}
            <div className="pt-4 border-t border-gray-200">
              <h2 className="font-semibold mb-2 text-xl text-gray-900">
                Payment Options:
              </h2>
              <span className="text-gray-700">{product.paymentOptions}</span>
            </div>
            {/* Order Button */}
            <div className="mt-6">
              {userStatus.status === "suspended" ? (
                <p className="bg-red-100 text-red-700 p-3 rounded-lg font-semibold">
                  Your account is suspended. Ordering is not available.
                </p>
              ) : (
                <Link
                  to={`/booking/${product._id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
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
