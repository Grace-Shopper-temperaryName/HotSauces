import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_CUSTOMERS = "SET_CUSTOMERS";
const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
const DELETE_CUSTOMER = "DELETE_CUSTOMER";

/**
 * ACTION CREATORS
 */
const setCustomers = (customers) => ({ type: SET_CUSTOMERS, customers });
const _updateCustomer = (customer) => ({ type: UPDATE_CUSTOMER, customer });
const _deleteCustomer = (customer) => ({ type: DELETE_CUSTOMER, customer });

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

export const updateCustomer = (updatedCustomer) => {
  return async (dispatch) => {
    try {
      const { data: customer } = await axios.put(
        `/api/customers/${updatedCustomer.id}`,
        updatedCustomer
      );
      dispatch(_updateCustomer(customer));
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCustomer = (id) => {
  return async (dispatch) => {
    try {
      const { data: customer } = await axios.delete(`api/customers/${id}`);
      dispatch(_deleteCustomer(customer));
    } catch (error) {
      console.error(error);
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
    case DELETE_CUSTOMER:
      return state.filter((customer) => customer.id !== action.customer.id);
    case UPDATE_CUSTOMER:
      return state.map((customer) =>
        customer.id === action.customer.id ? action.customer : customer
      );
    default:
      return state;
  }
}
