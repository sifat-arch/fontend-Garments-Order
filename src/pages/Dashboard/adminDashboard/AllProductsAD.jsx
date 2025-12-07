import { useQuery } from "@tanstack/react-query";
import React from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllProductsAD = () => {
  const axiosSecure = useAxiosSecure;
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
      return res.data;
    },
  });
  return (
    <div>
      <h2>All Product admin:{products.length}</h2>
    </div>
  );
};

export default AllProductsAD;
