import axios from 'axios';

const SET_SINGLE_HOT_SAUCE = 'SET_SINGLE_HOT_SAUCE';

export const setSingleHotSauce = (hotSauce) => {
  return {
    type: SET_SINGLE_HOT_SAUCE,
    hotSauce,
  };
};

export const fetchSingleHotSauce = (hotSauceId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/hotsauces/${hotSauceId}`);
      dispatch(setSingleHotSauce(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function singleHotSauce(state = [], action) {
  switch (action.type) {
    case SET_SINGLE_HOT_SAUCE:
      return action.hotSauce;
    default:
      return state;
  }
}
