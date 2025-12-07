import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const [selectedUser, setSelectedUser] = useState(null);
//   const suspendRef = useRef();

//   const { data: users = [] } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users`);

//       return res.data;
//     },
//   });

//   const { register, handleSubmit } = useForm();

//   const handleSuspend = (user) => {
//     setSelectedUser(user);
//     suspendRef.current.showModal();
//   };

//   const onSuspendSubmit = async (data) => {
//     await axiosSecure.patch(`/users/suspend/${selectedUser._id}`, {
//       reason: data.reason,
//       feedback: data.feedback,
//     });

//     suspendRef.current.close();
//   };

//   return (
//     <div>
//       <h2>manage users : {users.length}</h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* row 1 */}
//             {users.map((user, i) => {
//               return (
//                 <tr key={i}>
//                   <th>{i + 1}</th>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     <button className="btn" onClick={() => handleSuspend(user)}>
//                       suspend
//                     </button>

//                     {/* Open the modal using document.getElementById('ID').showModal() method */}

//                     <dialog ref={suspendRef} id="my_modal_1" className="modal">
//                       <div className="modal-box">
//                         <h3 className="font-bold text-lg">Hello!</h3>
//                         <p className="py-4">
//                           <form
//                             className="space-y-4"
//                             onSubmit={handleSubmit(onSuspendSubmit)}
//                           >
//                             <input
//                               type="text"
//                               {...register("reason")}
//                               placeholder="Type here"
//                               className="input w-full"
//                             />

//                             <textarea
//                               placeholder="Bio"
//                               {...register("feedback")}
//                               className="textarea textarea-lg w-full"
//                             ></textarea>

//                             <button className="btn w-full">Suspend User</button>
//                           </form>
//                         </p>
//                         <div className="modal-action">
//                           <form method="dialog">
//                             <button className="btn">Close</button>
//                           </form>
//                         </div>
//                       </div>
//                     </dialog>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const suspendRef = useRef();
  const { register, handleSubmit } = useForm();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleSuspend = (user) => {
    setSelectedUser(user);
    suspendRef.current.showModal();
  };

  const onSuspendSubmit = async (data) => {
    await axiosSecure.patch(`/users/suspend/${selectedUser._id}`, {
      reason: data.reason,
      feedback: data.feedback,
      role: "suspended",
    });

    suspendRef.current.close();
  };

  return (
    <div>
      <h2>manage users : {users.length}</h2>

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
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <button className="btn" onClick={() => handleSuspend(user)}>
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
