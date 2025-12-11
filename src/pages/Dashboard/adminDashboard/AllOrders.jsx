import React, { useEffect, useState } from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Backend থেকে ডেটা fetch
    const fetchOrders = async () => {
      const url = filterStatus ? `/orders?status=${filterStatus}` : "/orders";
      const res = await axiosSecure.get(url);
      setOrders(res.data);
    };
    fetchOrders();
  }, [filterStatus]);

  console.log(orders);

  return (
    <div>
      <h2>All Orders:{orders.length}</h2>

      {/* Filter dropdown */}
      <select
        className="border p-2 mb-4"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>NO</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders?.map((order, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{order._id}</td>
                  <td>ROn</td>
                  <td>{order.product}</td>
                  <td>{order.orderQuantity}</td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    <Link
                      className="btn"
                      to={`/dashboard/view-trackings/${order._id}`}
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

export default AllOrders;
