import {
  RECEIVE_USERS,
  USER_ADD_QUESTION,
  USER_ANSWER_QUESTION,
} from "../consts";

export default function usersReducer(users = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...users,
        ...action.data.users,
      };
    case USER_ADD_QUESTION: {
      const { qid, authedUser } = action.data;
      return {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: [...users[authedUser].questions, qid],
        },
      };
    }
    case USER_ANSWER_QUESTION: {
      const { authedUser, qid, answer } = action.data;

      return {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    }
    default:
      return users;
  }
}
