import { GET_USERS, SAVE_USER_ANSWER } from "./types";

export const getUsers = users => {
  return {
    type: GET_USERS,
    payload: users
  };
};

export const saveUserAnswer = (authedUser, qid, answer) => {
  return {
    type: SAVE_USER_ANSWER,
    authedUser,
    qid,
    answer
  };
};
