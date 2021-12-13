import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_CUSTOMERS = "SET_CUSTOMERS";
const CREATE_SINGLE_CUSTOMER = "CREATE_SINGLE_CUSTOMER";

/**
 * ACTION CREATORS
 */
const setCustomers = (customers) => ({ type: SET_CUSTOMERS, customers });

const createSingleCustomer = (customer) => {
  return {
    type: CREATE_SINGLE_CUSTOMER,
    customer,
  };
};
/**
 * THUNK CREATORS
 */
export const fetchCustomers = () => {
  return async (dispatch) => {
    try {
      const { data: customers } = await axios.get("/api/customers");
      dispatch(setCustomers(customers));
    } catch (err) {
      console.error(err);
    }
  };
};

export const createYourSingleCustomer = (customer) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/customers", customer);
      dispatch(createSingleCustomer(data));
      history.push("/home");
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
    case CREATE_CUSTOMERS:
      return action.customers;
    default:
      return state;
  }
}
