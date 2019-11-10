// Developer page (debug only)

import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
	loginAction,
	logoutAction,
	setErrorAction,
	setDarkThemeAction,
	setDevMenuAction
} from '../redux/actions';

// Firebase
import firebase from '../firebase/firebase';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import DataView from '../components/DataView';
import ChartControl from '../components/ChartControl';

// Utility
import { logObj, formatTime } from '../lib';

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
		dispatch(setErrorAction(err));
	}
};

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

const Dev = () => {
	const [progress, setProgress] = useState(0);
	const classes = useStyles();
	const dispatch = useDispatch();
	const devMenu = useSelector(state => state.ui.devMenu);
	const darkTheme = useSelector(state => state.ui.darkTheme);
	// const minWidthSM = useMediaQuery('(min-width:600px)');

	return (
		<div>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(loginAction('ivan.brajkovic@icloud.com', '123456789'))}
			>
				Login
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(logoutAction())}
			>
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
				onClick={() => dispatch(setDarkThemeAction(!darkTheme))}
			>
				Dark teme
			</Button>
			<Button variant='contained' className={classes.button} onClick={() => {}}>
				Update chart
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => setProgress(state => state + 10)}
			>
				Progress +
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => setProgress(state => state - 10)}
			>
				Progress -
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(setDevMenuAction(!devMenu))}
			>
				Dev menu
			</Button>

			<br />
			<br />

			<DataView
				size={250}
				elevation={12}
				title={'Temperature'}
				label={formatTime()}
				value={progress}
				valueError={50}
				maxItems={5}
				colors={['blue']}
			/>

			<DataView
				size={250}
				elevation={12}
				title={'Humidity'}
				label={formatTime()}
				value={100}
				valueError={50}
				maxItems={5}
				colors={['red']}
			/>

			<ChartControl title={'CO2'} label={'label'} value={50} maxItems={5} colors={['green']} />
		</div>
	);
};

export default Dev;
