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
  componentDidMount() {
    console.log("MOUNTED IN CHECKOUT!!");
    this.props.loadAuthCustomer();
  }
  //componentWillUnmount-- clear local storage cart here??

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  handleSelect(event) {
    this.setState({ [event.target.name]: event.target.value });
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
    this.props.cart.orderStatus = "pending payment";
    this.props.cart.paymentStatus = "pending";
    this.props.cart.isCart = "false";
    //window.localStorage.clear();
  }
  render() {
    console.log("RENDERING IN CHECKOUT!!");
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
    const {
      cFirstName,
      cLastName,
      cPhone,
      cEmail,
      cStreetAddress,
      cCity,
      cState,
      cZip,
    } = this.props.customer || {};
    const { handleChange, handleSubmit, handleSelect, handleCancel } = this;

    return (
      <>
        <h3>Review Your Cart</h3>

        <Cart insideCheckout={true} />

        <div>
          <form id="checkoutForm" onSubmit={handleSubmit}>
            {this.props.customer ? (
              <div>
                <label>Contact Information</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={cEmail}
                />

                <label>Shipping Information</label>
                {/* <span> */}
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                  value={cFirstName}
                />

                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={cLastName}
                />
                {/* </span> */}

                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  onChange={handleChange}
                  value={cStreetAddress}
                />

                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  value={cCity}
                />

                {/* <span> */}
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                  value={cState}
                />

                <input
                  type="text"
                  placeholder="ZIP code"
                  name="zip"
                  onChange={handleChange}
                  value={cZip}
                />
                {/* </span> */}

                <input
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                  value={cPhone}
                />
              </div>
            ) : (
              <div>
                <label>Contact Information</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />

                <label>Shipping Information</label>
                {/* <span> */}
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                />

                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
                />
                {/* </span> */}

                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  onChange={handleChange}
                  value={streetAddress}
                />

                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  value={city}
                />

                {/* <span> */}
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                  value={state}
                />

                <input
                  type="text"
                  placeholder="ZIP code"
                  name="zip"
                  onChange={handleChange}
                  value={zip}
                />
                {/* </span> */}

                <input
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                  value={phone}
                />
              </div>
            )}
            <label>Payment Information</label>
            <select
              type="text"
              placeholder="Credit card provider"
              name="provider"
              onChange={handleSelect}
            >
              <option placeholder="Credit card provider" disabled>
                Card type
              </option>
              <option value={provider}>American Express</option>
              <option value={provider}>Mastercard</option>
              <option value={provider}>Visa</option>
            </select>

            <input
              type="text"
              placeholder="Card number"
              name="cardNumber"
              value={cardNumber}
              onChange={handleChange}
            />

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
    customer: state.auth,
    cart: state.cart,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadAuthCustomer: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
