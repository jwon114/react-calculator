import { combineReducers } from 'redux';
import messageReducer from './app.js';

const rootReducer = combineReducers({
  messageReducer,
});

export default rootReducer;
