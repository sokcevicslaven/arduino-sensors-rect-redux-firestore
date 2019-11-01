// Ui reducers

import { START_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from '../types';

const initialState = {
	loading: false,
	errors: {}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, loading: true };
		case STOP_LOADING:
			return { ...state, loading: false };
		case SET_ERROR:
			return { loading: false, errors: action.payload };
		case CLEAR_ERROR:
			return initialState;
		default:
			return state;
	}
};

export default userReducer;
