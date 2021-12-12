import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;
  const { orders } = props || [];

  return (
    <div>
      <h2>Welcome, {firstName}</h2>
      <div className="container" id="customerOrders">
        <h3>Order History</h3>
        <Link to="/profile">
          <button type="submit" id="editCustomerInfo">
            Edit Info
          </button>
        </Link>
        {orders ? (
          orders.length > 0 ? (
            orders.map((order) => (
              <div className="container" id="customerOrders">
                <div className="containerLeft">
                  <h3>{order.orderStatus}</h3>
                </div>
                <div className="containerRight">
                  {order.isCart ? "🛒" : ""}
                  <p>{order.orderDate}</p>
                  <p>{order.amount}</p>
                  <small>Payment:</small>
                  <p>{order.paymentStatus}</p>
                  <p>{order.provider}</p>
                  <p>{order.cardNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <h4>
              Your order history is empty. Let's get{" "}
              <Link to="/hotsauces">shopping!</Link>
            </h4>
          )
        ) : (
          <h4>
            Your order history is empty. Let's get{" "}
            <Link to="/hotsauces">shopping!</Link>
          </h4>
        )}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    orders: state.auth.orders,
  };
};

export default connect(mapState)(Home);
