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
import { Paper } from '@material-ui/core';

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
	yRegions = null
}) => {
	const classes = useStyles();

	return (
		//{/* <div className={classes.grid}> */}
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
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default DataView;
