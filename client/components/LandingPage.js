import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landingpage">
      <p> Simple, Natural, Hot Sauce </p>
      <Link to="/hotsauces">
        <button>Browse Our Hot Sauces</button>
      </Link>
    </div>
  );
};
export default LandingPage;
