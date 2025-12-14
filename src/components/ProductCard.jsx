import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="mt-6">
      <div className="card bg-white dark:bg-gray-800 w-full md:w-96 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
        <figure className="overflow-hidden rounded-t-2xl">
          <img
            src={
              product.image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={product.title || "Product Image"}
            className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-bold flex justify-between items-center text-gray-900 dark:text-gray-100">
            {product.title || "Card Title"}
            <div className="badge badge-secondary text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {product.availableQuantity ? "AVAILABLE" : "OUT OF STOCK"}
            </div>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {product.description ||
              "A card component has a figure, a body part, and inside body there are title and actions parts"}
          </p>
          <div className="card-actions justify-between items-center mt-4">
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {product.price || 34}
            </p>
            <Link
              to={`/product-details/${product._id}`}
              className="btn bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 rounded-md btn-sm text-white"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
