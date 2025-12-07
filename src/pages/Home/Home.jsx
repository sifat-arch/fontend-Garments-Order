import React from "react";
import useAuth from "../../Hooks/useAuth";

const Home = () => {
  const user = useAuth();
  console.log(user);

  return (
    <div>
      <h2>Home page</h2>
    </div>
  );
};

export default Home;
