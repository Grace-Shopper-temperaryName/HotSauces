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
        <div className="containerLeft">
          <p>Subtotal ({items.length} items) </p>
          <p>Shipping (3-5 business days)</p>
          <p>Tax</p>
          <strong>Order Total</strong>
        </div>
        <div className="containerRight">
          <p>${amount / 100}.00</p>
          <p>FREE</p>
          <p>$1.00</p>
          <strong>${amount / 100 + 1}.00</strong>
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
