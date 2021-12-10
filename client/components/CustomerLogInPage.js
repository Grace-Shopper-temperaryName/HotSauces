import React from 'react';

export class CustomerLogInPage extends React.Component {
  render() {
    return (
      <div>
        <center>
          <h1 id="center"> HELLO </h1>
          <h2 id="center"> Welcome Back to Hot n' Saucy! </h2>
        </center>
      </div>
    );
  }
}

const mapState = (state) => {
  return { singleCustomer: state.singleCustomer };
};

const mapDispatch = (dispatch) => {
  return {
    createSingleCustomer: (customer) =>
      dispatch(createYourSingleCustomer(customer)),
  };
};

export default connect(mapState, mapDispatch)(CustomerLogInPage);
