import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProducts from "../pages/AllProducts/AllProducts";

import ProductDetails from "../pages/ProductDetails/ProductDetails";
import PrivetRoute from "./PrivetRoute";
import Booking from "../pages/Booking/Booking";
import PaymentSuccess from "../pages/Pyements/PaymentSuccess";
import PaymentCancel from "../pages/Pyements/paymentCancel";
import DashboardLayout from "../Layouts/DashboardLayout";
import Myorders from "../pages/Dashboard/Myorders";
import ManageUsers from "../pages/Dashboard/adminDashboard/ManageUsers";
import AllProductsAD from "../pages/Dashboard/adminDashboard/AllProductsAD";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: 1,
        element: <Home />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "product-details/:id",
        // element: (
        //   <PrivetRoute>
        //     <ProductDetails />,
        //   </PrivetRoute>
        // ),
        Component: ProductDetails,
      },
      {
        path: "booking/:id",
        // element: (
        //   <PrivetRoute>
        //     <Booking />,
        //   </PrivetRoute>
        // ),
        Component: Booking,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "my-orders",
        element: <Myorders />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "all-products",
        element: <AllProductsAD />,
      },
    ],
  },
]);

export default router;
