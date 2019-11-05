// Chart that listen for sensor data change

import { useEffect, useRef, useMemo } from 'react';

// Frappe chart
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

// Utility
import { formatDatetime } from '../lib';

const dummyData = n => {
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

const useChart = (login, tagId, number = 3) => {
	console.log('TCL: useChart -> useChart 0');

	const chartRef = useRef();
	const dummyDataMemo = useMemo(() => dummyData(number), [number]);

	const updateData = rawData =>
		chartRef && chartRef.current && chartRef.current.update(formatData(rawData));

	useEffect(() => {
		console.log('TCL: useChart -> useEffect 1');

		if (login) {
			console.log('TCL: useChart -> useEffect 2');

			chartRef.current = new Chart(tagId, {
				title: 'Sensor data',
				data: dummyDataMemo,
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
			});
		}
		return () => {
			if (chartRef.current) chartRef.current = null;
		};
		// eslint-disable-next-line
	}, [login]);

	return updateData;
};

export default useChart;
