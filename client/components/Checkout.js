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
  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  handleSelect(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit() {}
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
              <select placeholder="State" name="state" onChange={handleSelect}>
                <option disabled>State</option>
                <option value={state}>Alabama</option>
                <option value={state}>Alaska</option>
                <option value={state}>Arizona</option>
                <option value={state}>Arkansas</option>
                <option value={state}>California</option>
                <option value={state}>Colorado</option>
                <option value={state}>Connecticut</option>
                <option value={state}>Delaware</option>
                <option value={state}>Florida</option>
                <option value={state}>Georgia</option>
                <option value={state}>Hawaii</option>
                <option value={state}>Idaho</option>
                <option value={state}>Illinois</option>
                <option value={state}>Indiana</option>
                <option value={state}>Iowa</option>
                <option value={state}>Kansas</option>
                <option value={state}>Kentucky</option>
                <option value={state}>Louisiana</option>
                <option value={state}>Maine</option>
                <option value={state}>Maryland</option>
                <option value={state}>Massachusetts</option>
                <option value={state}>Michigan</option>
                <option value={state}>Minnesota</option>
                <option value={state}>Mississippi</option>
                <option value={state}>Missouri</option>
                <option value={state}>Montana</option>
                <option value={state}>Nebraska</option>
                <option value={state}>Nevada</option>
                <option value={state}>New Hampshire</option>
                <option value={state}>New Jersey</option>
                <option value={state}>New Mexico</option>
                <option value={state}>New York</option>
                <option value={state}>North Carolina</option>
                <option value={state}>North Dakota</option>
                <option value={state}>Ohio</option>
                <option value={state}>Oklahoma</option>
                <option value={state}>Oregon</option>
                <option value={state}>Pennsylvania</option>
                <option value={state}>Rhode Island</option>
                <option value={state}>South Carolina</option>
                <option value={state}>South Dakota</option>
                <option value={state}>Tennessee</option>
                <option value={state}>Texas</option>
                <option value={state}>Utah</option>
                <option value={state}>Vermont</option>
                <option value={state}>Virginia</option>
                <option value={state}>Washington</option>
                <option value={state}>West Virginia</option>
                <option value={state}>Wisconsin</option>
                <option value={state}>Wyoming</option>
              </select>
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
