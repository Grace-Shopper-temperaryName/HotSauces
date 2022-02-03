import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <div className='landingpage'>
        <img src='home.JPG' />
        <div className='text-box'>
          <h1> Simple, Natural, Hot Sauce </h1>
          <Link to='/hotsauces'>
            <button>See Our Collection Here</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default LandingPage;
