import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleHotSauce } from '../store/singleHotSauce';

export class SingleHotSauce extends React.Component {
  componentDidMount() {
    this.props.fetchSingleHotSauce(this.props.match.params.hotSauceId);
  }

  render() {
    const singleHotSauce = this.props;
    return (
      <div>
        <center>
          <h1> Single Hot Sauce </h1>
          <div>
            <div>
              <p> {singleHotSauce.imageUrl}</p>
              <h2>{singleHotSauce.name}</h2>
              <p> (fire emoji here) {singleHotSauce.heatLevel}</p>
              <p>{singleHotSauce.price}</p>
              <p>{singleHotSauce.stock}</p>
              <p>{singleHotSauce.sku}</p>
              <p>{singleHotSauce.description}</p>
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
    fetchSingleHotSauce: (hotSauceId) =>
      dispatch(fetchSingleHotSauce(hotSauceId)),
  };
};

export default connect(mapState, mapDispatch)(SingleHotSauce);
