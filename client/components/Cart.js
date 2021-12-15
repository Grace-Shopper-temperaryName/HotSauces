import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, addToCart } from "../store/cart";

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.customerId);
  }

  render() {
    const items = this.props.cart.hotSauces || [];
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
              <p>{item.orderHotSauce.quantity}</p>
            </div>
          </div>
        ))}
        <Link to="/confirmation">
          <button>Purchase</button>
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
    addToCart: (hotSauceId, quantity, cart) =>
      dispatch(addToCart(hotSauceId, quantity, cart)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
