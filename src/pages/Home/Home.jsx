import React from "react";
import useAuth from "../../Hooks/useAuth";
import HeroBanar from "./HeroBanar";

const Home = () => {
  const user = useAuth();
  console.log(user);

  return (
    <div>
      <h2>Home page</h2>
      <HeroBanar />
    </div>
  );
};

export default Home;
