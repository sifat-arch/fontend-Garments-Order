import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AllProductsAD = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
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

  const handleToggle = async (id, value) => {
    try {
      await axiosSecure.patch(`/products/home-toggle/${id}`, {
        showOnHome: value,
      });

      refetch();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Product visibility updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);

      // Optional: Error Alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <h2>All Product admin:{products.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>

              <th>Category</th>
              {/* <th>Created By</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
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
                      <div>
                        <div className="font-bold">{product.productTitle}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {product.price}
                    </span>
                  </td>

                  <td>{product.category}</td>
                  {/* <th>{product.}</th> */}
                  <th className="flex gap-2">
                    <button
                      className="btn bg-yellow-300 hover:bg-amber-400"
                      onClick={() => handleUpdate(product)}
                    >
                      Update
                    </button>
                    <button
                      className="btn bg-red-300 hover:bg-red-400"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>

                    <span className="flex items-center">
                      <input
                        type="checkbox"
                        checked={product.showOnHome ? true : false}
                        className="checkbox checkbox-xl"
                        onChange={(e) =>
                          handleToggle(product._id, e.target.checked)
                        }
                      />
                    </span>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsAD;
