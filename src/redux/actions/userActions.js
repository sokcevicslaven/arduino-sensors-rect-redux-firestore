// Actions

import { START_LOADING, STOP_LOADING, LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from '../types';

export const loginAction = () => dispatch => {
	// Set UI loading
	dispatch({ type: START_LOADING });

	// Fetch user details
	setTimeout(() => {
		dispatch({ type: LOGIN_USER, payload: { firstName: 'Ivan' } });
		dispatch({ type: STOP_LOADING });
	}, 2000);
};

export const logoutAction = () => dispatch => {
	dispatch({ type: LOGOUT_USER });
};

export const signupAction = () => dispatch => {
	dispatch({ type: SIGNUP_USER });
};
