import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders", user],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);

      return res.data;
    },
  });
  console.log(orders);

  const handleCancelOrder = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axiosSecure.patch(`/orders/cancel/${id}`).then((res) => {
        if (res.data.modifiedCount) {
          if (result.isConfirmed) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been canceled.",
              icon: "success",
            });
          }
        }
      });
    });
  };
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">
        <span className="text-yellow-400">Pending</span> Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Order ID </th>
              <th>User </th>
              <th>Product </th>
              <th>status</th>
              <th>payment</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td className="font-bold">{order.product}</td>
                  <td
                    className={
                      order.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {order.status}
                  </td>
                  <td>{order.createdAt}</td>
                  <td className="flex gap-2">
                    <Link
                      className="btn bg-yellow-200 hover:bg-yellow-300"
                      to={`/dashboard/view-trackings/${order._id}`}
                    >
                      View
                    </Link>
                    <button
                      className="btn bg-red-400 hover:bg-red-500 text-white"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel Order
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

export default MyOrders;
