import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addCartItem,
  subtractCartItem,
  deleteFromCart,
  fetchCart,
} from "../store/cart";

export class Cart extends Component {
  render() {
    const items = this.props.cart.hotSauces || [];
    const { addCartItem, subtractCartItem, deleteFromCart, cart, customerId } =
      this.props;
    return (
      <div>
        {items.map((item) => (
          <div className="container" key={item.id}>
            <div className="containerLeft">
              <img src={item.imageUrl} alt={`picture of ${item.name}`} />
            </div>
            <div className="containerRight">
              <p>{item.name}</p>
              <p>${item.price / 100}</p>
              <button onClick={() => addCartItem(cart.id, item.id, customerId)}>
                +
              </button>
              <p>{item.orderHotSauce.quantity}</p>
              <button
                onClick={() => subtractCartItem(cart.id, item.id, customerId)}
              >
                -
              </button>
              <button
                onClick={() => deleteFromCart(cart.id, item.id, customerId)}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
        <Link to="/confirmation">
          <button>Checkout</button>
        </Link>
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
    deleteFromCart: (orderId, hotSauceId, customerId) =>
      dispatch(deleteFromCart(orderId, hotSauceId, customerId)),
    addCartItem: (orderId, hotSauceId, customerId) =>
      dispatch(addCartItem(orderId, hotSauceId, customerId)),
    subtractCartItem: (orderId, hotSauceId, customerId) =>
      dispatch(subtractCartItem(orderId, hotSauceId, customerId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
