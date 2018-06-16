import {
  SAVE_QUESTION,
  GET_QUESTIONS,
  SAVE_QUESTION_ANSWER
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...newState,
        ...action.payload
      };
    case SAVE_QUESTION:
      const { payload } = action;
      return {
        ...newState,
        [action.payload.id]: payload
      };
    case SAVE_QUESTION_ANSWER:
      return {
        ...newState,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser
            ])
          }
        }
      };

    default:
      return newState;
  }
}
