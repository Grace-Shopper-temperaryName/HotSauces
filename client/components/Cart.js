import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";

export class Cart extends Component {
  constructor() {
    super();
    this.calculateSubTotal = this.calculateSubTotal.bind(this);
    this.calculateTax = this.calculateTax.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }
  calculateSubTotal(items) {
    return (
      items.reduce((sum, item) => {
        sum += item.price * item.orderHotSauce.quantity;
        return sum;
      }, 0) / 100
    );
  }

  calculateTax(items) {
    return (
      (items.reduce((sum, item) => {
        sum += item.price * item.orderHotSauce.quantity;
        return sum;
      }, 0) *
        0.08) /
      100
    );
  }

  calculateTotal(items) {
    const subTotal = this.calculateSubTotal(items);
    const tax = this.calculateTax(items);
    return subTotal + tax;
  }

  render() {
    const items = this.props.parentItems
      ? this.props.parentItems
      : this.props.cart.hotSauces || [];
    const { calculateSubTotal, calculateTax, calculateTotal } = this;
    const subTotal = calculateSubTotal(items);
    return (
      <div>
        <h2>Cart</h2>
        {items.map((item) => (
          <div className="container" key={item.id}>
            <div className="containerLeft">
              <img src={item.imageUrl} alt={`picture of ${item.name}`} />
            </div>
            <div className="containerRight">
              <p>{item.name}</p>
              <p>${item.price / 100}</p>
              <p>{item.orderHotSauce.quantity}</p>
              <p>
                <strong>
                  ${(item.price / 100) * item.orderHotSauce.quantity}
                </strong>
              </p>
            </div>
          </div>
        ))}
        <p>Subtotal: ${subTotal}</p>
        <p>Tax: ${calculateTax(items)}</p>
        <p>Total: ${calculateTotal(items)}</p>
        {this.props.parentItems ? (
          ""
        ) : (
          <Link to="/checkout">
            <button>Purchase</button>
          </Link>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    customerId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (customerId) => dispatch(fetchCart(customerId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
