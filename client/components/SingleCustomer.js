import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleCustomer } from '../store/singleCustomer';

export class SingleCustomer extends React.Component {
  componentDidMount() {
    this.props.fetchSingleCustomer(this.props.match.params.id);
  }

  render() {
    const { singleCustomer } = this.props;
    const { orders } = singleCustomer || [];
    return (
      <div>
        <div id="singleCustomer">
          <div className="container" id="customerInfo">
            <div className="containerLeft">
              <h1>{`${singleCustomer.firstName} ${singleCustomer.lastName}`}</h1>
            </div>
            <div className="containerRight">
              <small>Email:</small>
              <p>{singleCustomer.email}</p>
              <small>Address:</small>
              <p>{singleCustomer.streetAddress}</p>
              <p>{singleCustomer.city}</p>
              <p>{singleCustomer.state}</p>
              <p>{singleCustomer.zip}</p>
            </div>
          </div>
          <h2>Order History</h2>
          {orders ? (
            orders.length > 0 ? (
              orders.map((order) => (
                <div className="container" id="customerOrders">
                  <div className="containerLeft">
                    <h3>{order.orderStatus}</h3>
                  </div>
                  <div className="containerRight">
                    <small>Cart:</small>
                    <span>{order.isCart}</span>
                    <p>{order.orderDate}</p>
                    <p>{order.amount}</p>
                    <small>Payment:</small>
                    <p>{order.paymentStatus}</p>
                    <p>{order.provider}</p>
                    <p>{order.cardNumber}</p>
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
