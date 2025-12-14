import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useTheme from "../../../Hooks/useTheme";
import useAuth from "../../../Hooks/useAuth";
const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const [searchText, setSearch] = useState("");
  const { user } = useAuth();
  const { theme } = useTheme();
  const {
    loading,
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["products", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?searchText=${searchText}&email=${user.email}`
      );

      return res.data;
    },
  });
  const handleUpdate = (product) => {
    navigate("/dashboard/update-product", { state: { product } });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axiosSecure.delete(`/products/${id}`).then((res) => {
        if (res.data.deletedCount) {
          if (result.isConfirmed) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="font-bold text-4xl mb-3">
        <span className="text-yellow-500">manage</span> products
      </h2>
      {/* search input */}
      <label className="input mb-3">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          required
          placeholder="Search"
        />
      </label>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={product.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <th>
                    {product.productTitle}
                    <br />
                  </th>
                  <td>{product.price}</td>
                  <td
                    className={
                      product.paymentOptions === "online"
                        ? "text-green-400"
                        : "text-yellow-600"
                    }
                  >
                    {product.paymentOptions}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className={`btn bg-amber-300 hover:bg-amber-400 ${
                        theme === "dark" && "text-black"
                      }`}
                      onClick={() => handleUpdate(product)}
                    >
                      Updata
                    </button>
                    <button
                      className="btn bg-red-400 text-white"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
