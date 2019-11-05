import React, { useState, useEffect } from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Custom styles
import useStyles from './style';

const SensorMeter = ({ value, size, textVariant, valueError, elevation }) => {
	const classes = useStyles();
	const [min, setMin] = useState(value);
	const [max, setMax] = useState(value);

	useEffect(() => {
		if (value < min) setMin(value);
		else if (value > max) setMax(value);
	}, [value]);

	return (
		<Paper elevation={elevation} className={classes.paper}>
			<Typography variant='body1' className={classes.minmax}>
				max: {max}
			</Typography>
			<div style={{ height: size, width: size }} className={classes.wrapper}>
				<CircularProgress
					variant='static'
					thickness={2}
					style={{ top: 3, left: 3, height: size - 6, width: size - 6 }}
					value={100}
					className={classes.back}
				/>
				<CircularProgress
					variant='static'
					color={(value >= valueError && 'secondary') || 'primary'}
					size={size}
					value={value}
					className={classes.progress}
				/>
				<Typography variant={textVariant} className={classes.text}>
					{value}
				</Typography>
			</div>
			<Typography variant='body1' className={classes.minmax}>
				min: {min}
			</Typography>
		</Paper>
	);
};

export default SensorMeter;
