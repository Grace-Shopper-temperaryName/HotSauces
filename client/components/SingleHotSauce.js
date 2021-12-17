import React from "react";
import { connect } from "react-redux";
import { fetchSingleHotSauce } from "../store/singleHotSauce";

import { Link } from "react-router-dom";

import { addToCart, createOrder, addToLocalCart } from "../store/cart";


export class SingleHotSauce extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.props.fetchSingleHotSauce(this.props.match.params.id);
    if (!this.props.customerId) {
      const cart = await this.props.makeOrder();

      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleAdd(event) {
    event.preventDefault();
    if (this.props.customerId) {
      const { singleHotSauce, customerId } = this.props;
      if (!this.props.cartId) {
        this.props.makeOrder();
      }
      const { quantity } = this.state;
      this.props.addToCart(
        singleHotSauce.id,
        quantity,
        this.props.cartId,
        customerId,
        singleHotSauce.price
      );
    } else {
      if (window.localStorage.cart) {
        const cart = JSON.parse(localStorage.getItem("cart"));

        this.props.addToCart(
          this.props.singleHotSauce.id,
          this.state.quantity,
          cart.id,
          this.props.singleHotSauce.price
        );
      }
    }
  }

  render() {
    const { singleHotSauce, isAdmin } = this.props;
    const stock = singleHotSauce.stock || 1;
    const { quantity } = this.state || 1;
    return (
      <div id="singleHotSauce">
        <h1> {singleHotSauce.name} </h1>
        <div className="container" id="hotSauce">
          <div className="containerLeft">
            <img
              className="img"
              src={singleHotSauce.imageUrl}
              alt={`picture of ${singleHotSauce.name}`}
            />

          </div>
          <div className="containerRight">
            {stock < 1 ? (
              <h1> OUT OF STOCK! </h1>
            ) : (
              <div>
                <h2>{singleHotSauce.name}</h2>
                <p> ${singleHotSauce.price / 100} </p>
                <p> 🔥 {singleHotSauce.heatLevel} / 10</p>
                <p>{singleHotSauce.description}</p>
                <form id="add-item-to-cart" onSubmit={this.handleAdd}>
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={this.handleChange}
                  ></input>
                  <button type="submit">Add to Cart</button>
                </form>
                {isAdmin ? (
                  <Link to={`/hotsauces/${singleHotSauce.id}/edit`}>
                    <button>Edit Hot Sauce</button>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleHotSauce: state.singleHotSauce,
    cartId: state.cart.id,
    customerId: state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    guest: state.guest,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleHotSauce: (id) => dispatch(fetchSingleHotSauce(id)),
    addToCart: (hotSauceId, quantity, cartId, customerId, price) =>
      dispatch(addToCart(hotSauceId, quantity, cartId, customerId, price)),
    addToLocalCart: (hotSauceId, quantity, cartId, customerId, price) =>
      dispatch(addToLocalCart(hotSauceId, quantity, cartId, customerId, price)),
    makeOrder: () => dispatch(createOrder()),
  };
};

export default connect(mapState, mapDispatch)(SingleHotSauce);
