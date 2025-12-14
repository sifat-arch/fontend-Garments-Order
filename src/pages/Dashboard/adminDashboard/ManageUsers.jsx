import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [searchText, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const suspendRef = useRef();
  const { register, handleSubmit } = useForm();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchText],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);

      return res.data;
    },
  });

  // const { data: users = [] } = useQuery({
  //   queryKey: ["users", selectedUser],

  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users`);
  //     return res?.data;
  //   },
  // });

  const handleSuspend = (user) => {
    setSelectedUser(user);
    suspendRef.current.showModal();
  };

  const onSuspendSubmit = async (data) => {
    const res = await axiosSecure.patch(`/users/suspend/${selectedUser._id}`, {
      reason: data.reason,
      feedback: data.feedback,
      status: "suspended",
    });

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Suspend successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    refetch();

    suspendRef.current.close();
  };

  const handleApproveRole = async (id) => {
    const res = await axiosSecure.patch(`/users/approveRole/${id}`);

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "approved as manager",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // const handleUpdateChange = async (e, id) => {
  //   const value = e.target.value;
  //   console.log(id, value);

  //   const res = await axiosSecure.patch(`/users/approveRole/${id}`, {
  //     role: value,
  //   });

  //   if (res.data.modifiedCount) {
  //     alert("Manager approved");
  //   }
  // };

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      if (!filterStatus) {
        setFilteredUsers([]);
        return;
      }

      const res = await axiosSecure.get(`/userFilter?status=${filterStatus}`);
      setFilteredUsers(res.data);
    };

    fetchFilteredUsers();
  }, [filterStatus, axiosSecure]);

  const displayUsers = filterStatus ? filteredUsers : users;

  return (
    <div>
      <h2>manage users : {users.length}</h2>

      {/* search */}
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
          <option value="suspended">Suspended</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {/* Modal should be outside table */}
      <dialog ref={suspendRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Suspend User: {selectedUser?.name}
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit(onSuspendSubmit)}>
            <input
              type="text"
              {...register("reason")}
              placeholder="Suspend reason"
              className="input w-full"
            />

            <textarea
              {...register("feedback")}
              className="textarea textarea-lg w-full"
              placeholder="Feedback"
            ></textarea>

            <button className="btn w-full">Suspend User</button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayUsers?.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <th>{user.name}</th>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td
                  className={
                    user.status === "active"
                      ? "text-yellow-500"
                      : user.status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {user.status}
                </td>
                <td className="flex flex-wrap gap-3">
                  <button
                    className="btn bg-green-300 hover:bg-green-400"
                    onClick={() => handleApproveRole(user._id)}
                  >
                    Approve as Manager
                  </button>

                  <button
                    className="btn bg-red-300 hover:bg-red-400"
                    onClick={() => handleSuspend(user)}
                  >
                    suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
