// Chart that listen for sensor data change

import { useEffect, useRef, useMemo } from 'react';

// Frappe chart
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';

// Utility
import { formatDatetime } from '../lib';

const dummyData = n => {
	console.log('TCL: generateDummyData -> n', n);
	const data = {
		labels: [],
		datasets: [
			{
				name: 'Temperature',
				type: 'bar',
				values: []
			}
		]
	};
	for (let i = 0; i < n; i++) {
		data.labels.push(formatDatetime());
		data.datasets[0].values.push(0);
	}
	return data;
};

const formatData = rawData => {
	const data = {
		labels: [],
		datasets: [
			{
				name: 'Temperature',
				type: 'bar',
				values: []
			}
		]
	};
	rawData.forEach(({ arduino, temperature, humidity, co2, date }) => {
		data.labels.push(
			(date && date.seconds && new Date(date.seconds * 1000).toLocaleString()) || 'no date'
		);
		data.datasets[0].values.push(temperature);
	});
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
				title: 'My Awesome Chart',
				data: dummyDataMemo,
				// data: dummyData(number),
				type: 'axis-mixed',
				height: 250,
				colors: ['#7cd6fd', '#743ee2']
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
