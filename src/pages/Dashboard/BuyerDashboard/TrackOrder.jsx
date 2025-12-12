import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const TrackOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2>My Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>OrderId</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders.map((order, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <th>{order?.productTitle}</th>
                  <td>{order?.email}</td>
                  <td>{order?._id}</td>
                  <td>
                    <Link
                      className="btn"
                      to={`/dashboard/view-trackings/${order?._id}`}
                    >
                      Track Your order
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

export default TrackOrder;
