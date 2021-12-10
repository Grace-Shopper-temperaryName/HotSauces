import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const SET_HOTSAUCES = "SET_HOTSAUCES";
const ADD_HOTSAUCE = "ADD_HOTSAUCE";
const UPDATE_HOTSAUCES = "UPDATE_HOTSAUCES";
const DELETE_HOTSAUCE = "DELETE_HOTSAUCE";

/**
 * ACTION CREATORS
 */
const setHotSauces = (hotSauces) => ({ type: SET_HOTSAUCES, hotSauces });

const addNewHotSauce = (hotSauce) => ({ type: ADD_HOTSAUCE, hotSauce });

const updateAllHotSauces = (hotSauce) => ({
  type: UPDATE_HOTSAUCES,
  hotSauce,
});

const deleteThisHotSauce = (hotSauce) => ({ type: DELETE_HOTSAUCE, hotSauce });

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

export const addHotSauce = (hotSauce, history) => {
  return async (dispatch) => {
    try {
      const { data: newHotSauce } = await axios.post(
        "/api/hotsauces",
        hotSauce
      );
      dispatch(addNewHotSauce(newHotSauce));
      history.push("/hotsauces");
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateHotSauces = (hotSauce) => {
  return async (dispatch) => {
    try {
      const { data: updatedHotSauce } = await axios.put(
        `/api/hotsauces/${hotSauce.id}`,
        hotSauce
      );
      dispatch(updateAllHotSauces(updatedHotSauce));
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteHotSauce = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: hotSauce } = await axios.delete(`/api/hotsauces/${id}`);
      dispatch(deleteThisHotSauce(hotSauce));
      history.push("/hotsauces");
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
    case UPDATE_HOTSAUCES:
      return state.map((hotSauce) =>
        hotSauce.id === action.hotSauce.id ? action.hotSauce : hotSauce
      );
    case DELETE_HOTSAUCE:
      return state.filter((hotSauce) => hotSauce.id !== action.hotSauce.id);
    default:
      return state;
  }
}
