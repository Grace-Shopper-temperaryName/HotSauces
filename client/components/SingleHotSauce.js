import React from "react";
import { connect } from "react-redux";
import { fetchSingleHotSauce } from "../store/singleHotSauce";
import { addToCart } from "../store/cart";

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
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleAdd(event) {
    event.preventDefault();
    const { singleHotSauce, cartId, customerId } = this.props;
    const { quantity } = this.state;
    console.log("SINGLE HOT SAUCE ID", singleHotSauce.id);
    console.log("QUANTITTY", quantity);
    this.props.addToCart(singleHotSauce.id, quantity, cartId, customerId);
  }

  render() {
    const { singleHotSauce } = this.props;
    const stock = singleHotSauce.stock || 1;
    const { quantity } = this.state || 1;
    console.log("PROPS!!!!!!!!!! ", this.props);
    return (
      <div className="container">
        <h1> Hot 'n' Saucy Hot Sauce </h1>
        <div id="singleHotSauce">
          <div>
            <img
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleHotSauce: (id) => dispatch(fetchSingleHotSauce(id)),
    addToCart: (hotSauceId, quantity, cartId, customerId) =>
      dispatch(addToCart(hotSauceId, quantity, cartId, customerId)),
  };
};

export default connect(mapState, mapDispatch)(SingleHotSauce);
