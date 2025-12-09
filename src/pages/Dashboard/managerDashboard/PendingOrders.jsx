import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");

      return res.data;
    },
  });

  const updateTheData = async (id, updateFor) => {
    console.log(id, updateFor);

    const res = await axiosSecure.patch(`/orders/${id}`, { status: updateFor });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: `Order ${updateFor}`,
        text: `The order has been ${updateFor} successfully`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleApprove = (id) => {
    updateTheData(id, "approved");
  };
  const handleReject = (id) => {
    updateTheData(id, "rejected");
  };
  return (
    <div>
      <h2>Pending Orders:{orders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Order ID </th>
              <th>User </th>
              <th>Product </th>
              <th>Quantity </th>
              <th>Order Date </th>
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
                  <td>{order.product}</td>
                  <td>{order.orderQuantity}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleApprove(order._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleReject(order._id)}
                    >
                      Reject
                    </button>
                    <Link className="btn" to="/dashboard/order-details">
                      View
                    </Link>
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

export default PendingOrders;
