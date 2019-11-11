// Veiw data from database

import React from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components
import SensorMeter from '../SensorMeter';
import ChartControl from '../ChartControl';

// Custom styles
import useStyles from './style';

const DataView = ({
	title = '',
	size = 300,
	labels,
	values,
	simbol = null,
	valueError = 50,
	textVariant = 'h3',
	elevation = 4,
	maxItems = 10,
	yMarkers = null,
	yRegions = null,
	colors = null
}) => {
	const classes = useStyles();

	return (
		<Paper elevation={elevation} className={classes.paper}>
			<Grid container>
				<Grid item xs={12} sm={3}>
					<SensorMeter
						size={size}
						title={title}
						value={values[values.length - 1]}
						simbol={simbol}
						textVariant={textVariant}
						valueError={valueError}
						colors={colors}
					/>
				</Grid>
				<Grid item xs={12} sm={9}>
					<ChartControl
						title={title}
						labels={labels}
						values={values}
						maxItems={maxItems}
						yMarkers={yMarkers}
						yRegions={yRegions}
						colors={colors}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default DataView;
