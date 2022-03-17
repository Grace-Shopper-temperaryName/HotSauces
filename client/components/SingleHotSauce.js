import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleHotSauce } from "../store/singleHotSauce";
import { fetchCart, addToCart, addToLocalCart } from "../store/cart";

export class SingleHotSauce extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleHotSauce(this.props.match.params.id);
    if (this.props.customerId) {
      this.props.fetchCart(this.props.customerId);
    } else {
      /* edit to use only localStorage for non-logged in user, no db */
      // const cart = this.props.makeOrder();
      // window.localStorage.setItem("cart", JSON.stringify(cart));
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
      this.props.addToCart(
        singleHotSauce.id,
        this.state.quantity,
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
          this.props.customerId,
          this.props.singleHotSauce.price
        );
      }
    }
  }

  render() {
    const { singleHotSauce, isAdmin } = this.props;
    const stock = singleHotSauce.stock || 0;
    const { quantity } = this.state || 0;
    return (
      <div id="singleHotSauce" className="component-container">
        <div className="container">
          <div className="containerLeft">
            <img
              src={singleHotSauce.imageUrl}
              alt={`picture of ${singleHotSauce.name}`}
            />
          </div>
          <div className="containerRight">
            {stock < 1 ? (
              <h1>OUT OF STOCK!</h1>
            ) : (
              <>
                <h2>{singleHotSauce.name}</h2>
                <span> ${singleHotSauce.price / 100} </span>
                <span>
                  <small>
                    {Array.apply(null, Array(singleHotSauce.heatLevel)).map(
                      () => `🔥`
                    )}
                  </small>
                  {singleHotSauce.heatLevel < 10 ? (
                    <small className="flame-gradient">
                      {Array.apply(
                        null,
                        Array(10 - singleHotSauce.heatLevel)
                      ).map(() => `🔥`)}
                    </small>
                  ) : (
                    ""
                  )}
                </span>
                <span>{singleHotSauce.description}</span>
                <form
                  id="add-item-to-cart"
                  className="container"
                  onSubmit={this.handleAdd}
                >
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={this.handleChange}
                  ></input>
                  <button type="submit">Add to Cart</button>
                  {isAdmin ? (
                    <Link to={`/hotsauces/${singleHotSauce.id}/edit`}>
                      <button id="edit-hotSauce" className="change-btns">
                        Edit Hot Sauce
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </form>
              </>
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
    fetchCart: (customerId) => dispatch(fetchCart(customerId)),
    addToCart: (hotSauceId, quantity, cartId, customerId, price) =>
      dispatch(addToCart(hotSauceId, quantity, cartId, customerId, price)),
    addToLocalCart: (hotSauceId, quantity, cartId, customerId, price) =>
      dispatch(addToLocalCart(hotSauceId, quantity, cartId, customerId, price)),
  };
};

export default connect(mapState, mapDispatch)(SingleHotSauce);
