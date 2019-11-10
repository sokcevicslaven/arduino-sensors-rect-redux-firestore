// Dashboard page

import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_ERROR } from '../../redux/types';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Firebase
import firebase from '../../firebase/firebase';

// Components
import DataView from '../../components/DataView';

// Utiliuty
import { logObj, randomNum, formatTime } from '../../lib';

// Custom styles
import useStyles from './style.js';

// const fromatDate = date =>
// 	(date && date.seconds && new Date(date.seconds * 1000).toLocaleString()) || 'no date';

const addData = async dispatch => {
	try {
		await firebase.addData('sensors', {
			arduino: 0,
			co2: randomNum(20),
			date: new Date(),
			humidity: randomNum(100),
			temperature: randomNum(50)
		});
	} catch (err) {
		logObj(err);
		dispatch({ type: SET_ERROR, payload: err });
	}
};

const Dashboard = () => {
	console.log('TCL: Dashboard -> Dashboard 0');

	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const dataAddListener = useRef();
	const login = useSelector(state => state.user.login);
	const devMenu = useSelector(state => state.ui.devMenu);

	const [data, setData] = useState({});
	const { arduino, temperature, humidity, co2, date } = data;

	useLayoutEffect(() => {
		if (!login) history.push('/login');
		// eslint-disable-next-line
	}, [login]);

	useEffect(() => {
		console.log('TCL: Dashboard -> useEffect 1');

		if (login) {
			console.log('TCL: Dashboard -> useEffect 2');

			dataAddListener.current = firebase.fire
				.collection('sensors')
				.orderBy('date', 'desc')
				.limit(1)
				.onSnapshot(
					snapshot => {
						snapshot
							.docChanges()
							.forEach(change => change.type === 'added' && setData(change.doc.data()));
					},
					error => console.log('TCL: Dashboard -> childAddedListener -> error:', error)
				);

			// dataAddListener.current = firebase.fire
			// 	.collection('sensors')
			// 	.orderBy('date', 'desc')
			// 	.limit(1)
			// 	.onSnapshot(
			// 		snapshot => {
			// 			const data = [];
			// 			snapshot.forEach(doc => data.push(doc.data()));
			// 			setData(data);
			// 			//setCharData(data);
			// 		},
			// 		error => console.log('TCL: Dashboard -> childAddedListener -> error:', error)
			// 	);
		}

		return () => {
			if (dataAddListener.current) dataAddListener.current();
		};
		// eslint-disable-next-line
	}, [login]);

	return (
		<div>
			{date && devMenu && (
				<Paper elevation={12} className={classes.dev}>
					<Grid container>
						<Grid item>
							<Button
								variant='contained'
								className={classes.button}
								onClick={() => addData(dispatch)}
							>
								Add data
							</Button>
						</Grid>
						<Grid item>
							<ul>
								<li>arduino: {arduino}</li>
								<li>temperature: {temperature}</li>
								<li>humidity: {humidity}</li>
								<li>co2: {co2}</li>
								<li>
									date:{' '}
									{(date && date.seconds && new Date(date.seconds * 1000).toLocaleString()) ||
										'no date'}
								</li>
							</ul>
						</Grid>
					</Grid>
				</Paper>
			)}

			{data.date && (
				<Grid container direction='column' spacing={3}>
					{/* Temperature */}
					<Grid item>
						<DataView
							size={250}
							elevation={12}
							title={'Temperature'}
							label={formatTime(date.seconds)}
							value={data.temperature || 0}
							valueError={50}
							maxItems={5}
						/>
					</Grid>

					{/* Humidity */}
					<Grid item>
						<DataView
							size={250}
							elevation={12}
							title={'Humidity'}
							label={formatTime(date.seconds)}
							value={data.humidity || 0}
							valueError={50}
							maxItems={5}
							colors={['red']}
						/>
					</Grid>

					{/* CO2 */}
					<Grid item>
						<DataView
							size={250}
							elevation={12}
							title={'CO2'}
							label={formatTime(date.seconds)}
							value={co2 || 0}
							valueError={50}
							maxItems={5}
						/>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default Dashboard;
