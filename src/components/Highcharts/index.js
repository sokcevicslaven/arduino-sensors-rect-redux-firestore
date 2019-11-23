// Data chart view

import React, { useState, useRef, useEffect } from 'react';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Chart options
import makeOptions from './options';

const Chart = ({ title, data, maxItems, device, symbol, color, band }) => {
	console.log('TCL: Chart -> data', data);
	console.log('TCL: Chart');

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
		console.log('TCL: ChartControl -> useEffect');

		const x = (data && data.x) || new Date().getTime();
		const y = (data && data.y) || 0;
		const serie = (charRef.current && charRef.current.chart.series[0]) || null;

		// if (!initRef.current)
		serie && serie.data.length >= maxItems
			? serie.addPoint([x, y], true, true)
			: serie.addPoint([x, y]);
		// else serie.setData(data);
	}, [data]);

	return <HighchartsReact highcharts={Highcharts} options={state} ref={charRef} />;
};

export default Chart;
