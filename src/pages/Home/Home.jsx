import React from "react";
import useAuth from "../../Hooks/useAuth";
import HeroBanar from "./HeroBanar";
import OurProducts from "./OurProducts";
import HowItWorks from "./HowItWorks";
import CustomerFeedback from "./CustomerFeedback";

const Home = () => {
  const user = useAuth();
  console.log(user);

  return (
    <div>
      <HeroBanar />
      <OurProducts />
      <HowItWorks />
      <CustomerFeedback />
    </div>
  );
};

export default Home;
