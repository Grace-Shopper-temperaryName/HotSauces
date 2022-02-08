import React, { Component } from "react";
import { connect } from "react-redux";
import { updateHotSauce } from "../store/hotSauces";
import { fetchSingleHotSauce } from "../store/singleHotSauce";

class EditHotSauce extends Component {
  constructor() {
    super();
    this.state = {
      name: "Hot Sauce",
      heatLevel: 1,
      price: 100,
      stock: 1,
      imageUrl:
        "https://www.seriouseats.com/thmb/zYBegAMss850pXr_oWtXnfQ1wM4=/1500x1125/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2021__02__20210128-fermented-hot-sauce-charred-fresno-tamari-vicky-wasik-ec8e5f05468443f9adc456686fbff1c9.jpg",
      sku: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateHotSauce({ ...this.props.singleHotSauce, ...this.state });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.goBack();
  }
  componentDidMount() {
    this.props.fetchSingleHotSauce(this.props.match.params.id);
  }
  componentDidUpdate(previousProps) {
    const { name, heatLevel, price, stock, imageUrl, sku, description } =
      this.props.singleHotSauce;
    if (this.props.singleHotSauce !== previousProps.singleHotSauce) {
      this.setState({
        name: name || "",
        heatLevel: heatLevel || 1,
        price: price || 100,
        stock: stock || 1,
        imageUrl: imageUrl || "",
        sku: sku || 999999999,
        description: description || "",
      });
    }
  }

  render() {
    const { name, heatLevel, price, stock, imageUrl, sku, description } =
      this.state;
    const { handleChange, handleCancel, handleSubmit } = this;
    return (
      <div id="edit-hotSauce" className="component-container">
        <h2>Edit Hot Sauce info</h2>
        <form id="edit-form" className="container" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
          <label htmlFor="heatLevel">Heat Level</label>
          <input
            type="number"
            name="heatLevel"
            value={heatLevel}
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleChange}
          />
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            name="stock"
            value={stock}
            onChange={handleChange}
          />
          <label htmlFor="imageUrl">Image Link</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="sku">Sku #</label>
          <input type="text" name="sku" value={sku} onChange={handleChange} />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <button type="submit" id="saveChanges">
            Save Changes
          </button>
          <button onClick={handleCancel} className="cancelChanges">
            Cancel Changes
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleHotSauce: state.singleHotSauce,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleHotSauce: (id) => dispatch(fetchSingleHotSauce(id)),
    updateHotSauce: (hotSauce) => dispatch(updateHotSauce(hotSauce)),
  };
};

export default connect(mapState, mapDispatch)(EditHotSauce);
