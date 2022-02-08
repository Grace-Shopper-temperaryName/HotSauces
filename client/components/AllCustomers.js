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
      <div id="allCustomers" className="component-container">
        <h1>All Customers</h1>
        <div className="all-items">
          {customers.map((customer) => (
            <div
              id="customer-container"
              className="container"
              key={customer.id}
            >
              <Link to={`/customers/${customer.id}`}>
                <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
              </Link>
              <table className="customer-details">
                <tbody>
                  <tr>
                    <td>id: </td>
                    <td>{customer.id}</td>
                  </tr>
                  <tr>
                    <td>email: </td>
                    <td>{customer.email}</td>
                  </tr>
                  <tr>
                    <td>address: </td>
                    <td>
                      <p id="address-table">
                        {customer.streetAddress}
                        <br />
                        {customer.city}
                        <br />
                        {customer.state}
                        <br />
                        {customer.zip}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
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
