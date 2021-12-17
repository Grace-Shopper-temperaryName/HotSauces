import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class ConfirmationPage extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.customerId);
  }
  render() {
    const { firstName, lastName, streetAddress, city, state, zip } =
      this.props.customer;
    const { id, orderDate, amount, provider, cardNumber } =
      this.props.cart || [];
    const items = this.props.cart.hotSauces || [];
    return (
      <div>
        <h2>
          We thank you for satisfying your cravings to burn with us, {firstName}
          !
        </h2>
        <div id="orderDetails">
          <h3>Order Details</h3>
          <strong>Order ID</strong>
          <p>{id}</p>
          <strong>Order Date</strong>
          <p>{orderDate.slice(0, 10)}</p>
          <strong>Shipping Address</strong>
          <p>
            {firstName} {lastName}
          </p>
          <p>{streetAddress}</p>
          <p>
            {city}, {state} {zip}
          </p>
          <strong>Payment</strong>
          <p>
            {provider} ending in {cardNumber.slice(-4)}
          </p>
        </div>
        <hr></hr>
        <div id="purchaseList">
          <h3>Items Purchased</h3>
          {items.map((item) => (
            <div key={item.id}>
              <div>
                <p>{item.name}</p>
                <p>Price: ${item.price / 100}.00</p>
                <p>QTY: {item.orderHotSauce.quantity}</p>
                <strong>
                  ${(item.price / 100) * item.orderHotSauce.quantity}.00
                </strong>
              </div>
            </div>
          ))}
        </div>
        <hr></hr>

        <h3>Summary of Charges </h3>
        <div className="container">
          <div>
            <span>Subtotal ({items.length} items) </span>
            <span> ${amount / 100}.00</span>
          </div>
          <div>
            <span>Shipping (3-5 business days)</span>
            <span> FREE</span>
          </div>
          <div>
            <span>Tax</span>
            <span> $1.00</span>
          </div>
          <div>
            <span>Order Total</span>
            <span> ${amount / 100 + 1}.00</span>
          </div>
        </div>
        <button id="downloadButton">Download Receipt</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    customerId: state.auth.id,
    customer: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (customerId) => dispatch(fetchCart(customerId)),
  };
};

export default connect(mapState, mapDispatch)(ConfirmationPage);
