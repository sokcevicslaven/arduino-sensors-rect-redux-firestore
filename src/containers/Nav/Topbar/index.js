// Topbar navigation

import clsx from 'clsx';

// React
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { firebaseLogoutAction, setDarkThemeAction } from '../../../store/actions';

// Material UI
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// Material icons
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

// Styles
import useStyle from './style';

const Topbar = ({ open, drawerWidth, handleDrawerOpen }) => {
	const classes = useStyle({ drawerWidth: drawerWidth });

	const dispatch = useDispatch();
	const login = useSelector((state) => state.user.login);

	// User initials
	const userInitials = useSelector((state) => state.user.details.displayName);

	// Theme
	const darkTheme = useSelector((state) => state.ui.settings.darkTheme);
	const themeHandler = () => dispatch(setDarkThemeAction(!darkTheme));
	const logoutHandler = () => dispatch(firebaseLogoutAction());

	return (
		<AppBar
			position='fixed'
			color='primary'
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			})}
		>
			<Toolbar>
				{/* Hamburger */}
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={handleDrawerOpen}
					edge='start'
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>

				{/* Title */}
				<Typography variant='h6' noWrap className={classes.title}>
					Arduino Sensors
				</Typography>

				{/* Dark mode button*/}
				<Tooltip title={(darkTheme && 'Light theme') || 'Dark theme'} placement='bottom'>
					<IconButton color='inherit' onClick={themeHandler}>
						{(darkTheme && <Brightness4Icon />) || <Brightness7Icon />}
					</IconButton>
				</Tooltip>

				{(login && (
					<div>
						{/* Logout button */}
						<Tooltip title='Logout' placement='bottom'>
							<IconButton color='inherit' onClick={logoutHandler}>
								<ExitToAppIcon />
							</IconButton>
						</Tooltip>

						{/* User avatar */}
						<Fab size='small' className={classes.avatar}>
							<Link
								to='/'
								component={RouterLink}
								underline='none'
								color='inherit'
								variant='inherit'
							>
								<Typography variant='h6'>{userInitials}</Typography>
							</Link>
						</Fab>
					</div>
				)) || (
					// Login button
					<Button component={RouterLink} to={'/login'} color='inherit'>
						Log in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;
