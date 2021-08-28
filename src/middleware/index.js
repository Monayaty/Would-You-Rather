import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './logger.middleware';

export default applyMiddleware(
    thunk, 
    logger
    );