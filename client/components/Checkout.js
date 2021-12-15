import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../store/auth";
import Cart from "./Cart";

export class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      provider: "",
      cardNumber: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  async componentDidMount() {
    await this.props.loadAuthCustomer();
  }
  //componentWillUnmount-- clear local storage cart here??

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  handleSelect(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  handleCancel(event) {
    event.preventDefault();
    this.props.history.goBack();
  }
  handleSubmit(event) {
    //change to --> this.props.cart.orderStatus = "pending payment"
    //change to --> this.props.cart.paymentStatus = "pending"
    //change to --> this.props.cart.isCart = "false"
    //redirect to confirmation component view...maybe wrap purchase button in a Link to Confirmation component?
    //clear local storage cart here or in componentWillUnmount?
    event.preventDefault();
    //update order data through thunk in cart reducer?
    this.props.cart.orderStatus = "pending payment";
    this.props.cart.paymentStatus = "pending";
    this.props.cart.isCart = "false";
    //window.localStorage.clear();
  }
  render() {
    const {
      firstName,
      lastName,
      phone,
      email,
      streetAddress,
      city,
      state,
      zip,
      provider,
      cardNumber,
    } = this.state || {};

    const auth = this.props.auth || {};

    const { handleChange, handleSubmit, handleSelect, handleCancel } = this;

    return (
      <>
        <h3>Review Your Cart</h3>

        {/* <Cart insideCheckout={true} /> */}

        <div>
          <form id="checkoutForm" onSubmit={handleSubmit}>
            {this.props.auth ? (
              <div>
                <h4>Contact Information</h4>

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={auth.email}
                />

                <h4>Shipping Information</h4>

                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                  value={auth.firstName}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={auth.lastName}
                />

                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  onChange={handleChange}
                  value={auth.streetAddress}
                />

                <label htmlFor="city">City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  value={auth.city}
                />

                <label htmlFor="state">State</label>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                  value={auth.state}
                />

                <label htmlFor="zip">Zipcode</label>
                <input
                  type="text"
                  placeholder="Zipcode"
                  name="zip"
                  onChange={handleChange}
                  value={auth.zip}
                />

                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                  value={auth.phone}
                />
              </div>
            ) : (
              <div>
                <h4>Contact Information</h4>

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />

                <h4>Shipping Information</h4>

                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
                />

                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  onChange={handleChange}
                  value={streetAddress}
                />

                <label htmlFor="city">City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  value={city}
                />

                <label htmlFor="state">State</label>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                  value={state}
                />

                <label htmlFor="zip">Zipcode</label>
                <input
                  type="text"
                  placeholder="Zipcode"
                  name="zip"
                  onChange={handleChange}
                  value={zip}
                />

                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                  value={phone}
                />
              </div>
            )}

            <h4>Payment Information</h4>

            <label htmlFor="provider">Credit Card Provider</label>
            <select type="text" name="provider" onChange={handleSelect}>
              <option value="">Select provider</option>
              <option value={provider}>American Express</option>
              <option value={provider}>Mastercard</option>
              <option value={provider}>Visa</option>
            </select>

            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              placeholder="Card number"
              name="cardNumber"
              value={cardNumber}
              onChange={handleChange}
            />

            <br />

            <button type="submit" id="placeOrder">
              Place Order
            </button>

            <button onClick={handleCancel} id="cancelCheckout">
              Cancel Checkout
            </button>
          </form>
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadAuthCustomer: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
