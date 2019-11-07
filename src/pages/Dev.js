import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { SET_ERROR, SET_DARK_THEME } from '../redux/types';
import { loginAction } from '../redux/actions/userActions';

import firebase from '../firebase/firebase';

// Components
import SensorMeter from '../components/SensorMeter';
import ChartControl from '../components/ChartControl';
import formatCharData from '../components/ChartControl/formatCharData';
import DataView from '../components/DataView';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
// Material UI
import Paper from '@material-ui/core/Paper';

// Frappe chart
// import useChart from '../components/Chart/useChart';

// Utility
import { logObj } from '../lib';
import { formatTime } from '../lib';
// import { formatDatetime } from '../lib';

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

const initData = [
	{
		arduino: 0,
		temperature: 18,
		humidity: 35,
		co2: 8
	},
	{
		arduino: 0,
		temperature: 33,
		humidity: 80,
		co2: 12
	},
	{
		arduino: 0,
		temperature: 20,
		humidity: 50,
		co2: 16
	},
	{
		arduino: 0,
		temperature: 24,
		humidity: 30,
		co2: 10
	},
	{
		arduino: 0,
		temperature: 28,
		humidity: 20,
		co2: 12
	},
	{
		arduino: 0,
		temperature: 31,
		humidity: 60,
		co2: 12
	},
	{
		arduino: 0,
		temperature: 18,
		humidity: 70,
		co2: 18
	},
	{
		arduino: 0,
		temperature: 36,
		humidity: 50,
		co2: 14
	},
	{
		arduino: 0,
		temperature: 30,
		humidity: 40,
		co2: 12
	},
	{
		arduino: 0,
		temperature: 28,
		humidity: 40,
		co2: 16
	}
];

const Dev = () => {
	const [progress, setProgress] = useState(0);

	//	const [data, setData] = useState(initialData);
	const classes = useStyles();
	const dispatch = useDispatch();
	const loading = useSelector(state => state.ui.loading);
	const darkTheme = useSelector(state => state.ui.darkTheme);

	const minWidthSM = useMediaQuery('(min-width:600px)');

	// useEffect(() => {
	// 	chartRef.current = new Chart(charTagRef.current, {
	// 		title: 'My Awesome Chart',
	// 		data: data,
	// 		type: 'axis-mixed',
	// 		height: 250,
	// 		colors: ['#7cd6fd', '#743ee2']
	// 	});
	// 	return () => {
	// 		chartRef.current = null;
	// 	};
	// }, []);

	return (
		<div>
			{/* {(loading && <h2>Loading...</h2>) || <h2>Dev page</h2>} */}
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
			<br />
			<br />
			{/* <Grid container justify='space-around' alignItems='center'>
				<Grid item container xs={12} sm={3} justify='center'>
					<SensorMeter
						title={'Temperature'}
						value={progress}
						// simbol={37}
						valueError={50}
						size={300}
						textVariant='h3'
						elevation={3}
					/>
				</Grid>
				<Grid item xs={12} sm={8}>
					<ChartControl
						title={'Temperature'}
						label={formatTime()}
						value={progress}
						maxItems={5}
						yMarkers={70}
						yRegionsStart={10}
						yRegionsEnd={10}
						elevation={3}
						yMarkers={null}
						yRegions={null}
					/>
				</Grid>
			</Grid> */}
			<DataView
				size={250}
				elevation={12}
				title={'Temperature'}
				label={formatTime()}
				value={progress}
				valueError={50}
				maxItems={5}
			/>
		</div>
	);
};

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	},
	grid: {
		display: 'grid',
		gridGap: theme.spacing(2),
		gridTemplateColumns: '1fr 2fr'
		// justifyItems: 'center',
		// alignItems: 'center'
	}
}));

export default Dev;
