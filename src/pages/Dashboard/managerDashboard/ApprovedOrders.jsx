import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const ApprovedOrders = () => {
  const [trackingId, setTrackingId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const addModelRef = useRef();
  const { register, handleSubmit, reset } = useForm();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");

      return res.data;
    },
  });

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
                  <td>{order.user}</td>
                  <td>{order.product}</td>
                  <td>{order.orderQuantity}</td>
                  <td>{order.approvedAt}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        setTrackingId(order._id);
                        addModelRef.current.showModal();
                      }}
                    >
                      Add Tracking
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
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
                              />
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
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
                      className="btn"
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
