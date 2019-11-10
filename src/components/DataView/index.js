import React from 'react';
import Grid from '@material-ui/core/Grid';

// Material UI
import Paper from '@material-ui/core/Paper';

// Components
import SensorMeter from '../SensorMeter';
import ChartControl from '../ChartControl';

// Custom styles
import useStyles from './style.js';

const DataView = ({
	title = '',
	size = 300,
	label,
	value,
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
						value={value}
						simbol={simbol}
						textVariant={textVariant}
						valueError={valueError}
					/>
				</Grid>
				<Grid item xs={12} sm={9}>
					<ChartControl
						title={title}
						label={label}
						value={value}
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
