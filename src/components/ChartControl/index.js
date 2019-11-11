// Chart that listen for sensor data change

import React, { useEffect, useRef } from 'react';

// Frappe chart
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

const initOption = count => {
	return {
		// title: 'Sensor data',
		type: 'axis-mixed',
		height: 300,
		colors: ['light-blue', '#ffa3ef', 'purple'],
		lineOptions: { regionFill: 1 },
		barOptions: { height: 11, depth: 50 },
		axisOptions: { xAxisMode: 'tick' },
		// data: {
		// 	// yMarkers: [{ label: 'Marker', value: 70, options: { labelPos: 'left' } }],
		//   // yRegions: [{ label: 'Region', start: 10, end: 50, options: { labelPos: 'right' } }],
		// 	labels: [],
		// 	datasets: [{ values: [] }]
		// }
		data: initData(count)
	};
};

const initData = count => {
	const data = {
		yMarkers: [{ label: 'Marker', value: 70, options: { labelPos: 'left' } }],
		yRegions: [{ label: 'Region', start: 10, end: 50, options: { labelPos: 'right' } }],
		labels: [],
		datasets: [{ values: [] }]
	};
	for (let i = 0; i < count; i++) {
		data.labels.push(0);
		data.datasets[0].values.push(0);
	}
	return data;
};

const ChartControl = ({
	title = '',
	labels,
	values,
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
	const itemsRef = useRef(initData(maxItems));

	useEffect(() => {
		console.log('TCL: ChartControl -> useEffect 1');

		// Create and init chart
		const options = initOption(maxItems);
		colors && (options.colors = colors);
		yMarkers && (options.data.yMarkers = yMarkers);
		yRegions && (options.data.yRegions = yRegions);
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

		if (!firstRef.current && chartRef.current) {
			console.log('TCL: ChartControl -> useEffect 3');
			for (let i = 0; i < values.length; i++) {
				console.log('TCL: ChartControl -> useEffect 4');
				// Remove first item in array
				itemsRef.current.labels.shift();
				itemsRef.current.datasets[0].values.shift();

				// Update item in array
				itemsRef.current.labels.push(labels[i] || 'no data');
				itemsRef.current.datasets[0].values.push(values[i] || 0);
			}

			// Update chart
			chartRef.current.update(itemsRef.current);
		}

		// eslint-disable-next-line
	}, [labels, values]);

	return <div ref={tagRef} />;
};

export default ChartControl;
