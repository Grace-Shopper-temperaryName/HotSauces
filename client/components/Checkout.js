import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../store/auth";
import { updateCartTotal } from "../store/cart";

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
    this.calculateCartTotal = this.calculateCartTotal.bind(this);
  }
  componentDidMount() {
    this.props.loadAuthCustomer();
  }
  //componentWillUnmount-- clear local storage cart here??
  calculateCartTotal(array) {
    // let orderId = this.props.cart.id;
    let cartTotal = [];
    for (let i = 0; i <= array.length - 1; i++) {
      let saucePrice = array[i].price / 100;
      let sauceOty = array[i].orderHotSauce.quantity;
      let singleSauceCost = saucePrice * sauceOty;
      cartTotal.push(singleSauceCost);
    }
    let total = 0;
    cartTotal.forEach((item) => (total += item));
    // this.props.updateCartTotal(orderId, total);
    return total;
  }
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

    const items = this.props.cart.hotSauces || [];

    const total = this.calculateCartTotal(items);

    const { handleChange, handleSubmit, handleSelect, handleCancel } = this;

    return (
      <>
        <h3>Review Your Cart</h3>
        {items.map((item) => (
          <div key={item.id}>
            <div className="containerLeft">
              <img src={item.imageUrl} alt={`picture of ${item.name}`} />
            </div>
            <div className="containerRight">
              <p>{item.name}</p>
              <p>${item.price / 100}</p>
              <p>{item.orderHotSauce.quantity}</p>
              <h4>${(item.price / 100) * item.orderHotSauce.quantity}.00</h4>
            </div>
          </div>
        ))}
        <h3>Order Total: ${total}.00</h3>
        <div>
          <form id="checkoutForm" onSubmit={handleSubmit}>
            {this.props.auth ? (
              <div>
                <h3>Contact Information</h3>

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={auth.email}
                />

                <h3>Shipping Information</h3>

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
                <h3>Contact Information</h3>

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />

                <h3>Shipping Information</h3>

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

            <h3>Payment Information</h3>

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
            <Link to="/confirmation">
              <button type="submit" id="placeOrder">
                Place Order
              </button>
            </Link>
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
    updateCartTotal: (orderId, amount) =>
      dispatch(updateCartTotal(orderId, amount)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
