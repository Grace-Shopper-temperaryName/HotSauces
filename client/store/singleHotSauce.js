import axios from "axios";
import history from "../history";

const SET_SINGLE_HOT_SAUCE = "SET_SINGLE_HOT_SAUCE";

export const setSingleHotSauce = (hotSauce) => {
  return {
    type: SET_SINGLE_HOT_SAUCE,
    hotSauce,
  };
};

export const fetchSingleHotSauce = (id) => {
  return async (dispatch) => {
    try {
      const { data: hotSauce } = await axios.get(`/api/hotsauces/${id}`);
      dispatch(setSingleHotSauce(hotSauce));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_SINGLE_HOT_SAUCE:
      return action.hotSauce;
    default:
      return state;
  }
}
