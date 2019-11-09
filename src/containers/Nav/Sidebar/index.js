// Layout - mini drawer

import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

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

	return (
		<Drawer
			variant='permanent'
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open
			})}
			classes={{
				paper: clsx({
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
				{['???'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
