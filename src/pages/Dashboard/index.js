// Dashboard page

import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_ERROR } from '../../redux/types';

// Firebase
import firebase from '../../firebase/firebase';

// Chart
import ApexCharts from 'apexcharts';

// MUI
import Button from '@material-ui/core/Button';

// Utiliuty
import { logObj } from '../../lib';

// Custom styles
import useStyles from './style.js';

const Dashboard = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const childAddedListener = useRef();
	const login = useSelector(state => state.user.login);
	const loading = useSelector(state => state.user.loading);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!login) history.push('/login');
		// eslint-disable-next-line
	}, [login]);

	useEffect(() => {
		childAddedListener.current = firebase.fire
			.collection('sensors')
			.orderBy('date', 'desc')
			.limit(3)
			.onSnapshot(
				snapshot => {
					const data = [];
					snapshot.forEach(doc => data.push(doc.data()));
					setData(data);
				},
				error => console.log('TCL: Dashboard -> childAddedListener -> error:', error)
			);

		return () => {
			childAddedListener.current();
		};
	}, []);

	const addData = async dispatch => {
		try {
			await firebase.addData('sensors', {
				arduino: 0,
				co2: 0,
				date: new Date(),
				humidity: 40,
				temperature: 22
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
		</div>
	);
};

export default Dashboard;
