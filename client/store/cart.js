import axios from "axios";
import history from "../history";
import auth from "./auth";

// Action Types
const SET_CART = "SET_CART";
// const ADD_TO_CART = "ADD_TO_CART";
// const DELETE_FROM_CART = "DELETE_FROM_CART";
const EDIT_CART_ITEM_QUANTITY = "EDIT_CART_ITEM_QUANTITY";

// Action Creators

const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

//Thunk Creators

export const fetchCart = (customerId) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/cart/${customerId}`);
      dispatch(setCart(cart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createOrder = (customerId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.post(`/api/orders/`);
      if (!customerId) {
        return order;
      }
      dispatch(fetchCart(customerId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCart = (hotSauceId, quantity, orderId, customerId, price) => {
  return async (dispatch) => {
    try {
      if (customerId) {
        await axios.post(`/api/cart/${orderId}`, {
          hotSauceId,
          quantity,
          price,
        });
        dispatch(fetchCart(customerId, quantity, price));
      } else {
        await axios.post(`/api/cart/${orderId}`, {
          hotSauceId,
          quantity,
          price,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const addToLocalCart = (hotSauceId, quantity, orderId, price) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/cart/${orderId}`, {
        hotSauceId,
        quantity,
        price,
      });
      dispatch(fetchCart(null, quantity, price));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFromCart = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${orderId}/${hotSauceId}`);
      dispatch(fetchCart(customerId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addCartItem = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      await axios.put(`api/cart/${orderId}/add`, { hotSauceId });
      dispatch(fetchCart(customerId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const subtractCartItem = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      await axios.put(`api/cart/${orderId}/subtract`, { hotSauceId });
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
