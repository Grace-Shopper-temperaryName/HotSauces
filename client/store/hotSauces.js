import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_HOTSAUCES = 'SET_HOTSAUCES';

/**
 * ACTION CREATORS
 */
const setHotSauces = (hotSauces) => ({ type: SET_HOTSAUCES, hotSauces });

/**
 * THUNK CREATORS
 */
export const fetchHotSauces = () => {
  return async (dispatch) => {
    try {
      const { data: hotSauces } = await axios.get('/api/hotsauces');
      dispatch(setHotSauces(hotSauces));
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
    case SET_HOTSAUCES:
      return action.hotSauces;
    default:
      return state;
  }
}
