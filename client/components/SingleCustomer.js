import React from "react";
import { connect } from "react-redux";
import { fetchSingleCustomer } from "../store/singleCustomer";

export class SingleCustomer extends React.Component {
  componentDidMount() {
    this.props.fetchSingleCustomer(this.props.match.params.id);
  }

  render() {
    const { singleCustomer } = this.props;
    const { orders } = singleCustomer || [];
    return (
      <div id="singleCustomer" className="component-container">
        <h1>Customer Info</h1>
        <div className="container" id="customerInfo">
          <h2>{`${singleCustomer.firstName} ${singleCustomer.lastName}`}</h2>
          <div className="containerRight">
            <table className="customer-details">
              <tbody>
                <tr>
                  <td>id: </td>
                  <td>{singleCustomer.id}</td>
                </tr>
                <tr>
                  <td>email: </td>
                  <td>{singleCustomer.email}</td>
                </tr>
                <tr>
                  <td>address: </td>
                  <td>
                    <p id="address-table">
                      {singleCustomer.streetAddress}
                      <br />
                      {singleCustomer.city}
                      <br />
                      {singleCustomer.state}
                      <br />
                      {singleCustomer.zip}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h2>Order History</h2>
        <div className="all-items">
          {orders ? (
            orders.length > 0 ? (
              orders.map((order) => (
                <div className="container" id="customerOrders" key={order.id}>
                  <div className="containerLeft">
                    <h3>{order.orderDate.slice(0, 10)}</h3>
                  </div>
                  <div className="containerRight">
                    <table>
                      <tbody>
                        {order.isCart && (
                          <tr>
                            <td>Cart:</td>
                            <td>{order.isCart}</td>
                          </tr>
                        )}
                        <tr>
                          <td>total: </td>
                          <td>${order.amount / 100}</td>
                        </tr>
                        <tr>
                          <td>payment status: </td>
                          <td>
                            <strong>{order.paymentStatus}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>payment provider: </td>
                          <td>{order.provider}</td>
                        </tr>
                        <tr>
                          <td>payment card #: </td>
                          <td>{order.cardNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <h4>This customer has no order history.</h4>
            )
          ) : (
            <h4>This customer has no order history.</h4>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { singleCustomer: state.singleCustomer };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleCustomer: (id) => dispatch(fetchSingleCustomer(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleCustomer);
