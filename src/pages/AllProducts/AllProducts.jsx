import { useQuery } from "@tanstack/react-query";
import React from "react";

import useAxios from "../../Hooks/useAxios";
import ProductCard from "../../components/ProductCard";

const AllProducts = () => {
  const axiosIn = useAxios();

  const { data: products = [] } = useQuery({
    queryKey: ["products" ],
    queryFn: async () => {
      const res = await axiosIn.get("/products");

      return res?.data;
    },
  });

  console.log(products);

  return (
    <div>
      <h2>All products:{products.length}</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-5">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
