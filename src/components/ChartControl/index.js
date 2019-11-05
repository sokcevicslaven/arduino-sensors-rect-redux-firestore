// Chart that listen for sensor data change

import React, { useEffect, useRef, useState } from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';

// Frappe chart
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

// Utility
import { formatDatetime } from '../../lib';

// Custom styles
import useStyles from './style';

const initOption = {
	title: 'Sensor data',
	type: 'axis-mixed',
	height: 300,
	colors: ['light-blue', '#ffa3ef', 'purple'],
	lineOptions: {
		regionFill: 1 // default: 0
	},
	barOptions: {
		height: 11, // default: 20
		depth: 50 // default: 2
	},
	axisOptions: { xAxisMode: 'tick' }
};

const initData = (n = 10) => {
	console.log('TCL: generateDummyData -> n', n);
	const data = {
		yMarkers: [{ label: 'Marker', value: 70, options: { labelPos: 'left' } }],
		yRegions: [{ label: 'Region', start: 10, end: 50, options: { labelPos: 'right' } }],
		labels: [],
		datasets: [
			{
				name: 'CO2',
				chartType: 'bar',
				values: []
			},
			{
				name: 'Humidity',
				chartType: 'line',
				values: []
			},
			{
				name: 'Temperature',
				chartType: 'line',
				values: []
			}
		]
	};
	for (let i = 0; i < n; i++) {
		data.labels.push(formatDatetime());
		data.datasets[0].values.push(0);
		data.datasets[1].values.push(0);
		data.datasets[2].values.push(0);
	}
	return data;
};

const formatData = rawData => {
	console.log('TCL: rawData', rawData);
	const data = {
		yMarkers: [{ label: 'Marker', value: 70, options: { labelPos: 'left' } }],
		yRegions: [{ label: 'Region', start: 10, end: 50, options: { labelPos: 'right' } }],

		labels: [],
		datasets: [
			{
				name: 'CO2',
				chartType: 'bar',
				values: []
			},
			{
				name: 'Humidity',
				chartType: 'line',
				values: []
			},
			{
				name: 'Temperature',
				chartType: 'line',
				values: []
			}
		]
	};
	rawData.forEach(({ arduino, temperature, humidity, co2, date }, index) => {
		data.labels.push(
			(date && date.seconds && formatDatetime(new Date(date.seconds * 1000))) || formatDatetime()
		);
		data.datasets[0].values.push(co2);
		data.datasets[1].values.push(humidity);
		data.datasets[2].values.push(temperature);
	});
	console.log('TCL: data', data);
	return data;
};

const ChartControl = ({ elevation, data = initData, option = initOption }) => {
	console.log('TCL: ChartControl -> ChartControl');

	const classes = useStyles();
	const chartRef = useRef();
	const chartTagRef = useRef();
	const [first, setFirst] = useState(true);

	useEffect(() => {
		console.log('TCL: ChartControl -> useEffect 1');
		// Create and init chart
		initOption.data = (data && formatData(data)) || initData();
		chartRef.current = new Chart(chartTagRef.current, option);

		setFirst(false);
		return () => {
			// Remove char reference so it can be GC
			if (chartRef.current) chartRef.current = null;
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// Update chart on next data change
		!first && data && chartRef.current && chartRef.current.update(formatData(data));
		console.log('TCL: ChartControl -> !first', !first);
		console.log('TCL: ChartControl -> useEffect 2');
	}, [data]);

	return (
		<Paper elevation={elevation} className={classes.paper}>
			<div ref={chartTagRef} />
		</Paper>
	);
};

export default ChartControl;
