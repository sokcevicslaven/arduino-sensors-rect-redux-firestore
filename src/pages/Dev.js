import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../firebase/firebase';
import { SET_ERROR, SET_DARK_THEME } from '../redux/types';
import { loginAction } from '../redux/actions/userActions';

// MUI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { logObj } from '../lib';

const loginHandler = dispatch => {
	dispatch(loginAction('ivan.brajkovic@icloud.com', '123456789'));
};

const logoutHandler = async () => {
	try {
		await firebase.logout();
		console.log('Logged out');
	} catch (err) {
		console.log('logoutHandler -> err', err);
	}
};

const createUser = async () => {
	try {
		await firebase.signin('IB', 'ivan1.brajkovic@icloud.com', '123456789');
		getCurrenUserHandler();
	} catch (err) {
		console.log('logoutHandler -> err', err);
	}
};

const getCurrenUserHandler = () => {
	const user = firebase.getCurrentUser();
	console.log(
		'Currently logged user:',
		user ? (user.displayName ? user.displayName : user.email) : 'none'
	);
};

const addData = async dispatch => {
	try {
		await firebase.addData('sensors', null);
	} catch (err) {
		logObj(err);
		dispatch({ type: SET_ERROR, payload: err });
	}
};

const setDarkTheme = (dispatch, dark) => dispatch({ type: SET_DARK_THEME, payload: dark });

const Dev = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const loading = useSelector(state => state.ui.loading);
	const darkTheme = useSelector(state => state.ui.darkTheme);

	return (
		<div>
			{(loading && <h2>Loading...</h2>) || <h2>Dev page</h2>}
			<Button variant='contained' className={classes.button} onClick={() => loginHandler(dispatch)}>
				Login
			</Button>
			<Button variant='contained' className={classes.button} onClick={logoutHandler}>
				Logout
			</Button>
			<Button variant='contained' className={classes.button} onClick={getCurrenUserHandler}>
				Get user
			</Button>
			<Button variant='contained' className={classes.button} onClick={createUser}>
				New user
			</Button>
			<Button variant='contained' className={classes.button} onClick={() => addData(dispatch)}>
				Add data
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => setDarkTheme(dispatch, !darkTheme)}
			>
				Dark teme
			</Button>
		</div>
	);
};

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

export default Dev;
