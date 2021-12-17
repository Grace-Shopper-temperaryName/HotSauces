import axios from "axios";
import history from "../history";

const SET_SINGLE_CUSTOMER = "SET_SINGLE_CUSTOMER";

export const setSingleCustomer = (customer) => {
  return {
    type: SET_SINGLE_CUSTOMER,
    customer,
  };
};

export const fetchSingleCustomer = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: customer } = await axios.get(`/api/customers/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setSingleCustomer(customer));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
}
