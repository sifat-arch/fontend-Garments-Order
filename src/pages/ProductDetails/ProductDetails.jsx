import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";

const ProductDetails = () => {
  const axiosSecure = useAxiosSecure();
  const params = useParams();
  const id = params.id;
  const { user } = useAuth();

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

  return (
    <div>
      <h2>Product details: {}</h2>

      <div className="max-w-5xl mx-auto p-6">
        {/* Product Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img src={product.photo} className="w-full rounded-2xl shadow" />

            {/* {product.demoVideo && (
              <video controls className="w-full rounded-2xl shadow">
                <source src={product.demoVideo} type="video/mp4" />
              </video>
            )} */}

            <div className="flex gap-3 overflow-x-auto">
              <img src={product.image} alt="" />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.productTitle}</h1>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${product.price}
              </p>
              <p>
                <span className="font-semibold">Available Quantity:</span>{" "}
                {product.availableQuantity}
              </p>
              <p>
                <span className="font-semibold">Minimum Order:</span>{" "}
                {product.minimumOrderQuantity}
              </p>
            </div>

            {/* Payment Options */}
            <div className="mt-4 flex gap-2">
              <h2 className="font-semibold mb-2">Payment Options:</h2>
              <span>{product.paymentOptions}</span>
            </div>

            {/* Order Button */}
            {userStatus.status === "suspended" ? (
              ""
            ) : (
              <Link to={`/booking/${product._id}`} className="btn w-md">
                Order
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
