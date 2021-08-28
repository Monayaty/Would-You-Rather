import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from "../consts";

export const setAuthedUser = (id) => {
  console.log("ID   ", id);

  return (dispatch) => {
    dispatch({
      type: SET_AUTHED_USER,
      data: { id: id },
    });
  };
};

export const unauthedUser = () => ({
  type: REMOVE_AUTHED_USER,
});
