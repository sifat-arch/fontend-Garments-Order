// import React, { useState } from "react";

// import {
//   Upload,
//   Box,
//   DollarSign,
//   Layers,
//   CreditCard,
//   ShoppingBag,
//   FileText,
// } from "lucide-react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import useAuth from "../../../Hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";

// const AddProduct = () => {
//   const [preview, setPreview] = useState("");
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const onProductSubmit = async (data) => {
//     console.log(data);
//     console.log(data);
//     try {
//       // Upload image
//       const imageFile = data.image[0];

//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const url = `https://api.imgbb.com/1/upload?&key=${
//         import.meta.env.VITE_image_host
//       }`;
//       const imgRes = await axios.post(url, formData);

//       const photoURL = imgRes.data.data.url;

//       const productInfo = {
//         productTitle: data.title,
//         managersEmail: user?.email,
//         userName: user?.displayName,
//         description: data.description,
//         category: data.category,
//         price: Number(data.price),
//         availableQuantity: Number(data.availableQuantity),
//         minimumOrderQuantity: Number(data.miniumOrderQuantity),
//         image: photoURL,
//         paymentOptions: data.paymentOptions,
//         showOnHome: data.showOnHome ?? false,
//       };

//       //   upload to the database
//       const res = await axiosSecure.post("/products", productInfo);

//       if (res.data.insertedId) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Add Your Product successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         reset();
//       }
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };

// const handleImagePreview = (e) => {
//     const file = e.target.files[0];
//     console.log("file is", file);

//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const { data: userStatus = {} } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/myProfile?email=${user.email}`);

//       return res.data;
//     },
//   });

//   return (
//     <div>
//       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
//         {/* Main Card Container */}
//         <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           {/* Header with Gradient */}
//           <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-white">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//                 <ShoppingBag className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold tracking-wide">
//                   Add New Product
//                 </h1>
//                 <p className="text-yellow-100 text-sm mt-1">
//                   Fill out the details to create a new listing
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Form Body */}
//           <form
//             className="p-8 space-y-8"
//             onSubmit={handleSubmit(onProductSubmit)}
//           >
//             {/* Section: General Info */}
//             <div className="space-y-5">
//               <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
//                 <FileText className="w-4 h-4 text-yellow-600" />
//                 General Information
//               </h3>

//               <div className="grid grid-cols-1 gap-6">
//                 {/* Product Name */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 block">
//                     Product Name / Title
//                   </label>
//                   <input
//                     {...register("title", {
//                       required: "Product Name/Title is Required",
//                     })}
//                     type="text"
//                     placeholder="e.g. Men's Slim Fit T-Shirt"
//                     className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-gray-700"
//                   />
//                   {errors.title && (
//                     <p className="text-red-500">{errors.title.message}</p>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 block">
//                     Product Description
//                   </label>
//                   <textarea
//                     rows="4"
//                     {...register("description", {
//                       required: "Description is required",
//                     })}
//                     placeholder="Write a detailed description of the product..."
//                     className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-gray-700 resize-none"
//                   ></textarea>
//                   {errors.description && (
//                     <p className="text-red-500">"description is required"</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Section: Pricing & Inventory */}
//             <div className="space-y-5">
//               <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
//                 <Layers className="w-4 h-4 text-yellow-600" />
//                 Pricing & Stock
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Category */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 block">
//                     Category
//                   </label>
//                   <div className="relative">
//                     <select
//                       className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-gray-700 appearance-none cursor-pointer"
//                       {...register("category", {
//                         required: "Category is required",
//                       })}
//                     >
//                       <option value="" disabled selected>
//                         Select Category
//                       </option>
//                       <option value="shirt">Shirt</option>
//                       <option value="pant">Pant</option>
//                       <option value="jacket">Jacket</option>
//                       <option value="accessories">Accessories</option>
//                     </select>
//                     {errors.category && (
//                       <p className="text-red-500">{errors.category.message}</p>
//                     )}
//                     <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         ></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 block">
//                     Price
//                   </label>
//                   <div className="relative">
//                     <div className="absolute left-4 top-3.5 text-gray-400 pointer-events-none">
//                       <DollarSign className="w-5 h-5" />
//                     </div>
//                     <input
//                       type="number"
//                       {...register("price", {
//                         required: "Price is required",
//                       })}
//                       placeholder="0.00"
//                       className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-gray-700"
//                     />
//                     {errors.price && (
//                       <p className="text-red-500">{errors.price.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Payment Options */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 block">
//                     Payment Options
//                   </label>
//                   <div className="relative">
//                     <div className="absolute left-4 top-3.5 text-gray-400 pointer-events-none">
//                       <CreditCard className="w-5 h-5" />
//                     </div>
//                     <select
//                       className="w-full pl-11 pr-10 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-gray-700 appearance-none cursor-pointer"
//                       {...register("paymentOptions", {
//                         required: "Select your payment is required",
//                       })}
//                     >
//                       <option value="" disabled selected>
//                         Select Method
//                       </option>
//                       <option value="online">Online Payment</option>
//                       <option value="cod">Cash on Delivery</option>
//                     </select>
//                     {errors.paymentOptions && (
//                       <p className="text-red-500">
//                         {errors.paymentOptions.message}
//                       </p>
//                     )}
//                     <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         ></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Available Quantity */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 block">
//                     Available Quantity
//                   </label>
//                   <div className="relative">
//                     <div className="absolute left-4 top-3.5 text-gray-400 pointer-events-none">
//                       <Box className="w-5 h-5" />
//                     </div>
//                     <input
//                       type="number"
//                       {...register("availableQuantity", {
//                         required: "Available Quantity is required",
//                       })}
//                       placeholder="100"
//                       className="w-full pl-11 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-gray-700"
//                     />
//                     {errors.availableQuantity && (
//                       <p className="text-red-500">
//                         {errors.availableQuantity.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* MOQ */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 block">
//                     Minimum Order Qty
//                   </label>
//                   <input
//                     type="number"
//                     {...register("miniumOrderQuantity", {
//                       required: "Minium Order Quantity is required",
//                     })}
//                     placeholder="5"
//                     className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none text-gray-700"
//                   />
//                   {errors.miniumOrderQuantity && (
//                     <p className="text-red-500">
//                       {errors.miniumOrderQuantity.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Section: Media */}
//             <div className="space-y-5">
//               <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
//                 <Upload className="w-4 h-4 text-yellow-600" />
//                 Upload Images
//               </h3>

