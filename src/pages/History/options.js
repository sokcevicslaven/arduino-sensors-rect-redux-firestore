// Make chart options

import Highcharts from 'highcharts';

const makeOptions = props => {
	return {
		chart: {
			// height: 280,
			// margin: [30, 20, 50, 50],
			backgroundColor: 'transparent',
			style: {
				fontFamily: 'Roboto'
			}
		},

		time: {
			timezoneOffset: -60
		},

		title: {
			text: 'History chart',
			margin: 50
		},

		subtitle: {
			text: props.subtitle
		},

		colors: props.colors,

		legend: {
			// enabled: false
			margin: 24
		},

		xAxis: {
			type: 'datetime',
			tickWidth: 0,
			labels: {
				format: '{value: %e.%b %H:%M}',
				align: 'right',
				rotation: -45
			},
			minPadding: 0.03,
			maxPadding: 0.03
		},

		yAxis: {
			title: {
				text: null
			}
		},

		tooltip: {
			crosshairs: true,
			shared: true
		},

		series: [
			{
				name: 'Temperature',
				data: props.series[0]
			},
			{
				name: 'Humidity',
				data: props.series[1]
			},
			{
				name: 'CO2',
				data: props.series[2]
			}
		]
	};
};

export default makeOptions;
