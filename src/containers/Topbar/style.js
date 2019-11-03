import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(theme => ({
	toolbar: {
		justifyContent: 'space-between'
	},
	avatar: {
		margin: theme.spacing(0, 1),
		color: theme.palette.secondary.contrastText,
		background: theme.palette.secondary.main,
		'&:hover': {
			background: theme.palette.secondary.dark
		},
		fontSize: 'inherit',
		display: 'inline-flex',
		boxShadow: 'none',
		'&:active': {
			boxShadow: 'none'
		}
	}
}));

export default useStyle;
