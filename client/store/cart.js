import axios from "axios";
import history from "../history";

// Action Types
const TOKEN = "token";
const SET_CART = "SET_CART";

// Action Creators
const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

//Thunk Creators

export const fetchCart = (customerId, orderId, amount) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      let cart;
      if (amount && amount !== 0) {
        const { data: response } = await axios.put(
          `/api/orders/${orderId}/${customerId}`,
          {
            amount,
            headers: {
              authorization: token,
            },
          }
        );
        cart = response;
      } else {
        const { data: response } = await axios.get(`/api/cart/${customerId}`, {
          headers: {
            authorization: token,
          },
        });
        cart = response;
      }

      dispatch(setCart(cart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createOrder = (customerId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const { data: order } = await axios.post(`/api/orders/`, {
        headers: {
          authorization: token,
        },
      });
      return order;
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCart = (hotSauceId, quantity, orderId, customerId, price) => {
  const token = window.localStorage.getItem(TOKEN);

  return async (dispatch) => {
    try {
      if (customerId) {
        let order;
        if (!orderId) {
          order = await dispatch(createOrder(customerId));
          orderId = order.id;
        }

        await axios.post(`/api/cart/${customerId}/${orderId}`, {
          hotSauceId,
          quantity,
          headers: {
            authorization: token,
          },
        });
        const amount = quantity * price;

        dispatch(fetchCart(customerId, orderId, amount));
        history.goBack();
      } else {
        /* use local storage for non-users */
        // await axios.post(`/api/cart/${orderId}`, {
        //   hotSauceId,
        //   quantity,
        //   price,
        // });
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

export const addCartItem = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const { data } = await axios.put(`/api/cart/${orderId}/add`, {
        hotSauceId,
        customerId,
        headers: {
          authorization: token,
        },
      });
      const { amount } = data;

      dispatch(fetchCart(customerId, orderId, amount));
    } catch (error) {
      console.error(error);
    }
  };
};

export const subtractCartItem = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const { data } = await axios.put(`/api/cart/${orderId}/subtract`, {
        hotSauceId,
        customerId,
        headers: {
          authorization: token,
        },
      });
      const { amount } = data;

      if (!amount) {
        dispatch(deleteFromCart(orderId, hotSauceId, customerId));
      } else {
        dispatch(fetchCart(customerId, orderId, -amount));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFromCart = (orderId, hotSauceId, customerId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const { data } = await axios.delete(
        `/api/cart/${customerId}/${orderId}/${hotSauceId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      const { amount } = data;
      dispatch(fetchCart(customerId, orderId, -amount));
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
