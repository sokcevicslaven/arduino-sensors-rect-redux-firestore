// Listen for authorization change

import { useEffect, useRef } from 'react';

// Firebase
import firebase from '../firebase/firebase';

// Redux
import { useDispatch } from 'react-redux';
import { setLoginUserAction, setLogoutUserAction } from '../store/actions';

const useAuthStateChanged = () => {
	const dispatch = useDispatch();
	const authStateChangeListener = useRef();

	// Change store user state on user login or logout
	useEffect(() => {
		// Listen for authorization state change
		authStateChangeListener.current = firebase.auth.onAuthStateChanged((user) => {
			if (user) dispatch(setLoginUserAction(user));
			else dispatch(setLogoutUserAction());
		});
		return () => {
			// Remove listener
			authStateChangeListener.current();
		};
		// eslint-disable-next-line
	}, []);
};

export default useAuthStateChanged;
