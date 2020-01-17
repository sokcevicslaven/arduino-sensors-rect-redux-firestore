// Ui reducers

import {
	SET_DARK_THEME,
	START_LOADING,
	SET_DEV_MENU,
	STOP_LOADING,
	SET_ERROR,
	CLEAR_ERROR
} from '../types';

const initialState = {
	settings: {
		darkTheme: false,
		devMenu: false
	},
	loading: false,
	error: {}
};

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		// case SET_DARK_THEME:on.payload };
		case SET_DARK_THEME:
			return { ...state, settings: { ...state.settings, darkTheme: action.payload } };
		case SET_DEV_MENU:
			return { ...state, settings: { ...state.settings, devMenu: action.payload } };
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

export default uiReducer;
