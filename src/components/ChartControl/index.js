// Chart that listen for sensor data change

import React, { useEffect, useRef } from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';

// Frappe chart
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

// Utility
// import { formatDatetime } from '../../lib';

// Custom styles
import useStyles from './style';

const initOption = {
	// title: 'Sensor data',
	type: 'axis-mixed',
	height: 300,
	colors: ['light-blue', '#ffa3ef', 'purple'],
	lineOptions: { regionFill: 1 },
	barOptions: { height: 11, depth: 50 },
	axisOptions: { xAxisMode: 'tick' }
};

const initData = ({ title, yMarkers, yRegions }) => {
	console.log('TCL: generateDummyData -> title', title);

	return {
		yMarkers: yMarkers || [{ label: 'Marker', value: 70, options: { labelPos: 'left' } }],
		yRegions: yRegions || [{ label: 'Region', start: 10, end: 50, options: { labelPos: 'right' } }],
		labels: [],
		datasets: [
			{
				name: title,
				chartType: 'line',
				values: []
			}
		]
	};
	// for (let i = 0; i < n; i++) {
	// 	data.labels.push(formatDatetime());
	// 	data.datasets[0].values.push(0);
	// data.datasets[1].values.push(0);
	// data.datasets[2].values.push(0);
	// }
	// return data;
};

const ChartControl = ({
	title = '',
	// elevation,
	label,
	value,
	option = initOption,
	maxItems = 10,
	yMarkers = null,
	yRegions = null
}) => {
	console.log('TCL: ChartControl -> ChartControl');

	// Styles
	const classes = useStyles();

	// Refs
	const tagRef = useRef();
	const chartRef = useRef();
	const countRef = useRef(0);
	const firstRef = useRef(true);
	const itemsRef = useRef(initData({ title, yMarkers, yRegions }));

	useEffect(() => {
		console.log('TCL: ChartControl -> useEffect 1');

		// Create and init chart
		initOption.data = initData({ title, yMarkers, yRegions });
		chartRef.current = new Chart(tagRef.current, option);
		countRef.current = countRef.current + 1;
		firstRef.current = false;

		return () => {
			if (chartRef.current) {
				// Remove char reference so it can be GC
				chartRef.current.destroy();
				chartRef.current = null;
			}
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		console.log('TCL: ChartControl -> useEffect 2');

		if (!firstRef.current && label && chartRef.current) {
			if (countRef.current <= maxItems) {
				// Incerment items counter
				countRef.current = countRef.current + 1;

				// Add new item to chart at the end
				chartRef.current.addDataPoint(label, [value]);

				// Push item to array
				itemsRef.current.labels.push(label);
				itemsRef.current.datasets[0].values.push(value);
			} else {
				// Remove first item in array
				itemsRef.current.labels.shift();
				itemsRef.current.datasets[0].values.shift();

				// Update item in array
				itemsRef.current.labels.push(label);
				itemsRef.current.datasets[0].values.push(value);

				// Update chart
				chartRef.current.update(itemsRef.current);
			}
		}

		// else if (countRef.current === maxItems) chartRef.current.removeDataPoint(0);
		// Update chart on next data change
		// chartRef.current.update(data);
	}, [label, value]);

	// useEffect(() => {
	//  first && data && chartRef.current && chartRef.current.update(data);
	// }, [data]);

	return (
		//{/* <Paper elevation={elevation} className={classes.paper}> */}
		<div ref={tagRef} />
		//{/* </Paper> */}
	);
};

export default ChartControl;
