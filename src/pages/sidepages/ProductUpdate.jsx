// import React, { useEffect, useState } from "react";

// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useLocation, useNavigate } from "react-router";
// import axios from "axios";
// import Swal from "sweetalert2";

// const ProductUpdate = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const [preview, setPreview] = useState("");

//   const product = location.state?.product;
//   console.log("products", product);

//   const { register, handleSubmit, setValue } = useForm();

//   // Pre-fill form with existing product data
//   useEffect(() => {
//     if (product) {
//       setValue("productTitle", product.productTitle);
//       setValue("description", product.description);
//       setValue("pricePerUnit", product.pricePerUnit);
//       setValue("category", product.category);
//       setValue("paymentMethod", product.paymentMethod);
//     }
//   }, [product, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       //  upload image
//       let photoURL;
//       if (data.images && data.images.length > 0) {
//         const imageFile = data.images[0];

//         const formData = new FormData();
//         formData.append("image", imageFile);

//         const url = `https://api.imgbb.com/1/upload?&key=${
//           import.meta.env.VITE_image_host
//         }`;
//         const imgRes = await axios.post(url, formData);

//         photoURL = imgRes.data.data.url;
//       }

//       // updata the database
//       const myFormData = {
//         productTitle: data.productTitle,
//         description: data.description,
//         pricePerUnit: data.pricePerUnit,
//         category: data.category,
//         image: photoURL || product.image,
//         paymentMethod: data.paymentMethod,
//       };

//       console.log("myform", myFormData);
//       const res = await axiosSecure.patch(
//         `/products/${product._id}`,
//         myFormData
//       );

//       if (res.data.modifiedCount) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "update successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }

//       navigate("/dashboard/all-products");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update product!");
//     }

//     console.log(data);
//   };

//   if (!product) return <p className="p-4 text-red-500">Product not found!</p>;

//   const handleImagePreview = (e) => {
//     const file = e.target.files[0];
//     console.log("file is", file);

//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <h2 className="text-2xl font-bold mb-4">Update Product</h2>

//       <form
//         className="space-y-4 p-4 w-full max-w-xl"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <input
//           {...register("productTitle")}
//           placeholder="Title"
//           className="input input-bordered w-full"
//         />
//         <input
//           type="number"
//           {...register("pricePerUnit")}
//           placeholder="Price"
//           className="input input-bordered w-full"
//         />
//         <textarea
//           {...register("description")}
//           placeholder="Description"
//           className="textarea textarea-bordered w-full"
//         />

//         <fieldset className="fieldset">
//           <legend className="fieldset-legend">Categories</legend>
//           <select
//             {...register("category")}
//             defaultValue="Pick a browser"
//             className="select"
//           >
//             <option value="shirt">Shirt</option>
//             <option value="pant">Pant</option>
//             <option value="jacket">Jacket</option>
//             <option value="accessories">Accessories</option>
//           </select>
//           <span className="label">Optional</span>
//         </fieldset>

//         <input
//           type="file"
//           {...register("images", { onChange: (e) => handleImagePreview(e) })}
//           className="input w-full"
//         />
//         {preview && <img src={preview} className="w-40 h-40 object-cover" />}

//         <select
//           {...register("paymentMethod")}
//           className="select select-bordered w-full"
//         >
//           <option value="cod">Cash on Delivery</option>
//           <option value="op">Online</option>
//         </select>

//         <button type="submit" className="btn w-full">
//           Update the Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductUpdate;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const ProductUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState("");

  const product = location.state?.product;
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (product) {
      setValue("productTitle", product.productTitle);
      setValue("description", product.description);
      setValue("pricePerUnit", product.pricePerUnit);
      setValue("category", product.category);
      setValue("paymentMethod", product.paymentMethod);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      let photoURL;

      if (data.images && data.images.length > 0) {
        const imageFile = data.images[0];
        const formData = new FormData();
        formData.append("image", imageFile);
        const url = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.VITE_image_host
        }`;
        const imgRes = await axios.post(url, formData);
        photoURL = imgRes.data.data.url;
      }

      const myFormData = {
        productTitle: data.productTitle,
        description: data.description,
        pricePerUnit: data.pricePerUnit,
        category: data.category,
        image: photoURL || product.image,
        paymentMethod: data.paymentMethod,
      };

      const res = await axiosSecure.patch(
        `/products/${product._id}`,
        myFormData
      );

      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      navigate("/dashboard/all-products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product!");
    }
  };

  if (!product) return <p className="p-4 text-red-500">Product not found!</p>;

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Product</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-1 font-medium">Product Title</label>
          <input
            {...register("productTitle")}
            placeholder="Product Title"
            className="input input-bordered w-full rounded-xl"
          />
          <label className="block mb-1 font-medium">Quantity</label>

          <input
            type="number"
            {...register("pricePerUnit")}
            placeholder="Price Per Unit"
            className="input input-bordered w-full rounded-xl"
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            className="textarea textarea-bordered w-full rounded-xl min-h-28"
          />

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register("category")}
              className="select select-bordered w-full rounded-xl"
            >
              <option value="shirt">Shirt</option>
              <option value="pant">Pant</option>
              <option value="jacket">Jacket</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              {...register("images", {
                onChange: (e) => handleImagePreview(e),
              })}
              className="file-input file-input-bordered w-full rounded-xl"
            />

            <div className="mt-3 flex justify-center">
              <img
                src={preview || product.image}
                className="w-40 h-40 object-cover rounded-xl shadow-md border"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <select
              {...register("paymentMethod")}
              className="select select-bordered w-full rounded-xl"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="op">Online</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;
