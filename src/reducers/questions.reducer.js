import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ANSWER_QUESTION,
} from "../consts";

export default function questionsReducer(questions = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...questions,
        ...action.data.questions,
      };
    case ADD_QUESTION: {
      const { question } = action.data;
      return {
        ...questions,
        [question.id]: question,
      };
    }
    case ANSWER_QUESTION: {
      const { authedUser, qid, answer } = action.data;
      console.log(authedUser, qid, answer);
      const theQuestionAnswer = questions[qid][answer];
      console.log(questions[qid][answer]);
      return {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...theQuestionAnswer,
            votes: [...theQuestionAnswer.votes, authedUser],
            name: "ahmed",
          },
        },
      };
    }
    default:
      return questions;
  }
}
