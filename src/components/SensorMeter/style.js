// Login - custom style

import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const color = blueGrey[100];

export default makeStyles(theme => ({
	// root: {
	// 	display: 'flex'
	// },
	paper: {
		// margin: theme.spacing(1),
		padding: theme.spacing(1, 4),
		display: 'inline-block'
	},
	minmax: {
		marginLeft: theme.spacing(-2)
	},
	wrapper: {
		position: 'relative'
	},
	progress: {
		position: 'absolute'
		// margin: theme.spacing(3, 0, 2)
	},
	back: {
		color: color,
		position: 'absolute'
		// top: 3,
		// left: 3,
		// width: 144,
		// height: 144
		// margin: theme.spacing(3, 0, 2)
	},
	text: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	}
}));
