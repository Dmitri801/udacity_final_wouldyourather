import { GET_USERS, SAVE_QUESTION, SAVE_USER_ANSWER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_USERS:
      return {
        ...newState,
        ...action.payload
      };
    case SAVE_QUESTION:
      const { payload } = action;

      return {
        ...newState,
        [payload.author]: {
          ...newState[payload.author],
          questions: state[payload.author].questions.concat([payload.id])
        }
      };
    case SAVE_USER_ANSWER:
      return {
        ...newState,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      };
    default:
      return state;
  }
}
