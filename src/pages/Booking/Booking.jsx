// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import { useNavigate, useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const OrderForm = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const params = useParams();
//   const axiosSecure = useAxiosSecure();
//   const id = params.id;

//   const { data: productData = {} } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: user?.email || "",
//       productTitle: productData?.title || "",
//       pricePerUnit: productData?.pricePerUnit || 0,
//       firstName: user?.firstName || "",
//       lastName: user?.lastName || "",
//       orderQuantity: productData?.minQuantity || 1,
//       contactNumber: user?.contactNumber || "",
//       deliveryAddress: user?.deliveryAddress || "",
//       notes: "",
//     },
//   });

//   const [orderPrice, setOrderPrice] = useState(
//     productData?.price * productData?.minimumOrderQuantity
//   );

//   const quantity = watch("orderQuantity");

//   useEffect(() => {
//     if (quantity) {
//       setOrderPrice(quantity * productData?.price);
//     }
//   }, [quantity, productData?.price]);

//   useEffect(() => {
//     if (user && productData) {
//       reset({
//         email: user.email || "",
//         productTitle: productData.productTitle || "",
//         pricePerUnit: productData.price || 0,
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         orderQuantity: productData.minQuantity || 1,
//         contactNumber: user.contactNumber || "",
//         deliveryAddress: user.deliveryAddress || "",
//         notes: "",
//       });

//       // setOrderPrice(
//       //   (productData.pricePerUnit || 0) * (productData.minQuantity || 1)
//       // );
//     }
//   }, [user, productData, reset]);

//   const onSubmit = async (data) => {
//     const finalOrderPrice = data.orderQuantity * productData.price;
//     setOrderPrice(finalOrderPrice);

//     if (productData.paymentOptions === "online") {
//       const paymentInfo = {
//         orderPrice: orderPrice,
//         productTitle: productData.productTitle,
//         orderQuantity: data.orderQuantity,
//         productId: productData._id,
//         email: user.email,
//         user: user?.displayName,
//       };

//       console.log("paymentinfo", paymentInfo);

//       const res = await axiosSecure.post(
//         "/payment-checkout-session",
//         paymentInfo
//       );

//       window.location.href = res.data.url;

//       return;
//     }

//     if (productData.paymentOptions === "cod") {
//       const orderData = {
//         orderPrice: Number(finalOrderPrice),
//         productTitle: String(productData.productTitle),
//         orderQuantity: Number(data.orderQuantity),
//         productId: String(productData._id),
//         email: String(user?.email),
//         user: String(user?.displayName || ""),
//         paymentStatus: "unpaid",
//       };

