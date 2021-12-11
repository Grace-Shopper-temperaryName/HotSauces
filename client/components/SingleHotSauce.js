import React from "react";
import { connect } from "react-redux";
import { fetchSingleHotSauce } from "../store/singleHotSauce";

export class SingleHotSauce extends React.Component {
  componentDidMount() {
    this.props.fetchSingleHotSauce(this.props.match.params.id);
  }

  render() {
    const { singleHotSauce } = this.props;
    const stock = singleHotSauce.stock || 1;
    return (
      <div>
        <center>
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
                </div>
              )}
            </div>
          </div>
        </center>
      </div>
    );
  }
}

const mapState = (state) => {
  return { singleHotSauce: state.singleHotSauce };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleHotSauce: (id) => dispatch(fetchSingleHotSauce(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleHotSauce);
