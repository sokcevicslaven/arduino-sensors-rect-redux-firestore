// History page

import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Chart options
import makeOptions from './options';

// Firebase
import firebase from '../../firebase/firebase';

// Hooks
import { useRedirect } from '../../hooks';

// Custom styles
import useStyles from './style';

// Animation timeout
const timeout = 1000;

// Get data from firebase
const getData = (date, cb) => {
	// console.log('TCL: getData -> date', date);

	const dateFrom = new Date(date.from);
	const dateTo = new Date(date.to);
	dateTo.setDate(dateTo.getDate() + 1);

	// Check for valid range
	if (dateFrom > new Date() || dateTo < dateFrom) return;

	const temperature = [];
	const humidity = [];
	const co2 = [];

	firebase.fire
		.collection('sensors')
		.where('date', '>', dateFrom)
		.where('date', '<', dateTo)
		.orderBy('date', 'asc')
		.get()
		.then(snapshot => {
			console.log('TCL: getData -> snapshot', snapshot);

			snapshot.forEach(doc => {
				const data = doc.data();
				const date = data.date.seconds * 1000;
				temperature.push([date, data.temperature]);
				humidity.push([date, data.humidity]);
				co2.push([date, data.co2]);
			});

			// Call callback fnc
			cb([temperature, humidity, co2]);
		});
};

const History = () => {
	const classes = useStyles();
	// Redirect to loggin
	const login = useRedirect();
	const maxXS = useMediaQuery('(max-width:599.99px)');

	// States
	const [options, setOptions] = useState();
	const [date, setDate] = useState({
		from: new Date().toISOString().substring(0, 10),
		to: new Date().toISOString().substring(0, 10)
	});

	// Handle date changes
	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		setDate({
			...date,
			[name]: value
		});
	};

	useEffect(() => {
		console.log('TCL: History -> useEffect');
		if (login) {
			getData(date, data => {
				setOptions(
					makeOptions({
						subtitle: `from ${new Date(date.from).toLocaleDateString()} to ${new Date(
							date.to
						).toLocaleDateString()}`,
						colors: [orange[600], blue[700], cyan[600]],
						series: data
					})
				);
			});
		}
	}, [login, date]);

	// // Change chart labels color when app theme is changed
	// const darkTheme = useSelector(state => state.ui.settings.darkTheme);
	// useEffect(() => {
	// 	const color = darkTheme ? '#ffffff' : '#666666';
	// 	setOptions(state => {
	// 		if (state) {
	// 			const options = { ...state };
	// 			options.xAxis.labels && (options.xAxis.labels.style = { color: color });
	// 			options.yAxis.labels && (options.yAxis.labels.style = { color: color });
	// 			// options.yAxis.plotBands[0].label.style = { color: color };
	// 			return options;
	// 		} else return null;
	// 	});
	// }, [darkTheme]);

	if (!login) return null;
	else
		return (
			<Fade in={true} timeout={timeout} style={{ transitionDelay: '250ms' }}>
				<Paper elevation={12} className={classes.paper}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Grid
								container
								spacing={3}
								justify={maxXS ? 'center' : 'flex-start'}
								// direction={maxXS ? 'column' : 'row'}
								// alignItems='center'
							>
								<Grid item>
									<TextField
										name='from'
										label='From'
										type='date'
										value={date.from}
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item>
									<TextField
										name='to'
										label='To'
										type='date'
										value={date.to}
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										onChange={handleChange}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							{options && <HighchartsReact highcharts={Highcharts} options={options} />}
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		);
};

export default History;
