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
      <div>
        <div className="container">
          <h2>Welcome, {firstName}</h2>
          <Link to={`/profile/${id}/edit`}>
            <button type="submit" id="editCustomerInfo">
              Edit Info
            </button>
          </Link>
        </div>
        <div className="container" id="customerOrders">
          <h3>Recent Orders</h3>

          {orders ? (
            orders.length > 0 ? (
              orders.slice(0, 5).map((order) => (
                <div className="container" id="customerOrders" key={order.id}>
                  <div className="containerLeft">
                    <h3>{order.orderStatus}</h3>
                  </div>
                  <div className="containerRight">
                    {order.isCart ? "🛒" : ""}
                    <p>{order.orderDate.slice(0, 10)}</p>
                    <p>${order.amount / 100}</p>
                    <small>Payment:</small>
                    <p>{order.paymentStatus}</p>
                    <p>{order.provider}</p>
                    <p>***{order.cardNumber.slice(-4)}</p>
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
