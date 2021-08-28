// Imports
import { createStore } from 'redux';
import middleware from '../middleware';
import rootReducer from '../reducers';
// import thunk from 'redux-thunk';


const store = createStore(
    rootReducer,
    middleware
    );

export default store; 