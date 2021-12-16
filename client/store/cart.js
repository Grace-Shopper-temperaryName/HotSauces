import axios from "axios";
import history from "../history";
import auth from "./auth";

// Action Types
const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const EDIT_CART_ITEM_QUANTITY = "EDIT_CART_ITEM_QUANTITY";
const UPDATE_CART_TOTAL = "UPDATE_CART_TOTAL";

// Action Creators

const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

const _addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

const _deleteFromCart = (hotSauce) => ({
  type: DELETE_FROM_CART,
  hotSauce,
});

const _editCartItemQuantity = (hotSauce) => ({
  type: EDIT_CART_ITEM_QUANTITY,
  hotSauce,
});

const _updateCartTotal = (cart) => ({
  type: UPDATE_CART_TOTAL,
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

export const addToCart = (hotSauceId, quantity, orderId, customerId) => {
  return async (dispatch) => {
    try {
      // get hot sauce
      await axios.post(`/api/cart/${orderId}`, {
        hotSauceId,
        quantity,
      });
      dispatch(fetchCart(customerId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCartTotal = (orderId, amount) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.put(
        `/api/cart/total/${orderId}`,
        amount
      );
      dispatch(_updateCartTotal(cart));
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
    case ADD_TO_CART:
      return action.cart;
    case UPDATE_CART_TOTAL:
      return action.cart;
    default:
      return state;
  }
}
