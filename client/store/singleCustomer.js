import axios from 'axios';
import history from '../history';

const CREATE_SINGLE_CUSTOMER = 'CREATE_SINGLE_CUSTOMER';

export const createSingleCustomer = (customer) => {
  return {
    type: CREATE_SINGLE_CUSTOMER,
    customer,
  };
};

export const createYourSingleCustomer = (customer) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/customers', customer);
      dispatch(createSingleCustomer(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_SINGLE_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
}
