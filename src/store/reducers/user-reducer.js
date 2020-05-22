// User reducers

import {
	SET_USER,
	SET_LOGIN,
	CLEAR_LOGIN,
	LOGIN_USER,
	LOGOUT_USER,
	SET_LOGIN_STATUS,
} from '../types';

const initialState = {
	login: false,
	details: {},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { login: true, details: action.payload };

		case SET_LOGIN:
			return { ...state, login: true };

		case CLEAR_LOGIN:
			return { ...state, login: false };

		case SET_LOGIN_STATUS:
			return { ...state, login: action.payload };

		case LOGIN_USER:
			return { login: true, details: action.payload };

		case LOGOUT_USER:
			return initialState;

		default:
			return state;
	}
};

export default userReducer;
