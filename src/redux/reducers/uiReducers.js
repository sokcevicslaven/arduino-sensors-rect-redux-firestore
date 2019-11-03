// Ui reducers

import { SET_DARK_THEME, START_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from '../types';

const initialState = {
	darkTheme: false,
	loading: false,
	error: {}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DARK_THEME:
			return { ...state, darkTheme: action.payload };
		case START_LOADING:
			return { ...state, loading: true };
		case START_LOADING:
			return { ...state, loading: true };
		case STOP_LOADING:
			return { ...state, loading: false };
		case SET_ERROR:
			return { ...state, loading: false, error: action.payload };
		case CLEAR_ERROR:
			return { ...state, loading: false, error: {} };
		default:
			return state;
	}
};

export default userReducer;
