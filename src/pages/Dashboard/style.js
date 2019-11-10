// Dashboard - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
	dev: {
		padding: theme.spacing(2),
		display: 'inline-block',
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 999
	},
	button: {
		margin: theme.spacing(1)
	}
}));
