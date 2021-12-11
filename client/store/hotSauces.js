import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_HOTSAUCES = "SET_HOTSAUCES";
const ADD_HOTSAUCE = "ADD_HOTSAUCE";
const DELETE_HOTSAUCE = "DELETE_HOTSAUCE";
const UPDATE_HOTSAUCE = "UPDATE_HOTSAUCE";

/**
 * ACTION CREATORS
 */
const setHotSauces = (hotSauces) => ({ type: SET_HOTSAUCES, hotSauces });

const addSingleHotSauce = (hotSauce) => ({ type: ADD_HOTSAUCE, hotSauce });

const deleteSingleHotSauce = (hotSauce) => ({
  type: DELETE_HOTSAUCE,
  hotSauce,
});

/**
 * THUNK CREATORS
 */
export const fetchHotSauces = () => {
  return async (dispatch) => {
    try {
      const { data: hotSauces } = await axios.get("/api/hotsauces");
      dispatch(setHotSauces(hotSauces));
    } catch (err) {
      console.error(err);
    }
  };
};

export const createNewHotSauce = (hotSauce, history) => {
  return async (dispatch) => {
    try {
      const { data: newHotSauce } = await axios.post(
        "/api/hotsauces",
        hotSauce
      );
      dispatch(addSingleHotSauce(newHotSauce));
      history.push("/hotsauces");
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteHotSauce = (id) => {
  return async (dispatch) => {
    try {
      const { data: hotSauce } = await axios.delete(`/api/hotsauces/${id}`);
      dispatch(deleteSingleHotSauce(hotSauce));
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
    case ADD_HOTSAUCE:
      return [...state, action.hotSauce];
    case DELETE_HOTSAUCE:
      return state.filter((hotSauce) => hotSauce.id !== action.hotSauce.id);
    case UPDATE_HOTSAUCE:
      return state.map((hotSauce) => {
        hotSauce.id === action.hotSauce.id ? action.hotSauce : hotSauce;
      });
    default:
      return state;
  }
}
