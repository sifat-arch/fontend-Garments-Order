import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const ProductUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState("");

  const product = location.state?.product;
  const { register, handleSubmit, setValue } = useForm();

  // Pre-fill form with existing product data
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
    console.log(data);
    try {
      //  upload image
      const imageFile = data.images[0];

      const formData = new FormData();
      formData.append("image", imageFile);

      const url = `https://api.imgbb.com/1/upload?&key=${
        import.meta.env.VITE_image_host
      }`;
      const imgRes = await axios.post(url, formData);

      const photoURL = imgRes.data.data.url;

      // updata the database
      const myFormData = {
        productTitle: data.productTitle,
        description: data.description,
        pricePerUnit: data.pricePerUnit,
        category: data.category,
        image: photoURL,
        paymentMethod: data.paymentMethod,
      };

      console.log("myform", myFormData);
      const res = await axiosSecure.patch(
        `/products/${product._id}`,
        myFormData
      );
      console.log(res);

      alert("Product updated successfully!");
      navigate("/dashboard/all-products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product!");
    }

    console.log(data);
  };

  if (!product) return <p className="p-4 text-red-500">Product not found!</p>;

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    console.log("file is", file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>

      <form
        className="space-y-4 p-4 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("productTitle")}
          placeholder="Title"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          {...register("pricePerUnit")}
          placeholder="Price"
          className="input input-bordered w-full"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />
        <input
          {...register("category")}
          placeholder="Category"
          className="input input-bordered w-full"
        />

        <input
          type="file"
          {...register("images", { onChange: (e) => handleImagePreview(e) })}
          className="input w-full"
        />
        {preview && <img src={preview} className="w-40 h-40 object-cover" />}

        <select
          {...register("paymentMethod")}
          className="select select-bordered w-full"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="op">Online</option>
        </select>

        <button type="submit" className="btn w-full">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;
