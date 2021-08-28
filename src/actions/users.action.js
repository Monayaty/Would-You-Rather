import { RECEIVE_USERS } from "../consts";

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    data: {
        users
    }
})