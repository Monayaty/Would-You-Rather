import { loadingBarReducer } from 'react-redux-loading';
import { combineReducers } from 'redux';
import authedUser from './authUsers.reducer';
import users from './users.reducer';
import questions from './questions.reducer';

const rootReducer = combineReducers({
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer
})

export default rootReducer;