// Dashboard page

import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_ERROR } from '../../redux/types';

// Firebase
import firebase from '../../firebase/firebase';

// Frappe chart
import useChart from '../../hooks/useChart';

// MUI
import Button from '@material-ui/core/Button';

// Utiliuty
import { logObj, randomNum } from '../../lib';

// Custom styles
import useStyles from './style.js';

const Dashboard = () => {
	console.log('TCL: Dashboard -> Dashboard 0');

	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const childAddedListener = useRef();
	const login = useSelector(state => state.user.login);
	const [data, setData] = useState([]);

	const setCharData = useChart(login, '#chart');

	useLayoutEffect(() => {
		if (!login) history.push('/login');
		// eslint-disable-next-line
	}, [login]);

	useEffect(() => {
		console.log('TCL: Dashboard -> useEffect 1');

		if (login) {
			console.log('TCL: Dashboard -> useEffect 2');

			childAddedListener.current = firebase.fire
				.collection('sensors')
				.orderBy('date', 'desc')
				.limit(3)
				.onSnapshot(
					snapshot => {
						const data = [];
						snapshot.forEach(doc => data.push(doc.data()));
						setData(data);
						setCharData(data);
					},
					error => console.log('TCL: Dashboard -> childAddedListener -> error:', error)
				);
		}

		return () => {
			if (childAddedListener.current) childAddedListener.current();
		};
		// eslint-disable-next-line
	}, [login]);

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

	return (
		<div>
			<Button variant='contained' className={classes.button} onClick={() => addData(dispatch)}>
				Add data
			</Button>

			<ul>
				{login &&
					data.map(({ arduino, temperature, humidity, co2, date }, index) => {
						return (
							<li key={index}>
								Item: {index}
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
							</li>
						);
					})}
			</ul>
			<div id='chart' />
		</div>
	);
};

export default Dashboard;
