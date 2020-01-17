// User actions

import firebase from '../../firebase/firebase';
import {
	SET_ERROR,
	START_LOADING,
	STOP_LOADING
	// SET_USER,
	// LOGIN_USER,
	// LOGOUT_USER
	// SIGNUP_USER
} from '../types';

// Login user and update store
export const loginAction = (email, password) => dispatch => {
	// Set UI loading
	dispatch({ type: START_LOADING });
	firebase
		.login(email, password)
		.then(result => {
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
export const signupAction = (user, history) => async dispatch => {
	try {
		// Start loading animation
		dispatch({ type: START_LOADING });

		// Check if username is already taken
		// const doc = await firebase.getByUsername(user.username);
		// if (doc.exists) throw { code: 'username', message: 'Username already taken.' };
		const res = await fetch(`/username/${user.username}`);
		console.log('TCL: res', res);

		const json = await res.json();
		// eslint-disable-next-line
		if (json.success) throw { code: 'username', message: 'Username already taken.' };

		// Create new user
		const userCredential = await firebase.signup(user.email, user.password);
		// console.log('TCL: userCredential', userCredential);

		// Update user profile
		const initials = user.firstName[0] + user.lastName[0];
		userCredential.user.updateProfile({ displayName: initials });

		// Stop loading animation
		dispatch({ type: STOP_LOADING });

		delete user.password; // Remove password
		await firebase.addDocumentData('users', user.username, {
			...user,
			uid: userCredential.user.uid
		});

		// Redirect to homepage
		history.push('/');
	} catch (err) {
		console.log('TCL: signupAction -> err', err);
		dispatch({ type: SET_ERROR, payload: err });
	}
};

// // Signup new user and update store
// export const signupAction2 = (user, history) => dispatch => {
// 	// Start loading animation
// 	dispatch({ type: START_LOADING });

// 	// Check if username is already taken
// 	firebase
// 		.getByUsername(user.username)
// 		.then(doc => {
// 			if (doc.exists) throw { code: 'username', message: 'Username already taken.' };

// 			// Create new user
// 			return firebase.signup(user.email, user.password);
// 		})
// 		.then(credential => {
// 			// Update user profile
// 			const initials = user.firstName[0] + user.lastName[0];
// 			return credential.user.updateProfile({ displayName: initials });
// 		})
// 		.then(() => {
// 			// Stop loading animation
// 			dispatch({ type: STOP_LOADING });

// 			// Redirect to homepage
// 			// .then(() => history.push('/'))
// 		})
// 		.catch(err => {
// 			// console.log('TCL: signupAction -> err', err);
// 			dispatch({ type: SET_ERROR, payload: err });
// 		});
// };

// // Get currently logged user and update store
// export const getCurrentUser = () => dispatch => {
// 	const user = firebase.getCurrentUser();
// 	dispatch({ type: SET_USER, payload: user || {} });
// };
