import axios from "axios";
import history from "../history";

const SET_SINGLE_CUSTOMER = "SET_SINGLE_CUSTOMER";
const CREATE_SINGLE_CUSTOMER = "CREATE_SINGLE_CUSTOMER";

export const setSingleCustomer = (customer) => {
  return {
    type: SET_SINGLE_CUSTOMER,
    customer,
  };
};

export const createSingleCustomer = (customer) => {
  return {
    type: CREATE_SINGLE_CUSTOMER,
    customer,
  };
};

export const fetchSingleCustomer = (id) => {
  return async (dispatch) => {
    try {
      const { data: customer } = await axios.get(`/api/customers/${id}`);
      dispatch(setSingleCustomer(customer));
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

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_CUSTOMER:
      return action.customer;
    case SET_SINGLE_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
}
