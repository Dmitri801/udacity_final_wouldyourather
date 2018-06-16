import { SET_AUTHED_USER } from "../actions/types";

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.payload;
    default:
      return state;
  }
}
