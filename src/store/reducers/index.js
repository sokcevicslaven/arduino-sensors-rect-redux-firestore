// Root reducer

import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import uiReducer from './ui-reducer';

const rootReducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
});

export default rootReducer;
