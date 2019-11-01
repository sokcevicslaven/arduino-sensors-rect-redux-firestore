import React from 'react';
import { useSelector } from 'react-redux';
import firebase from '../firebase/firebase';

// MUI
import Button from '@material-ui/core/Button';

const loginHandler = async () => {
	try {
		const result = await firebase.login('ivan.brajkovic@icloud.com', '123456789');
		console.log('Logged in:', result.user.email);
	} catch (err) {
		console.log('loginHandler -> err', err);
	}
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

const Home = () => {
	const loading = useSelector(state => state.ui.loading);

	return (
		<div>
			{(loading && <h2>Loading...</h2>) || <h2>Home page</h2>}
			<Button onClick={loginHandler}>Login</Button>
			<Button onClick={logoutHandler}>Logout</Button>
			<Button onClick={getCurrenUserHandler}>Get user</Button>
			<Button onClick={createUser}>New user</Button>
		</div>
	);
};

export default Home;
