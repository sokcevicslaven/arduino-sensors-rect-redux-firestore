import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// Custom styles
import useStyles from './style';

const SensorMeter = ({ title, symbol, size, value, valueError, priColor, secColor }) => {
	// console.log('TCL: SensorMeter');

	const classes = useStyles({ colors: [priColor, secColor] });

	const [min, setMin] = useState(value);
	const [max, setMax] = useState(value);

	const error = value >= valueError;
	const char = String.fromCharCode(symbol);

	useEffect(() => {
		// console.log('TCL: SensorMeter -> useEffect');
		if (value < min) setMin(value);
		else if (value > max) setMax(value);
		// eslint-disable-next-line
	}, [value]);

	return (
		<div className={classes.root}>
			<Typography variant='subtitle1' className={classes.title}>
				{title}
			</Typography>

			<div className={classes.container}>
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
					style={{ marginLeft: (symbol && 8) || 0 }}
					className={clsx(classes.center, {
						[classes.primary]: !error,
						[classes.error]: error
					})}
				>
					{value + char}
				</Typography>
			</div>

			<div className={classes.footer}>
				<div>
					<Typography variant='body1'>{max + char}</Typography>
					<Typography variant='body2'>Max</Typography>
				</div>

				<div>
					<Typography variant='body1'>{min + char}</Typography>
					<Typography variant='body2'>Min</Typography>
				</div>
			</div>
		</div>
	);
};

export default SensorMeter;
