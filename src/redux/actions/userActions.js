// User actions

import firebase from '../../firebase/firebase';
import {
	SET_ERROR,
	START_LOADING,
	STOP_LOADING,
	SET_USER,
	// LOGIN_USER,
	// LOGOUT_USER,
	SIGNUP_USER
} from '../types';

// Login user and update store
export const loginAction = (email, password) => dispatch => {
	// Set UI loading
	dispatch({ type: START_LOADING });
	firebase
		.login(email, password)
		.then(result => {
			// console.log('Logged in:', result.user.email);
			// dispatch({ type: LOGIN_USER, payload: result.user });
			dispatch({ type: STOP_LOADING });
		})
		.catch(err => dispatch({ type: SET_ERROR, payload: err }));
};

// Logout user and update store
export const logoutAction = () => dispatch => {
	firebase.logout().catch(err => dispatch({ type: SET_ERROR, payload: err }));
	// dispatch({ type: LOGOUT_USER });
};

// Signup new user and update store
export const signupAction = (
	{ firstName, lastName, username, email, password },
	history
) => dispatch => {
	const initials = firstName[0] + lastName[0];

	firebase
		.signup(initials, email, password)
		.then(() => history.push('/'))
		.catch(err => dispatch({ type: SET_ERROR, payload: err }));

	//dispatch({ type: SIGNUP_USER });
};

// Get currently logged user and update store
export const getCurrentUser = () => dispatch => {
	const user = firebase.getCurrentUser();
	dispatch({ type: SET_USER, payload: user || {} });
};
