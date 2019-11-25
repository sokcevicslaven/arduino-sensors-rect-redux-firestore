// Dashboard page

import React, { useState, /* useMemo, */ useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_ERROR } from '../../redux/types';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';
import Fade from '@material-ui/core/Fade';

// Firebase
import firebase from '../../firebase/firebase';

// Components
import DataView from '../../components/DataView';

// Utiliuty
import { logObj, randomNum /* formatTime */ } from '../../lib';

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
	console.log('TCL: Dashboard -> Dashboard');

	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const dataAddListener = useRef();
	const login = useSelector(state => state.user.login);
	const settings = useSelector(state => state.ui.settings);

	const [data, setData] = useState({});
	const { arduino, temperature, humidity, co2, date } = data;

	// const formatTimeMemo = useMemo(() => formatTime(data.date), data.date);
	// const tempDataMemo = useMemo(() => ({ x: data.date.seconds * 1000, y: data.temperature }), []);

	// const x = (data && data.date && data.date.seconds * 1000) || new Date().getTime();

	// useEffect(() => {
	// const labels = document.querySelectorAll(
	// 	'.chart-container .axis, .chart-container .chart-label'
	// );
	// labels &&
	// 	labels.forEach(label => {
	// 		if (settings.darkTheme) label.classList.add('fill-white');
	// 		else label.classList.remove('fill-white');
	// 	});
	// }, [settings.darkTheme]);

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
						snapshot.docChanges().forEach(change => {
							if (change.type === 'added') {
								const rec = change.doc.data();
								setData({
									arduino: rec.arduino,
									temperature: rec.temperature,
									humidity: rec.humidity,
									co2: rec.co2,
									date: rec.date
								});
							}
						});
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
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '500ms' }}>
						<Grid item>
							<DataView
								size={300}
								elevation={12}
								title={'Temperature'}
								symbol={176}
								data={{ x: date.seconds * 1000, y: temperature }}
								priColor={orange[600]}
								maxItems={10}
								valueError={30}
								chartBand={{
									color: green[200],
									from: 18,
									to: 35
								}}
							/>
						</Grid>
					</Fade>

					{/* Humidity */}
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '750ms' }}>
						<Grid item>
							<DataView
								size={300}
								elevation={12}
								title={'Humidity'}
								symbol={176}
								data={{ x: date.seconds * 1000, y: humidity }}
								priColor={blue[700]}
								maxItems={10}
								valueError={30}
								chartBand={{
									color: green[200],
									from: 40,
									to: 80
								}}
							/>
						</Grid>
					</Fade>

					{/* CO2 */}
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '1000ms' }}>
						<Grid item>
							<DataView
								size={300}
								elevation={12}
								title={'CO2'}
								symbol={176}
								data={{ x: date.seconds * 1000, y: co2 }}
								priColor={cyan[600]}
								maxItems={10}
								valueError={30}
								chartBand={{
									color: green[200],
									from: 8,
									to: 16
								}}
							/>
						</Grid>
					</Fade>
				</Grid>
			)}
		</div>
	);
};

export default Dashboard;
