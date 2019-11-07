// Fromat char data

// Utility
import { formatTime } from '../../lib';
import { formatDatetime } from '../../lib';

const formatCharData = (rawData, short = true) => {
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
		const d =
			(date &&
				date.seconds &&
				((short && formatTime(new Date(date.seconds * 1000))) ||
					formatDatetime(new Date(date.seconds * 1000)))) ||
			((short && formatTime()) || formatDatetime());

		data.labels.push(d);
		data.datasets[0].values.push(co2);
		data.datasets[1].values.push(humidity);
		data.datasets[2].values.push(temperature);
	});
	return data;
};

export default formatCharData;
