import React from "react";
import useAuth from "../../Hooks/useAuth";
import HeroBanar from "./HeroBanar";
import OurProducts from "./OurProducts";
import HowItWorks from "./HowItWorks";

const Home = () => {
  const user = useAuth();
  console.log(user);

  return (
    <div>
      <h2>Home page</h2>
      <HeroBanar />
      <OurProducts />
      <HowItWorks />
    </div>
  );
};

export default Home;
