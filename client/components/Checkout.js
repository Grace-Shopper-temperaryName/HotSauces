import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../store/auth";
/*
loggedIn customer info: populated form for delivery address, payment info,
guest customer: blank form for delivery address, payment info
render cart component
purchase/place order button - onSubmit/handleSubmit...
*/

export class Checkout extends Component {
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
  }
  componentDidMount() {
    this.props.loadAuthCustomer();
  }
  //componentWillUnmount-- clear local storage cart here??

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  handleSelect(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit() {
    //change current orderStatus to "pending payment"
    //change order's paymentStatus to "pending"
    //redirect to confirmation component view
    //clear cart in store? here or componentWillUnmount?
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
    } = this.state;
    const { handleChange, handleSubmit, handleSelect } = this;
    //if guest- use input from this.state
    //if auth customer- populate form from this.props
    return (
      //ADD cart here above form?  <Cart insideCheckout={true} />
      <>
        <div>
          <form method="post" onSubmit={handleSubmit}>
            <label>Contact Information</label>
            <input
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={email}
            />

            <label>Shipping Information</label>
            <span>
              <input
                placeholder="First name"
                name="firstName"
                onChange={handleChange}
                value={firstName}
              />

              <input
                placeholder="Last name"
                name="lastName"
                onChange={handleChange}
                value={lastName}
              />
            </span>

            <input
              placeholder="Street Address"
              name="streetAddress"
              onChange={handleChange}
              value={streetAddress}
            />

            <input
              placeholder="City"
              name="city"
              onChange={handleChange}
              value={city}
            />

            <span>
              <input
                placeholder="State"
                name="state"
                onChange={handleChange}
                value={state}
              />
              
              <input
                placeholder="ZIP code"
                name="zip"
                onChange={handleChange}
                value={zip}
              />
            </span>

            <input
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              value={phone}
            />

            <label>Payment Information</label>
            <select
              placeholder="Credit card provider"
              name="provider"
              onChange={handleSelect}
            >
              <option disabled>Card type</option>
              <option value={provider}>American Express</option>
              <option value={provider}>Mastercard</option>
              <option value={provider}>Visa</option>
            </select>

            <input
              placeholder="Card number"
              name="cardNumber"
              value={cardNumber}
            />
          </form>

          <button type="submit">Place Order</button>
        </div>
      </>
      //ADD here at bottom, before Place Order button? <Cart insideCheckout={true} />
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    loadAuthCustomer: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
