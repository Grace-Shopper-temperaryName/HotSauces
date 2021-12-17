import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewHotSauce } from "../store/hotSauces";

class AddHotSauce extends Component {
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createNewHotSauce({ ...this.state });
    this.setState({
      name: "Hot Sauce",
      heatLevel: 1,
      price: 0,
      stock: 0,
      imageUrl: "",
      sku: "",
      description: "",
    });
  }

  render() {
    const { name, heatLevel, price, stock, imageUrl, sku, description } =
      this.state;
    return (
      <form id="create-form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <label htmlFor="heatLevel">Heat Level</label>
        <input
          type="number"
          name="heatLevel"
          value={heatLevel}
          onChange={this.handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={this.handleChange}
        />
        <label htmlFor="stock">Stock</label>
        <input
          type="text"
          name="stock"
          value={stock}
          onChange={this.handleChange}
        />
        <label htmlFor="imageUrl">Image Link</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={this.handleChange}
        />
        <label htmlFor="sku">Sku #</label>
        <input
          type="text"
          name="sku"
          value={sku}
          onChange={this.handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <button type="submit">Create</button>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createNewHotSauce: (hotSauce) => dispatch(createNewHotSauce(hotSauce)),
  };
};

export default connect(null, mapDispatch)(AddHotSauce);
