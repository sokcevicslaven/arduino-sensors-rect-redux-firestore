// App - custom style

import { makeStyles } from '@material-ui/core/styles';
// import { blue, red } from '@material-ui/core/colors';

export default makeStyles(theme => ({
	root: {
		// background: red[100],
		display: 'flex'
	},
	marginLeft: {
		marginLeft: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			marginLeft: 'auto'
		}
	},
	pageContainer: {
		// background: blue[100],
		position: 'relative',
		padding: theme.spacing(3)
	},
	page: {
		position: 'absolute',
		left: 15,
		right: 15
	},
	pageEnter: {
		opacity: 0,
		transform: 'scale(1.1)'
	},
	pageEnterActive: {
		opacity: 1,
		transform: 'scale(1)',
		transition: 'opacity 300ms, transform 300ms'
	},
	pageExit: {
		opacity: 1,
		transform: 'scale(1)'
	},
	pageExitActive: {
		opacity: 0,
		transform: 'scale(0.9)',
		transition: 'opacity 300ms, transform 300ms'
	}
}));
