import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <header>
    <div id="logo_container">
      <Link to={isLoggedIn ? "/home" : "/"}>
        <img src="hotnsaucylogo.png" id="logo" alt="HotNSaucy logo" />
      </Link>
    </div>
    <nav>
      {isLoggedIn ? (
        <>
          <div id="leftLinks">
            {/* The nav will show these links after user logs in */}
            <a href="#" onClick={handleClick}>
              LOGOUT
            </a>
          </div>
          {/* The nav will show these links after you log in as Admin */}
          {isAdmin ? (
            <div id="centerLinks">
              <Link to="/customers">CUSTOMERS</Link>
              <Link to="/hotsauces/add">ADD HOT SAUCE</Link>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div id="leftLinks">
          {/* The nav will show these links when not logged in */}
          <Link to="/login">LOGIN</Link>
          <Link to="/signup">SIGN UP</Link>
        </div>
      )}
      <div id="rightLinks">
        <Link to="/hotsauces">SHOP</Link>
        <Link to="/cart">CART</Link>
      </div>
    </nav>
  </header>
);

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
