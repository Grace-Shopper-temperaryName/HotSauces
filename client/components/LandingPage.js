import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landingpage">
      <h1> Simple, Natural, Hot Sauce </h1>
      <Link to="/hotsauces">
        <button>See Our Collection Here</button>
      </Link>
    </div>
  );
};
export default LandingPage;
