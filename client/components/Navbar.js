import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    {isLoggedIn ? (
      <Link to="/home">
        <h1 id="logo">Hot 'n' Saucy</h1>
      </Link>
    ) : (
      <h1 id="logo">Hot 'n' Saucy</h1>
    )}
    <nav>
      {isLoggedIn ? (
        isAdmin ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/customers">Customers</Link>
            <Link to="/hotsauces/add">Add Hot Sauce</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links after you log in */}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        )
      ) : (
        <div>
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
      <div>
        <Link to="/hotsauces">Hot Sauces</Link>
        <Link to="/cart">🛒</Link>
      </div>
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
