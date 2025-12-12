import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../components/Loading";
import useRole from "../Hooks/useRole";

const BuyerOnlyRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "buyer") {
    return <div className="text-6xl text-red-600">Access is forbidden</div>;
  }
  return children;
};

export default BuyerOnlyRoute;
