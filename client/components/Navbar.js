import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import styled from "styled-components";

const Navcontainer = styled.div`
  background-color: white;
  display:inline-block: ;
`;

const Navwrapper = styled.div`
  display:inline-block: ;
`;


const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <Navcontainer>
    <Navwrapper>
      {isLoggedIn ? (
        <Link to="/home">
          <img src="hotnsaucylogo.png" id="logo" />
        </Link>
    ) : (
      <Link to="/hotsauces">
          <img src="hotnsaucylogo.png" id="logo" />
        </Link>
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
        ) ):
        (
          <div id="leftLinks">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">SIGN UP </Link>
          </div>
        )}
        <div id="rightLinks">
          <Link to="/hotsauces">SHOP</Link>
          <Link to="/cart"> CART </Link>
        </div>
      </nav>
      <hr />
    </Navwrapper>
  </Navcontainer>
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
