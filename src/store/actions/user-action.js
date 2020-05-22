/**
 * User store actions
 */

// User action types
import { LOGIN_USER, LOGOUT_USER } from '../types';

// UI actions
import { setLoadingAction, clearLoadingAction, setErrorAction } from './ui-action';

// Firebase reference
import firebase from '../../firebase/firebase';

// Parse firebase errors
import { parseError } from '../../errors';

// Fetch helper
import { fetchHelper } from '../../helper';

// Set user status
export const setLogoutUserAction = () => ({ type: LOGOUT_USER });
export const setLoginUserAction = (user) => ({ type: LOGIN_USER, payload: user });

// Login user into firebase
export const firebaseLoginAction = (email, password) => async (dispatch) => {
	// Set UI loading
	try {
		// Start loading spinner
		dispatch(setLoadingAction());

		// Firebase login
		await firebase.login(email, password);

		// Stop loading spinner
		dispatch(clearLoadingAction());
	} catch (error) {
		dispatch(setErrorAction(parseError(error)));
	}
};

// Logout user from firebase
export const firebaseLogoutAction = () => (dispatch) =>
	firebase.logout().catch((err) => dispatch(setErrorAction(err)));

// Signup new user and update store
export const signupAction = (user) => async (dispatch) => {
	try {
		// Start loading spinner
		dispatch(setLoadingAction());

		// Fetch signup API
		await fetchHelper({ url: '/user/register', method: 'POST', data: user });

		// Login into firebase
		await firebase.login(user.email, user.password);

		// Stop loading spinner
		dispatch(clearLoadingAction());
	} catch (error) {
		console.log('signupAction -> error', error);
		dispatch(setErrorAction(parseError(error)));
	}
};
