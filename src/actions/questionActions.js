import { toastr } from "react-redux-toastr";
import { SAVE_QUESTION, GET_QUESTIONS, SAVE_QUESTION_ANSWER } from "./types";

export const saveQuestion = question => {
  return dispatch => {
    try {
      dispatch({
        type: SAVE_QUESTION,
        payload: question
      });
      toastr.success("-.-", "New Questions Added..");
    } catch (err) {
      toastr.err("Something went wrong..");
    }
  };
};

export const getQuestions = questions => {
  return {
    type: GET_QUESTIONS,
    payload: questions
  };
};

export const saveQuestionAnswer = (authedUser, qid, answer) => {
  return dispatch => {
    try {
      dispatch({
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
      });
      toastr.success("-.-", "Thanks for answering!");
    } catch (err) {
      toastr.err("Oops, Something went wrong..");
    }
  };
};
