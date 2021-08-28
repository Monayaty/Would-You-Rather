import { showLoading, hideLoading } from "react-redux-loading";
import { receiveUsers } from "./users.action";
import { receiveQuestions } from "./questions.actions";
import { setAuthedUser } from "./authedUser.action";
import { getInitialData } from "../utils/api";


const AUTHED_ID = null;
export const setInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
};
