import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          navigate("/dashboard/my-orders");
        });
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div>
      <h2>Pyement success</h2>
    </div>
  );
};

export default PaymentSuccess;
