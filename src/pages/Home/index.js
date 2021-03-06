// Home page

// React / Redux
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ERROR } from '../../store/types';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';
import Fade from '@material-ui/core/Fade';

// Components
import DataView from '../../components/DataView';

// Firebase
import firebase from '../../firebase/firebase';

// Utiliuty
import { logObj, randomNum } from '../../lib';

// Custom styles
import useStyles from './style';

// Add random sensor data
const addData = async (dispatch) => {
	try {
		await firebase.addData('sensors', {
			arduino: 0,
			co2: randomNum(20),
			date: new Date(),
			humidity: randomNum(100),
			temperature: randomNum(50),
		});
	} catch (err) {
		logObj(err);
		dispatch({ type: SET_ERROR, payload: err });
	}
};

// Deafult constants
const size = 320;
const timeout = 1000;
const defaultLimits = {
	max: 0,
	min: 0,
};

const Home = () => {
	// console.log('Home -> page');

	// Custom style
	const classes = useStyles();

	// Redux
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.ui.settings);

	// Firebase data change listener
	const dataAddListener = useRef();

	// Chart data
	const [data, setData] = useState({});

	// Sensors limits
	const [limits, setLimits] = useState({});

	useEffect(() => {
		/************************************************************
		 * Fetch sensors limits from firebase
		 ************************************************************/

		// TODO Add device selector and save settings into database
		const arduino = '1';

		(async () => {
			try {
				const data = await firebase.getDocumentData('settings', arduino);
				if (!data) return;
				setLimits({ ...data });
			} catch (error) {
				console.log('Error in fetching arduino settings from database:', error);
			}
		})();

		/************************************************************
		 * Create firebase data change listener
		 ************************************************************/

		dataAddListener.current = firebase.fire
			.collection('sensors')
			.orderBy('date', 'desc')
			.limit(10)
			.onSnapshot(
				// Data change handler
				(snapshot) => {
					snapshot.docChanges().forEach((change) => {
						if (change.type === 'added') {
							const data = change.doc.data();
							const date = data.date.seconds * 1000;

							// Render page on every array item
							// because of chart animation
							setData({
								date: date,
								arduino: data.arduino,
								temperature: { x: date, y: data.temperature },
								humidity: { x: date, y: data.humidity },
								co2: { x: date, y: data.co2 },
							});
						}
					});
				},
				// Error handler
				(error) => console.log('Error in data change listener:', error)
			);

		return () => {
			// Remove data change listener on exit
			if (dataAddListener.current) dataAddListener.current();
		};
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{settings.devMenu && data && (
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
								<li>arduino: arduino 0</li>
								<li>temperature: {data.temperature && data.temperature.y}</li>
								<li>humidity: {data.humidity && data.humidity.y}</li>
								<li>co2: {data.co2 && data.co2.y}</li>
								<li>
									date:
									{(data.date && new Date(data.date).toLocaleString()) || 'no date'}
								</li>
							</ul>
						</Grid>
					</Grid>
				</div>
			)}

			{data.temperature && (
				<Grid container direction='column' spacing={3}>
					{/* Temperature */}
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '500ms' }}>
						<Grid item>
							<DataView
								size={size}
								elevation={12}
								title={'Temperature'}
								symbol={176}
								data={data.temperature}
								priColor={orange[600]}
								maxItems={10}
								limits={limits.temperature || defaultLimits}
								chartBand={{
									color: green[200],
									from: 18,
									to: 35,
								}}
							/>
						</Grid>
					</Fade>

					{/* Humidity */}
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '750ms' }}>
						<Grid item>
							<DataView
								size={size}
								elevation={12}
								title={'Humidity'}
								//symbol={176}
								data={data.humidity}
								priColor={blue[700]}
								maxItems={10}
								limits={limits.humidity || defaultLimits}
								chartBand={{
									color: green[200],
									from: 40,
									to: 80,
								}}
							/>
						</Grid>
					</Fade>

					{/* CO2 */}
					<Fade in={true} timeout={timeout} style={{ transitionDelay: '1000ms' }}>
						<Grid item>
							<DataView
								size={size}
								elevation={12}
								title={'CO2'}
								//symbol={11823}
								data={data.co2}
								priColor={cyan[600]}
								maxItems={10}
								limits={limits.co2 || defaultLimits}
								chartBand={{
									color: green[200],
									from: 8,
									to: 16,
								}}
							/>
						</Grid>
					</Fade>
				</Grid>
			)}
		</>
	);
};

export default Home;
