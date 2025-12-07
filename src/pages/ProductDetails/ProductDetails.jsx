import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router";

const ProductDetails = () => {
  const axiosSecure = useAxiosSecure();
  const params = useParams();
  const id = params.id;

  const { data: product = {} } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);

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

            {product.demoVideo && (
              <video controls className="w-full rounded-2xl shadow">
                <source src={product.demoVideo} type="video/mp4" />
              </video>
            )}

            <div className="flex gap-3 overflow-x-auto">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className="w-24 h-24 rounded-xl shadow"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.orderQuantity}
              </p>
              <p>
                <span className="font-semibold">Price:</span> $
                {product.orderPrice}
              </p>
              <p>
                <span className="font-semibold">Available Quantity:</span>{" "}
                {product.maxQuantity}
              </p>
              <p>
                <span className="font-semibold">Minimum Order:</span>{" "}
                {product.minQuantity}
              </p>
            </div>

            {/* Payment Options */}
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Payment Options:</h2>
              <div className="flex flex-wrap gap-2">
                {product.paymentOptions?.map((opt, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <Link to={`/booking/${product._id}`} className="btn w-md">
              Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
