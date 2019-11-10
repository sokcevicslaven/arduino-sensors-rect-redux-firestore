// Chart that listen for sensor data change

import React, { useEffect, useRef, useState } from 'react';

// Frappe chart
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

const initOption = () => {
	return {
		// title: 'Sensor data',
		type: 'axis-mixed',
		height: 300,
		colors: ['light-blue', '#ffa3ef', 'purple'],
		lineOptions: { regionFill: 1 },
		barOptions: { height: 11, depth: 50 },
		axisOptions: { xAxisMode: 'tick' },
		data: {
			yMarkers: [{ label: 'Marker', value: 70, options: { labelPos: 'left' } }],
			yRegions: [{ label: 'Region', start: 10, end: 50, options: { labelPos: 'right' } }],
			labels: [],
			datasets: [
				{
					// name: '',
					// chartType: 'line',
					values: []
				}
			]
		}
	};
};

const initData = () => {
	return {
		// yMarkers: [{ label: 'Marker', value: 70, options: { labelPos: 'left' } }],
		// yRegions: [{ label: 'Region', start: 10, end: 50, options: { labelPos: 'right' } }],
		labels: [],
		datasets: [{ values: [] }]
	};
};

const ChartControl = ({
	title = '',
	label,
	value,
	maxItems = 10,
	yMarkers = null,
	yRegions = null,
	colors = null
}) => {
	console.log('TCL: ChartControl -> ChartControl');

	// Refs
	const tagRef = useRef();
	const chartRef = useRef();
	const countRef = useRef(0);
	const firstRef = useRef(true);
	// const itemsRef = useRef({ labels: [], datasets: [{ values: [] }] });
	const itemsRef = useRef(initData());
	// const [state, setState] = useState(initData());

	useEffect(() => {
		console.log('TCL: ChartControl -> useEffect 1');

		// tagRef.current = document.getElementById(`chart-${title}`);

		// Create and init chart
		const options = initOption();
		yMarkers && (options.data.yMarkers = yMarkers);
		yRegions && (options.data.yRegions = yRegions);
		colors && (options.colors = colors);
		title && (options.data.datasets[0].name = title);

		chartRef.current = new Chart(tagRef.current, options);
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

				// setState(state => {
				// 	const data = state;
				// 	data.labels.push(label);
				// 	data.datasets[0].values.push(value);
				// 	return data;
				// });
			} else {
				// Remove first item in array
				itemsRef.current.labels.shift();
				itemsRef.current.datasets[0].values.shift();

				// Update item in array
				itemsRef.current.labels.push(label);
				itemsRef.current.datasets[0].values.push(value);

				// Update chart
				chartRef.current.update(itemsRef.current);

				// setState(state => {
				// 	const data = state;
				// 	data.labels.shift();
				// 	data.labels.push(label);
				// 	data.datasets[0].values.shift();
				// 	data.datasets[0].values.push(value);
				// 	chartRef.current.update(data);
				// 	return data;
				// });
			}
		}

		// else if (countRef.current === maxItems) chartRef.current.removeDataPoint(0);
		// Update chart on next data change
		// chartRef.current.update(data);

		// eslint-disable-next-line
	}, [label, value]);

	// return <div ref={tagRef} />;
	return <div ref={tagRef} />;
};

export default ChartControl;
