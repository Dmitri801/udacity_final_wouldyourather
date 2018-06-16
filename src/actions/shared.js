// import axios from "axios";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from "../util/_DATA.js";
// import { getPosts } from "./testActions";
import {
  getQuestions,
  saveQuestion,
  saveQuestionAnswer
} from "./questionActions";
import { getUsers, saveUserAnswer } from "./userActions";
import { setAuthedUser } from "./authUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return Promise.all([_getQuestions(), _getUsers()]).then(
      ([questions, users]) => {
        dispatch(getQuestions(questions));
        dispatch(getUsers(users));
        dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading());
      }
    );
  };
}

export function handleSaveNewQuestion(question) {
  return dispatch => {
    dispatch(showLoading());
    return _saveQuestion(question)
      .then(question => dispatch(saveQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleSaveNewQuestionAnswer({ authedUser, qid, answer }) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(saveQuestionAnswer(authedUser, qid, answer));
    dispatch(saveUserAnswer(authedUser, qid, answer));

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn("Error in handleSaveNewQuestionAnswer: ", e);
        dispatch(saveQuestionAnswer(authedUser, qid, answer));
        dispatch(saveUserAnswer(authedUser, qid, answer));
      });
  };
}
