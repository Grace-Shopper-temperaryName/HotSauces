import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart, addToCart } from "../store/cart";

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart(this.props.customerId);
  }

  render() {
    const items = this.props.cart.hotSauces || [];
    const { name, price, imageUrl } = items;
    const { quantity } = items.orderHotSauce || 1;
    return (
      <div>
        {items.map((item) => (
          <div className="container" key={item.id}>
            <div className="containerLeft">
              <img src={imageUrl} alt={`picture of ${name}`} />
            </div>
            <div className="containerRight">
              <p>{name}</p>
              <p>${price / 100}</p>
              <p>{quantity}</p>
            </div>
          </div>
        ))}
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
