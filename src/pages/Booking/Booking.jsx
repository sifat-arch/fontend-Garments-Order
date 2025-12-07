import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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
    productData?.pricePerUnit * productData?.minQuantity
  );

  const quantity = watch("orderQuantity");

  useEffect(() => {
    if (quantity) {
      setOrderPrice(quantity * productData?.pricePerUnit);
    }
  }, [quantity, productData?.pricePerUnit]);

  useEffect(() => {
    if (user && productData) {
      reset({
        email: user.email || "",
        productTitle: productData.productTitle || "",
        pricePerUnit: productData.pricePerUnit || 0,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        orderQuantity: productData.minQuantity || 1,
        contactNumber: user.contactNumber || "",
        deliveryAddress: user.deliveryAddress || "",
        notes: "",
      });

      setOrderPrice(
        (productData.pricePerUnit || 0) * (productData.minQuantity || 1)
      );
    }
  }, [user, productData, reset]);

  const onSubmit = async (data) => {
    console.log("data", data);
    // if (productData.paymentMethod === "op") {
    //   const paymentInfo = {
    //     orderPrice: productData.orderPrice,
    //     productTitle: productData.productTitle,
    //     orderQuantity: productData.orderQuantity,
    //     productId: productData._id,
    //     email: user.email,
    //   };

    //   const res = await axiosSecure.post(
    //     "/payment-checkout-session",
    //     paymentInfo
    //   );
    //   console.log(res.data.url);
    //   window.location.href = res.data.url;
    // }
    // if (productData.paymentStatus === "paid") {
    //   axiosSecure.post("/orders", data).then((res) => {
    //     console.log(res.data);
    //   });
    // } else {
    //   axiosSecure.post("/orders", data).then((res) => {
    //     console.log(res.data);
    //   });
    // }
    // Calculate order price manually again (safe)
    const finalOrderPrice = data.orderQuantity * productData.pricePerUnit;

    // Payment Method: OP (Online Payment)
    if (productData.paymentMethod === "op") {
      // 1️⃣ Create Payment Info for Stripe
      const paymentInfo = {
        orderPrice: finalOrderPrice,
        productTitle: productData.title,
        orderQuantity: data.orderQuantity,
        productId: productData._id,
        email: user.email,
      };

      // 2️⃣ Call backend → create Stripe checkout
      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo
      );

      // 3️⃣ Redirect to Stripe
      window.location.href = res.data.url;
      return; // 🚫 Stop further execution
    }

    // Payment Method: COD
    if (productData.paymentMethod === "cod") {
      const orderData = {
        ...data,
        orderPrice: finalOrderPrice,
        productId: productData._id,
        paymentStatus: "unpaid",
      };

      const res = await axiosSecure.post("/orders", orderData);
      console.log("COD Order Saved:", res.data);
      if (res.data.success) {
        navigate("/dashboard/my-orders");
      }

      // redirect to My Orders page if needed
    }
  };

  console.log(productData.paymentStatus);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Place Your Order</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Image */}
        {productData.photo && (
          <div className="flex justify-center mb-4">
            <img
              src={productData.photo}
              alt={productData.title}
              className="h-32 w-32 object-cover rounded"
            />
          </div>
        )}

        {/* Read-only fields */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            readOnly
            {...register("email")}
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Product Title</label>
          <input
            type="text"
            readOnly
            {...register("productTitle")}
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Price per Unit</label>
          <input
            type="text"
            readOnly
            value={`$${productData.pricePerUnit}`}
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Editable fields */}
        <div>
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Order Quantity</label>
          <input
            type="number"
            {...register("orderQuantity", {
              required: "Quantity is required",
              min: {
                value: productData?.minQuantity,
                message: `Minimum order is ${productData.minQuantity}`,
              },
              max: {
                value: productData.maxQuantity,
                message: `Cannot order more than ${productData?.maxQuantity}`,
              },
              valueAsNumber: true,
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.orderQuantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.orderQuantity?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Order Price</label>

          <input
            type="number"
            {...register("orderPrice", { required: "Order price is required" })}
            readOnly
            value={orderPrice}
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />

          {errors.orderPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.orderPrice.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Contact Number</label>
          <input
            type="text"
            {...register("contactNumber", {
              required: "Contact number is required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Delivery Address</label>
          <textarea
            {...register("deliveryAddress", {
              required: "Delivery address is required",
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deliveryAddress.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">
            Additional Notes / Instructions
          </label>
          <textarea
            {...register("notes")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {productData.paymentStatus === "paid" ? (
          <button
            type="button"
            disabled
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
          >
            {" "}
            order placed{" "}
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
