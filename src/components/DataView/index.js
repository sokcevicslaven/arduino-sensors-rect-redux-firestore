// Veiw data from database

import React from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components
import SensorMeter from '../SensorMeter';
import Chart from '../Highcharts';

// Custom styles
import useStyles from './style';

const DataView = ({
	title = null,
	size = 300,
	symbol = null,
	priColor = null,
	secColor = null,
	elevation = 4,
	valueError = 50,
	device = 'Device 1',
	data = null,
	maxItems = 10,
	chartBand = null,
	chartTitle = false
}) => {
	console.log('TCL: DataView');

	const classes = useStyles();

	return (
		<Paper elevation={elevation} className={classes.paper}>
			<Grid container>
				{/* Round progress metter */}
				<Grid item xs={12} sm={3}>
					<SensorMeter
						size={size}
						title={title}
						value={(data && data.y) || 0}
						symbol={symbol}
						priColor={priColor}
						secColor={secColor}
						valueError={valueError}
					/>
				</Grid>

				{/* Chart */}
				<Grid item xs={12} sm={9}>
					<Chart
						title={(chartTitle && title) || null}
						data={data}
						symbol={symbol}
						device={device}
						band={chartBand}
						color={priColor}
						maxItems={maxItems}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default DataView;