//       const res = await axiosSecure.post("/orders", orderData);
//       if (res.data.insertedId) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Your order has been placed",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate("/dashboard/my-orders");
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
//       {" "}
//       <h2 className="text-3xl font-semibold mb-6 text-center">
//         <span className="text-yellow-400">Place</span> Your Order
//       </h2>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         {" "}
//         {productData.photo && (
//           <div className="md:col-span-2 flex justify-center mb-4">
//             <img
//               src={productData.photo}
//               alt={productData.title}
//               className="h-40 w-40 object-cover rounded-xl shadow"
//             />
//           </div>
//         )}
//         <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
//           {" "}
//           <h3 className="text-lg font-medium mb-2">Product Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 readOnly
//                 {...register("email")}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Product Title</label>
//               <input
//                 type="text"
//                 readOnly
//                 {...register("productTitle")}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Price / Unit</label>
//               <input
//                 type="text"
//                 readOnly
//                 value={`$${productData.price}`}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//           {" "}
//           <h3 className="text-lg font-medium mb-3">Your Information</h3>
//           <label className="block text-sm font-medium">First Name</label>
//           <input
//             type="text"
//             {...register("firstName", { required: "First name is required" })}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2"
//           />
//           {errors.firstName && (
//             <p className="text-red-500 text-xs">{errors.firstName.message}</p>
//           )}
//           <label className="block text-sm font-medium">Last Name</label>
//           <input
//             type="text"
//             {...register("lastName", { required: "Last name is required" })}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2"
//           />
//           {errors.lastName && (
//             <p className="text-red-500 text-xs">{errors.lastName.message}</p>
//           )}
//         </div>
//         <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//           {" "}
//           <h3 className="text-lg font-medium mb-3">Order Information</h3>
//           <label className="block text-sm font-medium">Order Quantity</label>
//           <input
//             type="number"
//             {...register("orderQuantity", {
//               required: "Quantity is required",
//               min: {
//                 value: productData.minQuantity,
//                 message: `Minimum order is ${productData.minQuantity}`,
//               },
//               max: {
//                 value: productData.maxQuantity,
//                 message: `Cannot order more than ${productData.maxQuantity}`,
//               },
//               valueAsNumber: true,
//             })}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2"
//           />
//           {errors.orderQuantity && (
//             <p className="text-red-500 text-xs">
//               {errors.orderQuantity.message}
//             </p>
//           )}
//           <label className="block text-sm font-medium">Order Price</label>
//           <input
//             type="number"
//             readOnly
//             value={orderPrice}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100"
//           />
//         </div>
//         <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
//           {" "}
//           <h3 className="text-lg font-medium mb-3">Delivery Information</h3>
//           <label className="block text-sm font-medium">Contact Number</label>
//           <input
//             type="text"
//             {...register("contactNumber", {
//               required: "Contact number is required",
//             })}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2"
//           />
//           {errors.contactNumber && (
//             <p className="text-red-500 text-xs">
//               {errors.contactNumber.message}
//             </p>
//           )}
//           <label className="block text-sm font-medium">Delivery Address</label>
//           <textarea
//             {...register("deliveryAddress", {
//               required: "Delivery address is required",
//             })}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2"
//           />
//           {errors.deliveryAddress && (
//             <p className="text-red-500 text-xs">
//               {errors.deliveryAddress.message}
//             </p>
//           )}
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium mb-1">
//             Additional Notes
//           </label>
//           <textarea
//             {...register("notes")}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2"
//           />
//         </div>
//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             className="w-full bg-yellow-400 hover:bg-amber-500 cursor-pointer text-white py-3 rounded-xl text-lg font-medium"
//           >
//             Place Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OrderForm;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const OrderForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const id = params.id;

  const { data: productData = {} } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      productTitle: productData?.title || "",
      pricePerUnit: productData?.pricePerUnit || 0,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      orderQuantity: productData?.minQuantity || 1,
      contactNumber: user?.contactNumber || "",
      deliveryAddress: user?.deliveryAddress || "",
      notes: "",
    },
  });

  const [orderPrice, setOrderPrice] = useState(
    productData?.price * productData?.minimumOrderQuantity
  );

  const quantity = watch("orderQuantity");

  useEffect(() => {
    if (quantity) {
      setOrderPrice(quantity * productData?.price);
    }
  }, [quantity, productData?.price]);

  useEffect(() => {
    if (user && productData) {
      reset({
        email: user.email || "",
        productTitle: productData.productTitle || "",
        pricePerUnit: productData.price || 0,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        orderQuantity: productData.minQuantity || 1,
        contactNumber: user.contactNumber || "",
        deliveryAddress: user.deliveryAddress || "",
        notes: "",
      });
    }
  }, [user, productData, reset]);

  const onSubmit = async (data) => {
    const finalOrderPrice = data.orderQuantity * productData.price;
    setOrderPrice(finalOrderPrice);

    if (productData.paymentOptions === "online") {
      const paymentInfo = {
        orderPrice: orderPrice,
        productTitle: productData.productTitle,
        orderQuantity: data.orderQuantity,
        productId: productData._id,
        email: user.email,
        managersEmail: String(productData?.managersEmail),
        user: user?.displayName,
      };

      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo
      );

      window.location.href = res.data.url;
      return;
    }

    if (productData.paymentOptions === "cod") {
      const orderData = {
        orderPrice: Number(finalOrderPrice),
        productTitle: String(productData.productTitle),
        orderQuantity: Number(data.orderQuantity),
        productId: String(productData._id),
        email: String(user?.email),
        managersEmail: String(productData?.managersEmail),
        user: String(user?.displayName || ""),
        paymentStatus: "unpaid",
      };

      const res = await axiosSecure.post("/orders", orderData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your order has been placed",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-orders");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
        <span className="text-yellow-400">Place</span> Your Order
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {productData.photo && (
          <div className="md:col-span-2 flex justify-center mb-4">
            <img
              src={productData.photo}
              alt={productData.title}
              className="h-40 w-40 object-cover rounded-xl shadow"
            />
          </div>
        )}

        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
            Product Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                readOnly
                {...register("email")}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Product Title
              </label>
              <input
                type="text"
                readOnly
                {...register("productTitle")}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Price / Unit
              </label>
              <input
                type="text"
                readOnly
                value={`$${productData.price}`}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
            Your Information
          </h3>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 mb-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName.message}</p>
          )}
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName.message}</p>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
            Order Information
          </h3>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Order Quantity
          </label>
          <input
            type="number"
            {...register("orderQuantity", {
              required: "Quantity is required",
              min: {
                value: productData.minQuantity,
                message: `Minimum order is ${productData.minQuantity}`,
              },
              max: {
                value: productData.maxQuantity,
                message: `Cannot order more than ${productData.maxQuantity}`,
              },
              valueAsNumber: true,
            })}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 mb-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.orderQuantity && (
            <p className="text-red-500 text-xs">
              {errors.orderQuantity.message}
            </p>
          )}
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Order Price
          </label>
          <input
            type="number"
            readOnly
            value={orderPrice}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
            Delivery Information
          </h3>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Contact Number
          </label>
          <input
            type="text"
            {...register("contactNumber", {
              required: "Contact number is required",
            })}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 mb-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs">
              {errors.contactNumber.message}
            </p>
          )}
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Delivery Address
          </label>
          <textarea
            {...register("deliveryAddress", {
              required: "Delivery address is required",
            })}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          />
          {errors.deliveryAddress && (
            <p className="text-red-500 text-xs">
              {errors.deliveryAddress.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Additional Notes
          </label>
          <textarea
            {...register("notes")}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-yellow-400 dark:bg-yellow-500 hover:bg-amber-500 dark:hover:bg-yellow-600 cursor-pointer text-white py-3 rounded-xl text-lg font-medium transition duration-300"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
