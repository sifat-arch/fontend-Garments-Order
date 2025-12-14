import React, { useEffect, useState } from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchText, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrders = async () => {
      const url = filterStatus ? `/orders?status=${filterStatus}` : "/orders";
      const res = await axiosSecure.get(url);
      setOrders(res.data);
    };
    fetchOrders();
  }, [filterStatus, axiosSecure]);

  const { data: searchOrders = [] } = useQuery({
    queryKey: ["searchOrders", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/searchOrders?searchText=${searchText}`
      );

      return res.data;
    },
  });

  const displayOrders = searchOrders?.length > 0 ? searchOrders : orders;

  return (
    <div>
      <h2>All Orders:{orders.length}</h2>

      <div className="flex justify-between">
        <label className="input">
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

        {/* Filter dropdown */}
        <select
          className="border border-gray-400 p-2 mb-4 "
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

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
            {displayOrders.map((order, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <th>{order.productTitle}</th>
                  <td>{order.orderQuantity}</td>
                  <td
                    className={
                      order.paymentStatus === "paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {order.paymentStatus}
                  </td>
                  <td>
                    <Link
                      className="btn bg-yellow-300 hover:bg-yellow-400"
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
