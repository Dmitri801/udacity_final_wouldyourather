import { GET_USERS, SAVE_USER_ANSWER } from "./types";
import { _registerNewUser } from "../util/_DATA.js";
export const getUsers = users => {
  return {
    type: GET_USERS,
    payload: users
  };
};

export const handleRegisterNewUser = (userName, password, name, avatarURL) => {
  return dispatch => {
    return _registerNewUser(userName, password, name, avatarURL).then(users => {
      return dispatch(getUsers(users));
    });
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
