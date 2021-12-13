import React, { Component } from "react";
import { connect } from "react-redux";
import { me } from "../store/auth";
import { updateCustomer } from "../store/customers";

class EditCustomer extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateCustomer({ ...this.props.auth, ...this.state });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.push(`/home`);
  }

  componentDidMount() {
    this.props.fetchAuthCustomer();
  }

  componentDidUpdate(previousProps) {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      streetAddress,
      city,
      state,
      zip,
    } = this.props.auth;
    if (this.props.auth !== previousProps.auth) {
      this.setState({
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
        email: email || "",
        password: password || "",
        streetAddress: streetAddress || "",
        city: city || "",
        state: state || "",
        zip: zip || "",
      });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      streetAddress,
      city,
      state,
      zip,
    } = this.state;
    return (
      <form id="edit-form">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="phone"
          name="phone"
          value={phone}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <label htmlFor="streetAddress">Street Address</label>
        <input
          type="text"
          name="streetAddress"
          value={streetAddress}
          onChange={this.handleChange}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={this.handleChange}
        />
        <label htmlFor="state">State</label>
        <input
          type="text"
          name="state"
          value={state}
          onChange={this.handleChange}
        />
        <label htmlFor="zip">Zip Code</label>
        <input
          type="text"
          name="zip"
          value={zip}
          onChange={this.handleChange}
        />
        <button type="submit" id="saveChanges" onSubmit={this.handleSubmit}>
          Save Changes
        </button>
        <button type="submit" onSubmit={this.handleCancel}>
          Cancel Changes
        </button>
      </form>
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
    fetchAuthCustomer: () => dispatch(me()),
    updateCustomer: (updatedCustomer) =>
      dispatch(updateCustomer(updatedCustomer)),
  };
};

export default connect(mapState, mapDispatch)(EditCustomer);
