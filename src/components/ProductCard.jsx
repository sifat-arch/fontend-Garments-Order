import React from "react";
import { Link } from "react-router";

const ProductCard = (product) => {
  const { productTitle, price, orderPrice, image, availableQuantity, _id } =
    product.product;

  return (
    <div className="mt-10">
      {/* Card container */}
      <div className="max-w-sm w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        {/* Top Section - Image and Background */}
        <div
          className="relative p-8 pt-12"
          style={{ backgroundColor: "#5D4C8D" }}
        >
          {/* Heart/Wishlist Icon */}

          {/* Product Image */}
          <div className="flex justify-center">
            {/* Note: In a real app, you would import and use a specific image component/tag. 
               Since I cannot use the exact image, I'm using a placeholder logic for positioning. */}
            <img
              src={image}
              alt="Nike Running Shoe"
              className="w-3/4 max-h-40 object-contain rotate-[-5deg] transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Bottom Section - Details */}
        <div className="p-6 rounded-t-xl">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            {productTitle}
          </h2>

          {/* Tags/Sizes */}
          <div className="flex space-x-2 mb-4">
            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded">
              {availableQuantity}
            </span>
            <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
              {price}
            </span>
          </div>

          {/* Price and Add to Cart Button */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">
                {orderPrice}
              </p>
              <p className="text-3xl font-bold text-gray-900">$69.99</p>
            </div>

            <Link to={`/product-details/${_id}`}>
              <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg shadow-indigo-500/50">
                view details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
