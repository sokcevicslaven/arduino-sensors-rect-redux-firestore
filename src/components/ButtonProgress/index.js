// Button with circular progress bar

import React from 'react';

// Materual UI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom styles
import useStyles from './style.js';

const ButtonProgress = ({ loading, children }) => {
	const classes = useStyles();

	return (
		<Button
			type='submit'
			fullWidth
			variant='contained'
			color='primary'
			className={classes.button}
			disabled={loading}
		>
			{loading && (
				<div className={classes.progressWrapper}>
					<CircularProgress size={30} />
				</div>
			)}
			{children}
		</Button>
	);
};

export default ButtonProgress;
