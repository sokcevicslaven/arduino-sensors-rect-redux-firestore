import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../firebase/firebase';
import { SET_ERROR, SET_DARK_THEME } from '../redux/types';
import { loginAction } from '../redux/actions/userActions';

// MUI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Frappe chart
// import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

import useChart from '../hooks/useChart';

// Utility
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

const data = {
	labels: [],
	datasets: []
};

const Dev = () => {
	const chartRef = useChart(true, '#chart', data);

	//	const [data, setData] = useState(initialData);
	const classes = useStyles();
	const dispatch = useDispatch();
	const loading = useSelector(state => state.ui.loading);
	const darkTheme = useSelector(state => state.ui.darkTheme);

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

	const updateData = () =>
		// chartRef.current.update({
		chartRef({
			labels: [
				'12am-3am',
				'3am-6pm',
				'6am-9am',
				'9am-12am',
				'12pm-3pm',
				'3pm-6pm',
				'6pm-9pm',
				'14am-116am'
			],
			datasets: [
				{
					name: 'Some Data',
					type: 'bar',
					values: [25, 40, 20, 15, 18, 52, 17, -14]
				},
				{
					name: 'Another Set',
					type: 'line',
					values: [25, 50, -5, 35, 8, 32, 27, 24]
				}
			]
		});

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
			<Button variant='contained' className={classes.button} onClick={() => updateData()}>
				Update chart
			</Button>
			<div id='chart' />
		</div>
	);
};

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	}
}));

export default Dev;
