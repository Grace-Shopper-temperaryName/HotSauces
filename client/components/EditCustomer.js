import React, { Component } from "react";
import { connect } from "react-redux";
import { me } from "../store/auth";
import { updateCustomer } from "../store/customers";

export class EditCustomer extends Component {
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
    if (this.props.parentAuth) {
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
      } = this.props.parentAuth;
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
    } else {
      this.props.fetchAuthCustomer();
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.auth) {
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
    const { handleChange, handleCancel, handleSubmit } = this;
    return (
      <div>
        {this.props.parentAuth ? "" : <h2>Edit Personal Info</h2>}
        <form id="edit-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone Number</label>
          <input
            type="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {this.props.parentAuth ? (
            ""
          ) : (
            <>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </>
          )}
          <label htmlFor="streetAddress">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={streetAddress}
            onChange={handleChange}
          />
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={city} onChange={handleChange} />
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={handleChange}
          />
          <label htmlFor="zip">Zip Code</label>
          <input type="text" name="zip" value={zip} onChange={handleChange} />
          {this.props.parentAuth ? (
            ""
          ) : (
            <>
              <button type="submit" id="saveChanges">
                Save Changes
              </button>
              <button onClick={handleCancel} id="cancelChanges">
                Cancel Changes
              </button>
            </>
          )}
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchAuthCustomer: () => dispatch(me()),
    updateCustomer: (updatedCustomer) =>
      dispatch(updateCustomer(updatedCustomer, history)),
  };
};

export default connect(mapState, mapDispatch)(EditCustomer);
