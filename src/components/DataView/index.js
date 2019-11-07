import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

// Components
import SensorMeter from '../SensorMeter';
import ChartControl from '../ChartControl';
import formatCharData from '../ChartControl/formatCharData';

// Custom styles
import useStyles from './style.js';

// Utility
import { formatTime } from '../../lib';

const DataView = ({
	size = 300,
	title,
	value,
	simbol = null,
	textVariant = 'h3',
	valueError = 50,
	elevation = 3,
	yMarkers,
	yRegions
}) => {
	const classes = useStyles();

	return (
		//{/* <div className={classes.grid}> */}
		<Grid container justify='space-between'>
			<Grid item xs={12} sm={4}>
				<SensorMeter
					size={size}
					title={title}
					value={value}
					simbol={simbol}
					textVariant={textVariant}
					valueError={valueError}
					elevation={elevation}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<ChartControl
					title={title}
					label={formatTime()}
					value={value}
					maxItems={5}
					yMarkers={70}
					yRegionsStart={10}
					yRegionsEnd={10}
					elevation={elevation}
					yMarkers={yMarkers}
					yRegions={yRegions}
				/>
			</Grid>
		</Grid>
	);
};

export default DataView;
