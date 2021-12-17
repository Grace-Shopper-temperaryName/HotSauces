import axios from "axios";
import history from "../history";

const token = window.localStorage.getItem("token");
// Action Types
const SET_CART = "SET_CART";

// Action Creators
const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

//Thunk Creators
export const fetchCart = (customerId) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/cart/${customerId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCart(cart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCart = (hotSauceId, quantity, orderId, customerId) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/cart/${customerId}/${orderId}`, {
        body: { hotSauceId: hotSauceId, quantity: quantity },
        headers: {
          authorization: token,
        },
      });
      dispatch(fetchCart(customerId));
      history.goBack();
    } catch (error) {
      console.error(error);
    }
  };
};

export const addCartItem = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/${orderId}/add`, {
        body: { hotSauceId: hotSauceId, customerId: customerId },
        headers: {
          authorization: token,
        },
      });
      dispatch(fetchCart(customerId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const subtractCartItem = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/${orderId}/subtract`, {
        body: { hotSauceId: hotSauceId, customerId: customerId },
        headers: {
          authorization: token,
        },
      });
      dispatch(fetchCart(customerId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFromCart = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${customerId}/${orderId}/${hotSauceId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(fetchCart(customerId));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
