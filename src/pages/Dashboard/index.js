// Dashboard page

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_ERROR } from '../../redux/types';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import Fade from '@material-ui/core/Fade';

// Firebase
import firebase from '../../firebase/firebase';

// Components
import DataView from '../../components/DataView';

// Utiliuty
import { logObj, randomNum, formatTime } from '../../lib';

// Custom styles
import useStyles from './style';

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

const timeout = 1000;

const Dashboard = () => {
	console.log('TCL: Dashboard -> Dashboard 0');

	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const dataAddListener = useRef();
	const login = useSelector(state => state.user.login);
	const settings = useSelector(state => state.ui.settings);

	const [enter, setEnter] = useState(true);
	const [data, setData] = useState({});
	const { arduino, temperature, humidity, co2, date } = data;

	const formatTimeMemo = useMemo(() => formatTime(data.date), data.date);

	useEffect(() => {
		const labels = document.querySelectorAll(
			'.chart-container .axis, .chart-container .chart-label'
		);
		labels &&
			labels.forEach(label => {
				if (settings.darkTheme) label.classList.add('fill-white');
				else label.classList.remove('fill-white');
			});
	}, [settings.darkTheme]);

	useEffect(() => {
		console.log('TCL: Dashboard -> useEffect 1');

		if (!login) history.push('/login');
		else {
			console.log('TCL: Dashboard -> useEffect 2');

			dataAddListener.current = firebase.fire

				.collection('sensors')
				.orderBy('date', 'desc')
				.limit(10)
				.onSnapshot(
					snapshot => {
						const data = {
							arduino: [],
							temperature: [],
							humidity: [],
							co2: [],
							date: []
						};
						snapshot.docChanges().forEach(change => {
							if (change.type === 'added') {
								const rec = change.doc.data();
								data.arduino.unshift(rec.arduino);
								data.temperature.unshift(rec.temperature);
								data.humidity.unshift(rec.humidity);
								data.co2.unshift(rec.co2);
								data.date.unshift(rec.date);
							}
						});
						setData(data);
					},
					error => console.log('TCL: Dashboard -> childAddedListener -> error:', error)
				);
		}

		return () => {
			if (dataAddListener.current) dataAddListener.current();
		};
		// eslint-disable-next-line
	}, [login]);

	return (
		<div>
			{date && settings.devMenu && (
				<div className={classes.dev}>
					<div className={classes.overlay} />
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
				</div>
			)}

			{data.date && (
				<Grid container direction='column' spacing={3}>
					{/* Temperature */}
					<Fade in={true} timeout={timeout}>
						<Grid item>
							<DataView
								size={250}
								elevation={12}
								title={'Temperature'}
								labels={formatTimeMemo}
								values={temperature || 0}
								valueError={50}
								maxItems={10}
								colors={[cyan[500]]}
							/>
						</Grid>
					</Fade>

					{/* Humidity */}
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '250ms' }}>
						<Grid item>
							<DataView
								size={250}
								elevation={12}
								title={'Humidity'}
								labels={'formatTime(date)'}
								values={humidity || 0}
								valueError={50}
								maxItems={10}
								colors={[blue[300]]}
							/>
						</Grid>
					</Fade>

					{/* CO2 */}
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '500ms' }}>
						<Grid item>
							<DataView
								size={250}
								elevation={12}
								title={'CO2'}
								labels={'formatTime(date)'}
								values={co2 || 0}
								valueError={50}
								maxItems={10}
								colors={[purple[300]]}
							/>
						</Grid>
					</Fade>
				</Grid>
			)}
		</div>
	);
};

export default Dashboard;
