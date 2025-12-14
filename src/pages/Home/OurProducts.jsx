import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";

const OurProducts = () => {
  const axiosIn = useAxios();
  const { data: products = [] } = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const res = await axiosIn.get("/products/home");
      return res.data;
    },
  });

  console.log(products, "products");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="mt-6">
          <div className="card bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 w-96 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
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
              <h2 className="card-title text-lg font-bold flex justify-between items-center">
                {product.productTitle || "Card Title"}
                <div className="badge badge-secondary text-sm px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200">
                  {product.availableQuantity ? "AVAILABLE" : "OUT OF STOCK"}
                </div>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {product.description ||
                  "A card component has a figure, a body part, and inside body there are title and actions parts"}
              </p>
              <div className="card-actions justify-between items-center mt-4">
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {product.price || 34}
                </p>
                <Link
                  to={`/product-details/${product._id}`}
                  className="btn bg-yellow-400 hover:bg-amber-500 rounded-md btn-sm dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurProducts;
