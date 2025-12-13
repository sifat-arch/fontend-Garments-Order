import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: orders = [], refetch } = useQuery({
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
      refetch();
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

  const { data: userStatus = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/myProfile?email=${user.email}`);

      return res.data;
    },
  });

  console.log(userStatus);
  return (
    <div>
      <h2 className="font-bold text-4xl mb-3">
        <span className="text-yellow-400 ">Pending</span> Orders
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
              <th>Quantity </th>
              <th>Status</th>
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
                  <th>{order.user}</th>
                  <td>{order.productTitle}</td>
                  <td>{order.orderQuantity}</td>
                  <td
                    className={
                      order.status === "approved"
                        ? "text-green-500"
                        : order.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {order.status}
                  </td>
                  <td>
                    {order.approvedAt
                      ? new Date(order.approvedAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="flex flex-wrap gap-3">
                    {userStatus.status === "suspended" ? (
                      ""
                    ) : (
                      <button
                        className="btn bg-green-300 hover:bg-green-400"
                        onClick={() => handleApprove(order._id)}
                      >
                        Approve
                      </button>
                    )}

                    {userStatus.status === "suspended" ? (
                      ""
                    ) : (
                      <button
                        className="btn  bg-red-300 hover:bg-red-400"
                        onClick={() => handleReject(order._id)}
                      >
                        Reject
                      </button>
                    )}

                    <Link
                      className="btn  bg-yellow-300 hover:bg-yellow-400"
                      to="/dashboard/order-details"
                    >
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
