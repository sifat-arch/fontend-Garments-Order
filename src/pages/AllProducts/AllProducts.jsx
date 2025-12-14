import { useQuery } from "@tanstack/react-query";
import React from "react";

import useAxios from "../../Hooks/useAxios";
import ProductCard from "../../components/ProductCard";
import { useState } from "react";
import Loading from "../../components/Loading";

const AllProducts = () => {
  const axiosIn = useAxios();
  const [totalApps, setTotalApps] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const { loading, data: products = [] } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const res = await axiosIn.get(
        `/productsAll?limit=${limit}&skip=${currentPage * limit}`
      );
      setTotalApps(res.data.total);
      const pages = Math.ceil(res.data.total / limit);
      setTotalPage(pages);
      return res?.data.result;
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-4xl mt-7 ml-1 font-bold text-gre">
        <span className="text-yellow-400">All</span> products :{" "}
        <span className="text-red-400">{totalApps}</span>
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center flex-wrap gap-3 my-5">
        {currentPage > 0 && (
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
        )}

        {[...Array(totalPage).keys()].map((i, index) => (
          <button
            className={`btn ${i === currentPage && "bg-yellow-400"}`}
            key={index}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        ))}

        {currentPage < totalPage - 1 && (
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Prev
          </button>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
