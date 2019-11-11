import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Custom styles
import useStyles from './style';

const SensorMeter = ({ title, value, simbol, size, valueError, colors }) => {
	const classes = useStyles({ colors: colors });
	const [min, setMin] = useState(value);
	const [max, setMax] = useState(value);

	const error = value >= valueError;

	useEffect(() => {
		if (value < min) setMin(value);
		else if (value > max) setMax(value);
		// eslint-disable-next-line
	}, [value]);

	return (
		<div className={classes.root}>
			<Typography paragraph variant='subtitle1' className={classes.title}>
				{title}
			</Typography>

			<Box position='relative'>
				<CircularProgress
					variant='static'
					thickness={2}
					style={{ top: size * 0.01, left: size * 0.01, height: size * 0.48, width: size * 0.48 }}
					value={100}
					className={classes.back}
				/>

				<CircularProgress
					variant='static'
					size={size * 0.5}
					value={value}
					className={clsx({
						[classes.primary]: !error,
						[classes.error]: error
					})}
				/>

				<Typography
					variant='h4'
					// color={(value >= valueError && 'secondary') || 'primary'}
					className={clsx(classes.center, {
						[classes.primary]: !error,
						[classes.error]: error
					})}
				>
					{value + String.fromCharCode(simbol)}
				</Typography>
			</Box>

			<div className={classes.footer}>
				<div>
					<Typography variant='body1'>{max + String.fromCharCode(simbol)}</Typography>
					<Typography variant='body2'>Max</Typography>
				</div>

				<div>
					<Typography variant='body1'>{min + String.fromCharCode(simbol)}</Typography>
					<Typography variant='body2'>Min</Typography>
				</div>
			</div>
		</div>
	);
};

export default SensorMeter;
