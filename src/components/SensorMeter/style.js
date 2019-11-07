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
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	minmax: {
		//marginLeft: theme.spacing(-2),
		// background: 'lime'
		textAlign: 'center'
		// padding: theme.spacing(0, 4)
	},
	wrapper: {
		// textAlign: 'center',
		display: 'flex',
		justifyContent: 'center'
	},
	progress: {
		// margin: '15px 0',
		position: 'relative',
		margin: theme.spacing(2, 0)
	},
	progressFront: {
		// position: 'absolute',
		// zIndex: 1
		// transform: 'translate(-50%, -50%)'
	},
	progressBack: {
		color: color,
		position: 'absolute'
		// transform: 'translate(-50%, -50%)'
		// topheme.spacing(3, 0, 2)
	},
	textValue: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
	textTitle: {
		alignSelf: 'flex-start'
	}
}));
