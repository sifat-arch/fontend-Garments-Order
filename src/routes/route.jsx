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

import ManageUsers from "../pages/Dashboard/adminDashboard/ManageUsers";
import AllProductsAD from "../pages/Dashboard/adminDashboard/AllProductsAD";
import ProductUpdate from "../pages/sidepages/ProductUpdate";
import AllOrders from "../pages/Dashboard/adminDashboard/AllOrders";
import OrderDetails from "../pages/sidepages/OrderDetails";
import AddProduct from "../pages/Dashboard/managerDashboard/AddProduct";
import ManageProducts from "../pages/Dashboard/managerDashboard/ManageProducts";
import PendingOrders from "../pages/Dashboard/managerDashboard/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/managerDashboard/ApprovedOrders";
import ViewTracking from "../pages/sidepages/ViewTracking";
import MyProfile from "../pages/Dashboard/managerDashboard/MyProfile";
import MyOrders from "../pages/Dashboard/BuyerDashboard/Myorders";
import TrackOrder from "../pages/Dashboard/BuyerDashboard/TrackOrder";
import Profile from "../pages/Dashboard/BuyerDashboard/Profile";
import AdminOnlyRoute from "./AdminOnlyRoute";
import ManagerOnlyRoute from "./ManagerOnlayRoute";
import BuyerOnlyRoute from "./BuyerOnlyRoute";

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
        element: (
          <PrivetRoute>
            <ProductDetails />,
          </PrivetRoute>
        ),
        Component: ProductDetails,
      },
      {
        path: "booking/:id",
        element: (
          <PrivetRoute>
            <Booking />,
          </PrivetRoute>
        ),
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
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),

    children: [
      // admin only routes
      {
        path: "manage-users",
        element: (
          <AdminOnlyRoute>
            <ManageUsers />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminOnlyRoute>
            <AllProductsAD />,
          </AdminOnlyRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminOnlyRoute>
            <AllOrders />,
          </AdminOnlyRoute>
        ),
      },
      {
        path: "update-product",
        element: <ProductUpdate />,
      },
      {
        path: "order-details",
        element: <OrderDetails />,
      },

      // manager only routes

      {
        path: "add-products",
        element: (
          <ManagerOnlyRoute>
            <AddProduct />,
          </ManagerOnlyRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ManagerOnlyRoute>
            <ManageProducts />,
          </ManagerOnlyRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerOnlyRoute>
            <PendingOrders />,
          </ManagerOnlyRoute>
        ),
      },
      {
        path: "Approved-orders",
        element: (
          <ManagerOnlyRoute>
            <ApprovedOrders />,
          </ManagerOnlyRoute>
        ),
      },
      {
        path: "view-trackings/:id",
        element: <ViewTracking />,
      },
      {
        path: "my-profile",
        element: (
          <ManagerOnlyRoute>
            <MyProfile />,
          </ManagerOnlyRoute>
        ),
      },
      // buyer route
      {
        path: "my-orders",
        element: (
          <BuyerOnlyRoute>
            <MyOrders />,
          </BuyerOnlyRoute>
        ),
      },
      {
        path: "track-order",
        element: <TrackOrder />,
      },
      {
        path: "buyer-profile",
        element: (
          <BuyerOnlyRoute>
            <Profile />,
          </BuyerOnlyRoute>
        ),
      },
    ],
  },
]);

export default router;
