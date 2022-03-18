import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../store/auth";

/**
 * COMPONENT
 */
class Home extends Component {
  componentDidMount() {
    this.props.fetchAuth();
  }

  render() {
    const { firstName, id } = this.props;
    const { orders } = this.props || [];
    return (
      <div id="home" className="component-container">
        <div id="user-info" className="container">
          <div>
            <img src="login.jpg" className="homeimage" />
          </div>
          <h2>Hello, {firstName}!</h2>
          <Link to={`/profile/${id}/edit`}>
            <button type="submit" id="editCustomerInfo" className="change-btns">
              Edit Info
            </button>
          </Link>
        </div>
        <div className="container" id="customerOrders">
          <h3>Recent Orders</h3>

          {orders ? (
            orders.length > 0 ? (
              orders.slice(0, 5).map((order) => (
                <div id="customerOrder" key={order.id}>
                  <div className="containerLeft">
                    <h3>{order.orderStatus}</h3>
                  </div>
                  <div className="containerRight">
                    {order.isCart ? "🛒" : ""}
                    <span>date: {order.orderDate.slice(0, 10)}</span>
                    <span>subtotal: ${order.amount / 100}</span>
                    <span>Payment:</span>
                    <p>
                      status: {order.paymentStatus}
                      <br />
                      provider: {order.provider}
                      <br />
                      card #: ***{order.cardNumber?.slice(-4) && ""}
                    </p>
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

const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    orders: state.auth.orders,
    customerId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAuth: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Home);
