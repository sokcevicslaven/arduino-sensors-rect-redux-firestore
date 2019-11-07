// Login - custom style

import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const color = blueGrey[100];

export default makeStyles(theme => ({
	grid: {
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: theme.spacing(2)
	},
	wrapper: {
		position: 'relative'
		// margin: theme.spacing(2, 0)
	},
	progressBack: {
		color: color,
		position: 'absolute'
	},
	// textTitle: {
	//   alignSelf: 'flex-start',
	//   marg
	// },
	center: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
	minMax: {
		textAlign: 'center',
		marginBottom: theme.spacing(4)
	}
}));
