import axios from "axios";

const CREATE_GUEST = "CREATE_GUEST";
const CREATE_ORDER = "CREATE_ORDER";

export const _createGuest = (guest) => {
  return {
    type: CREATE_GUEST,
    guest,
  };
};

export const createGuest = () => {
  return async (dispatch) => {
    try {
      const { data: guest } = await axios.post(`/api/guests`);

      dispatch(_createGuest(guest));
    } catch (error) {
      console.error(error);
    }
  };
};
// export const createOrder = () => {};

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_GUEST:
      return action.guest;
    default:
      return state;
  }
}
