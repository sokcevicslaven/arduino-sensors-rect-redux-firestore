// Layout - mini drawer

import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setDarkThemeAction, setDevMenuAction } from '../../../redux/actions';

// Material UI
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import Switch from '@material-ui/core/Switch';

// Custom styles
import useStyles from './style';

// const routes = [
// 	{ path: '/temperature', name: 'Temperature', icon: faThermometerHalf },
// 	{ path: '/humidity', name: 'Humidity', icon: faTint },
// 	{ path: '/control', name: 'Control', icon: faSlidersH }
// ];

// Sidebar
const Sidebar = ({ open, drawerWidth, handleDrawerClose }) => {
	const classes = useStyles({ drawerWidth: drawerWidth });
	const dispatch = useDispatch();
	const darkTheme = useSelector(state => state.ui.darkTheme);
	const devMenu = useSelector(state => state.ui.devMenu);

	return (
		<Drawer
			variant='permanent'
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open
			})}
			classes={{
				paper: clsx('test', {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})
			}}
			open={open}
		>
			{/* Menu close button */}
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>

			<Divider />

			{/* Button links */}
			<List>
				<ListItem button component={Link} to='/'>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary='Dashboard' />
				</ListItem>

				<ListItem button component={Link} to='/dev'>
					<ListItemIcon>
						<DeveloperModeIcon />
					</ListItemIcon>
					<ListItemText primary='Developer' />
				</ListItem>

				<ListItem button component={Link} to='/settings'>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary='Settings' />
				</ListItem>
			</List>

			<Divider />

			<List>
				<ListItem>
					{/* Dark theme */}
					<Switch
						color='primary'
						className={classes.switchBtn}
						onClick={() => dispatch(setDarkThemeAction(!darkTheme))}
					/>
					<ListItemText primary='Dark theme' />
				</ListItem>

				<ListItem>
					{/* Developer menu */}
					<Switch
						//color='secundary'
						checked={devMenu}
						className={classes.switchBtn}
						onClick={() => dispatch(setDevMenuAction(!devMenu))}
					/>
					<ListItemText primary='Developer menu' />
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Sidebar;