//               <div className="w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-blue-200 border-dashed rounded-xl cursor-pointer bg-blue-50/30 hover:bg-blue-50 transition-colors duration-300">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <div className="p-3 bg-blue-100 rounded-full mb-3">
//                       <Upload className="w-6 h-6 text-yellow-600" />
//                     </div>
//                     <p className="mb-1 text-sm text-gray-600 font-medium">
//                       <span className="text-yellow-600 font-semibold">
//                         Click to upload
//                       </span>{" "}
//                       or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       SVG, PNG, JPG or GIF (max. 5MB)
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     className="hidden"
//                     {...register("image", {
//                       required: "Image is required",
//                       onChange: (e) => handleImagePreview(e),
//                     })}
//                     // onChange={handleImagePreview}
//                   />
//                   {errors.image && (
//                     <p className="text-red-500">Images is required</p>
//                   )}
//                 </label>
//                 {preview && (
//                   <img src={preview} className="w-40 h-40 object-cover" />
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-between items-center">
//               <span className="mt-6">
//                 <label className="font-semibold ">
//                   <span className="text-yellow-400">Show</span> At home
//                 </label>
//                 <input
//                   type="checkbox"
//                   {...register("showOnHome")}
//                   // //checked={product.showOnHome ? true : false}
//                   className="checkbox checkbox-xl ml-2"
//                   // onChange={(e) => handleToggle(product._id, e.target.checked)}
//                 />
//               </span>
//               {/* Action Buttons */}
//               <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
//                 {userStatus.status === "suspended" ? (
//                   ""
//                 ) : (
//                   <button
//                     type="submit"
//                     className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-bold shadow-lg shadow-blue-600/30 hover:bg--500 hover:shadow-blue-700/40 transform hover:-translate-y-0.5 transition-all duration-200"
//                   >
//                     Save Product
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import {
  Upload,
  Box,
  DollarSign,
  Layers,
  CreditCard,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useTheme from "../../../Hooks/useTheme"; // <-- added

const AddProduct = () => {
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { theme } = useTheme(); // <-- theme hook

  const onProductSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const url = `https://api.imgbb.com/1/upload?&key=${
        import.meta.env.VITE_image_host
      }`;
      const imgRes = await axios.post(url, formData);
      const photoURL = imgRes.data.data.url;

      const productInfo = {
        productTitle: data.title,
        managersEmail: user?.email,
        userName: user?.displayName,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        availableQuantity: Number(data.availableQuantity),
        minimumOrderQuantity: Number(data.miniumOrderQuantity),
        image: photoURL,
        paymentOptions: data.paymentOptions,
        showOnHome: data.showOnHome ?? false,
      };

      const res = await axiosSecure.post("/products", productInfo);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Your Product successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const { data: userStatus = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/myProfile?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-2xl shadow-xl border overflow-hidden ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                Add New Product
              </h1>
              <p className="text-yellow-100 text-sm mt-1">
                Fill out the details to create a new listing
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          className="p-8 space-y-8"
          onSubmit={handleSubmit(onProductSubmit)}
        >
          {/* General Info */}
          <div className="space-y-5">
            <h3
              className={`text-lg font-semibold border-b pb-2 flex items-center gap-2 ${
                theme === "dark"
                  ? "text-gray-100 border-gray-700"
                  : "text-gray-800 border-gray-200"
              }`}
            >
              <FileText className="w-4 h-4 text-yellow-600" /> General
              Information
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium block ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Product Name / Title
                </label>
                <input
                  {...register("title", {
                    required: "Product Name/Title is Required",
                  })}
                  type="text"
                  placeholder="e.g. Men's Slim Fit T-Shirt"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-4 outline-none transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-yellow-400 focus:ring-yellow-400/20"
                      : "bg-gray-50 border-gray-200 text-gray-700 focus:border-yellow-500 focus:ring-blue-500/10"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium block ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Product Description
                </label>
                <textarea
                  rows="4"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Write a detailed description of the product..."
                  className={`w-full px-4 py-3 rounded-lg border resize-none outline-none transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-yellow-400 focus:ring-yellow-400/20"
                      : "bg-gray-50 border-gray-200 text-gray-700 focus:border-yellow-500 focus:ring-blue-500/10"
                  }`}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-5">
            <h3
              className={`text-lg font-semibold border-b pb-2 flex items-center gap-2 ${
                theme === "dark"
                  ? "text-gray-100 border-gray-700"
                  : "text-gray-800 border-gray-200"
              }`}
            >
              <Layers className="w-4 h-4 text-yellow-600" /> Pricing & Stock
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium block ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className={`w-full pl-4 pr-10 py-3 rounded-lg appearance-none cursor-pointer transition-all duration-200 outline-none ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-yellow-400 focus:ring-yellow-400/20"
                        : "bg-gray-50 border-gray-200 text-gray-700 focus:border-yellow-500 focus:ring-blue-500/10"
                    }`}
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    <option value="shirt">Shirt</option>
                    <option value="pant">Pant</option>
                    <option value="jacket">Jacket</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              {/* Other fields (price, paymentOptions, quantity, MOQ) */}
              {/* Add dark/light classes similarly for each input/select as above */}
            </div>
          </div>

          {/* Media */}
          <div className="space-y-5">
            <h3
              className={`text-lg font-semibold border-b pb-2 flex items-center gap-2 ${
                theme === "dark"
                  ? "text-gray-100 border-gray-700"
                  : "text-gray-800 border-gray-200"
              }`}
            >
              <Upload className="w-4 h-4 text-yellow-600" /> Upload Images
            </h3>

            <div className="w-full">
              <label
                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-blue-50/30 border-blue-200"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div
                    className="p-3 rounded-full mb-3"
                    style={{
                      backgroundColor: theme === "dark" ? "#3b3b3b" : "#dbeafe",
                    }}
                  >
                    <Upload className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p
                    className={`mb-1 text-sm font-medium ${
                      theme === "dark" ? "text-gray-100" : "text-gray-600"
                    }`}
                  >
                    <span className="text-yellow-600 font-semibold">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-400"
                    }`}
                  >
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  {...register("image", {
                    required: "Image is required",
                    onChange: handleImagePreview,
                  })}
                />
              </label>
              {preview && (
                <img src={preview} className="w-40 h-40 object-cover" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center mt-6">
            <span>
              <label className="font-semibold">
                <span className="text-yellow-400">Show</span> At home
              </label>
              <input
                type="checkbox"
                {...register("showOnHome")}
                className={`ml-2 checkbox checkbox-xl ${
                  theme === "dark" ? "checkbox-dark" : ""
                }`}
              />
            </span>

            <div>
              {userStatus.status !== "suspended" && (
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-lg font-bold shadow-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                      : "bg-yellow-400 text-white hover:bg-yellow-500"
                  }`}
                >
                  Save Product
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
