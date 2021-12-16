import React, { Component } from "react";
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
        <h2>We thank you for satisfying your cravings to burn, {firstName}!</h2>
        <div id="orderDetails">
          <h3>Order Details</h3>
          <h4>Order ID</h4>
          <p>{id}</p>
          <h4>Order Date</h4>
          <p>{orderDate.slice(0, 10)}</p>
          <h4>Shipping Address</h4>
          <p>
            {firstName} {lastName}
          </p>
          <p>{streetAddress}</p>
          <p>
            {city}, {state} {zip}
          </p>
          <h4>Payment</h4>
          <p>
            {provider} ending in {cardNumber.slice(-4)}
          </p>
        </div>
        <hr></hr>
        <div id="purchaseList">
          <h3>Items Purchased</h3>
          {items.map((item) => (
            <div key={item.id}>
              <div className="containerLeft">
                <img src={item.imageUrl} alt={`picture of ${item.name}`} />
              </div>
              <div className="containerRight">
                <p>{item.name}</p>
                <p>Price: ${item.price / 100}.00</p>
                <p>QTY: {item.orderHotSauce.quantity}</p>
                <h4>${(item.price / 100) * item.orderHotSauce.quantity}.00</h4>
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
          <h4>Order Total</h4>
        </div>
        <div className="containerRight">
          <p>${amount / 100}.00</p>
          <p>FREE</p>
          <p>$1.00</p>
          <h4>${amount / 100 + 1}.00</h4>
        </div>
        <button id="cancelOrder">Cancel Order</button>
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
