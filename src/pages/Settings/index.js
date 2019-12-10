// Navigation topbar

import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { darkThemeAction, devMenuAction } from '../../redux/actions';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import BuildIcon from '@material-ui/icons/Build';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// Hooks
import { useRedirect } from '../../hooks';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));

const Settings = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const settings = useSelector(state => state.ui.settings);

	// Redirect to loggin
	const login = useRedirect();

	return (
		<>
			{login && (
				<Paper elevation={12} className={classes.root}>
					<List subheader={<ListSubheader>Settings</ListSubheader>}>
						<ListItem>
							<ListItemIcon>
								{(settings.darkTheme && <Brightness4Icon />) || <Brightness7Icon />}
							</ListItemIcon>
							<ListItemText primary='Dark theme' />
							<ListItemSecondaryAction>
								<Switch
									edge='end'
									onChange={() => dispatch(darkThemeAction(!settings.darkTheme))}
									checked={settings.darkTheme}
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<BuildIcon />
							</ListItemIcon>
							<ListItemText primary='Developer menu' />
							<ListItemSecondaryAction>
								<Switch
									edge='end'
									onChange={() => dispatch(devMenuAction(!settings.devMenu))}
									checked={settings.devMenu}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</Paper>
			)}
		</>
	);
};

export default Settings;
