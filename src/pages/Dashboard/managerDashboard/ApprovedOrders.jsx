import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const ApprovedOrders = () => {
  const [trackingId, setTrackingId] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const addModelRef = useRef();
  const { register, handleSubmit, reset } = useForm();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=samad@gmail.com`);

      return res.data;
    },
  });

  console.log("samad", orders);

  const onSetTracking = (data) => {
    console.log(data);
    const trackingInfo = {
      ...data,
      orderId: trackingId,
      dateTime: new Date(),
    };

    axiosSecure.post("/trackings", trackingInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
      }
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
              <th>Quantity </th>
              <th> Approved Date</th>
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
                  <td>
                    {order.approvedAt
                      ? new Date(order.approvedAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="flex flex-wrap gap-3">
                    <button
                      className="btn bg-green-300 hover:bg-green-400 text-black"
                      onClick={() => {
                        setTrackingId(order._id);
                        addModelRef.current.showModal();
                      }}
                    >
                      Tracking
                    </button>

                    <dialog ref={addModelRef} id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">
                          <form
                            className="space-y-6 p-6 bg-white rounded-lg shadow-lg"
                            onSubmit={handleSubmit(onSetTracking)}
                          >
                            {/* Status */}
                            <div className="flex flex-col">
                              <label className="mb-2 font-medium text-gray-700">
                                Tracking Status
                              </label>
                              <select
                                {...register("status", { required: true })}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                              >
                                <option value="Shipped">Shipped</option>
                              </select>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col">
                              <label className="mb-2 font-medium text-gray-700">
                                Location
                              </label>
                              <input
                                type="text"
                                placeholder="Enter location"
                                {...register("location")}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-blue-500"
                              />
                            </div>

                            {/* Note */}
                            <div className="flex flex-col">
                              <label className="mb-2 font-medium text-gray-700">
                                Note
                              </label>
                              <textarea
                                placeholder="Add a note..."
                                {...register("note")}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none h-24"
                              />
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-700 transition-colors duration-200 text-bl"
                            >
                              Add Tracking
                            </button>
                          </form>
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <Link
                      className="btn bg-yellow-300 hover:bg-yellow-400 text-black"
                      to={`/dashboard/view-trackings/${order._id}`}
                    >
                      View Tracking
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

export default ApprovedOrders;
