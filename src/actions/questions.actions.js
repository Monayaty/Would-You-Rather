import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  USER_ADD_QUESTION,
  ANSWER_QUESTION,
  USER_ANSWER_QUESTION,
} from "../consts";
import { showLoading, hideLoading } from "react-redux-loading";
import {
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  data: {
    questions,
  },
});

//add and answer questions
const addQuestion = (question) => ({
  type: ADD_QUESTION,
  data: {
    question,
  },
});

const userAddQuestion = ({ authedUser, qid }) => ({
  type: USER_ADD_QUESTION,
  data: {
    authedUser,
    qid,
  },
});

const answerQuestion = ({ authedUser, qid, answer }) => ({
  type: ANSWER_QUESTION,
  data: {
    authedUser,
    qid,
    answer,
  },
});

const userAnswerQuestion = ({ authedUser, qid, answer }) => ({
  type: USER_ANSWER_QUESTION,
  data: {
    authedUser,
    qid,
    answer,
  },
});

// handle adding and answering questions
export const setAddQuestion = ({ optionOneText, optionTwoText, author }) => {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(
          userAddQuestion({
            authedUser: author,
            qid: question.id,
          })
        );
        dispatch(addQuestion(question));
        dispatch(hideLoading());
      }
    );
  };
};

export const setAnswerQuestion = ({ authedUser, qid, answer }) => {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(userAnswerQuestion({ authedUser, qid, answer }));
      dispatch(answerQuestion({ authedUser, qid, answer }));
      dispatch(hideLoading());
    });
  };
};
