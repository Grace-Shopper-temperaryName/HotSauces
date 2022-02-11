import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";

/**
 * COMPONENT
 */
class Home extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.id);
    this.props.fetchAuth();
  }

  render() {
    const { firstName, id } = this.props;
    const { orders } = this.props || [];
    return (
      <div id="home" className="component-container">
        <div id="user-info" className="info-banner">
          <div className="containerLeft" id="user-info-left">
            <img
              src="homeImage.jpg"
              alt="picture of hot sauce"
              id="home-image"
            />
          </div>
          <div className="containerRight">
            <p>Hello, {firstName}!</p>
            <Link to={`/profile/${id}/edit`}>
              <button
                type="submit"
                id="editCustomerInfo"
                className="change-btns"
              >
                Edit Info
              </button>
            </Link>
          </div>
        </div>
        <div id="customerOrders">
          <h3>Recent Orders</h3>
          {orders ? (
            orders.length > 0 ? (
              orders.map((order) => (
                <div className="container" key={order.id}>
                  <div className="containerLeft">
                    <h3>{order.orderStatus}</h3>
                  </div>
                  <div className="containerRight">
                    {order.isCart ? "🛒" : ""}
                    <span>{order.orderDate.slice(0, 10)}</span>
                    <span>${order.amount / 100}</span>
                    <small>Payment:</small>
                    <span>{order.paymentStatus}</span>
                    <span>{order.provider}</span>
                    <span>***{order.cardNumber.slice(-4)}</span>
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
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    orders: state.auth.orders,
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (customerId) => dispatch(fetchCart(customerId)),
    fetchAuth: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Home);
