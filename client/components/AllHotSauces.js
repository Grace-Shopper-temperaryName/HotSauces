import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHotSauces } from "../store/hotSauces";
import { Link } from "react-router-dom";

export class AllHotSauces extends Component {
  componentDidMount() {
    this.props.loadHotSauces();
  }

  render() {
    const { hotSauces } = this.props;
    return (
      <div>
        <h1 className="text">All the Sauce</h1>
        <div id="allSauces">
          {hotSauces.map((hotSauce) => (
            <div className="container" key={hotSauce.id}>
              <div className="containerLeft">
                <img
                  src={hotSauce.imageUrl}
                  alt={`picture of ${hotSauce.name}`}
                />
              </div>
              <Link to={`/hotsauces/${hotSauce.id}`}>
                <div className="containerRight">
                  <p>{hotSauce.name}</p>
                  <p>${hotSauce.price / 100}</p>
                  <p>🔥{hotSauce.heatLevel} / 10</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { hotSauces: state.hotSauces };
};

const mapDispatch = (dispatch) => {
  return {
    loadHotSauces: () => dispatch(fetchHotSauces()),
  };
};

export default connect(mapState, mapDispatch)(AllHotSauces);
