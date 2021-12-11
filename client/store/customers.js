import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_CUSTOMERS = 'SET_CUSTOMERS';

/**
 * ACTION CREATORS
 */
const setCutomers = (customers) => ({ type: SET_CUSTOMERS, customers });

/**
 * THUNK CREATORS
 */
export const fetchCustomers = () => {
  return async (dispatch) => {
    try {
      const { data: customers } = await axios.get('/api/customers');
      dispatch(setCutomers(customers));
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_CUSTOMERS:
      return action.customers;
    default:
      return state;
  }
}
