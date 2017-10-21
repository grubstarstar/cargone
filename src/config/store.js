import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import bookingForm from '../components/book-a-job/reducer'

export default createStore(
	combineReducers({bookingForm}),
	applyMiddleware(thunk, logger)
);