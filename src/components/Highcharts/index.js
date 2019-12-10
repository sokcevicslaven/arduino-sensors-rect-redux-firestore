// Data chart view

import React, { useState, useRef, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Chart options
import makeOptions from './options';

const Chart = ({ title, data, maxItems, device, symbol, color, band }) => {
	// console.log('TCL: Chart');

	const charRef = useRef();
	// const initRef = useRef(true);

	const [state, setState] = useState(
		makeOptions({
			title: title,
			device: device,
			symbol: symbol,
			color: color,
			band: band
		})
	);

	useEffect(() => {
		// console.log('TCL: ChartControl -> useEffect');

		const x = (data && data.x) || new Date().getTime();
		const y = (data && data.y) || 0;
		const serie = (charRef.current && charRef.current.chart.series[0]) || null;

		// if (!initRef.current)
		serie && serie.data.length >= maxItems
			? serie.addPoint([x, y], true, true)
			: serie.addPoint([x, y]);
		// else serie.setData(data);
	}, [data, maxItems]);

	const darkTheme = useSelector(state => state.ui.settings.darkTheme);
	useEffect(() => {
		const color = darkTheme ? '#ffffff' : '#666666';
		// charRef.current.chart.xAxis[0].options.labels.style.color = color;
		// charRef.current.chart.yAxis[0].options.labels.style.color = color;

		// console.log(
		// 	'TCL: Chart -> charRef.current.chart',
		// 	charRef.current.chart.xAxis[0].options.labels.style.color
		// );

		setState(state => {
			const options = { ...state };
			//options.xAxis.labels.style = { color: color };
			options.xAxis.labels.style = { color: color };
			options.yAxis.labels.style = { color: color };
			options.yAxis.plotBands.style = { color: color };

			// console.log('TCL: Chart -> options.xAxis.labels.style', options.xAxis.labels);
			// options.xAxis[0].labels.style.color = color;

			// return {
			// 	...state,
			// 	xAxis: {
			// 		...state.xAxis,
			// 		labels: {
			// 			...state.xAxis.labels,
			// 			style: { ...state.xAxis.labels.style, color: color }
			// 		}
			// 	},
			// 	yAxis: {
			// 		...state.xAxis,
			// 		labels: {
			// 			...state.xAxis.labels,
			// 			style: { ...state.xAxis.labels.style, color: color }
			// 		}
			// 	},
			// 	labels: {
			// 		...state.labels,
			// 		style: {
			// 			...state.labels.style,
			// 			color: color
			// 		}
			// 	}
			// };
			return options;
		});
	}, [darkTheme]);

	return <HighchartsReact highcharts={Highcharts} options={state} ref={charRef} />;
};

export default Chart;
