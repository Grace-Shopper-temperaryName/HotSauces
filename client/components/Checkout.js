import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../store/auth";
import { Cart } from "./Cart";
import { EditCustomer } from "./EditCustomer";
import {
  addCartItem,
  subtractCartItem,
  deleteFromCart,
  fetchCart,
} from "../store/cart";

export class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchAuthCustomer();
  }

  render() {
    const items = this.props.cart.hotSauces || [];
    const { cardProvider, cardNumber } = this.props.cart;
    const providers = ["americanexpress", "mastercard", "visa"];
    return (
      <div>
        <Cart
          parentItems={items}
          addCartItem={addCartItem}
          subtractCartItem={subtractCartItem}
          deleteFromCart={deleteFromCart}
          fetchCart={fetchCart}
        />
        <h3>Billing info:</h3>
        <EditCustomer
          parentAuth={this.props.auth}
          fetchAuthCustomer={this.props.fetchAuthCustomer}
        />
        <h4>Payment info:</h4>
        <form>
          <select name="provider">
            {providers.map((provider, index) => {
              if (provider === cardProvider) {
                return (
                  <option value={provider} key={`provider_${index}`} selected>
                    {provider}
                  </option>
                );
              } else {
                return (
                  <option value={provider} key={`provider_${index}`}>
                    {provider}
                  </option>
                );
              }
            })}
          </select>
          <input id="cardNumber" defaultValue={cardNumber || ""}></input>
        </form>
        <Link to="/confirmation">
          <button id="confirmPurchase">Confirm Purchase</button>
        </Link>
        <Link to="/cart">
          <button id="cancelOrder">Cancel Order</button>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};
const mapDispatch = (dispatch, { history }) => {
  return {
    fetchAuthCustomer: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
