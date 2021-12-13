import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCustomers } from "../store/customers";
import { Link } from "react-router-dom";

export class AllCustomers extends Component {
  componentDidMount() {
    this.props.loadCustomers();
  }
  render() {
    const { customers } = this.props;
    return (
      <div>
        <h1>Customers</h1>
        <div id="allCustomers">
          {customers.map((customer) => (
            <div className="container" key={customer.id}>
              <div className="containerLeft">
                <h3>{customer.name}</h3>
              </div>
              <Link to={`/customers/${customer.id}`}>
                <div className="containerRight">
                  <small>Email:</small>
                  <p>{customer.email}</p>
                  <small>Address:</small>
                  <p>{customer.streetAddress}</p>
                  <p>{customer.city}</p>
                  <p>{customer.state}</p>
                  <p>{customer.zip}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { customers: state.customers };
};

const mapDispatch = (dispatch) => {
  return {
    loadCustomers: () => dispatch(fetchCustomers()),
  };
};

export default connect(mapState, mapDispatch)(AllCustomers);
