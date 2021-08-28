// Imports
import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from "../consts";

export default function authUserReducer(authedUser = "", action) {
  switch (action.type) {
    case SET_AUTHED_USER: {
      const { id } = action.data;
      return id;
    }

    case REMOVE_AUTHED_USER:
      return null;

    default:
      return authedUser;
  }
}

