import { TEST_GET } from "../actions/types";
const initialState = {};

export default function(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case TEST_GET:
      return {
        ...newState,
        ...action.payload.data
      };
    default:
      return newState;
  }
}
