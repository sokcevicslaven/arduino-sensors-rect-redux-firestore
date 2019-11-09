// Topbar navigation

import clsx from 'clsx';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../../redux/actions/userActions';

// Material UI
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// Styles
import useStyle from './style';

const Topbar = ({ open, drawerWidth, handleDrawerOpen }) => {
	console.log('TCL: Topbar -> open', open);
	const classes = useStyle({ drawerWidth: drawerWidth });
	const dispatch = useDispatch();
	const login = useSelector(state => state.user.login);
	const details = useSelector(state => state.user.details);

	const getLoginLogoutButton = () => {
		if (login)
			return (
				<div>
					<Button color='inherit' onClick={() => dispatch(logoutAction())}>
						Log out
					</Button>
					<Fab size='small' className={classes.avatar}>
						<Link to='/' component={RouterLink} underline='none' color='inherit' variant='inherit'>
							<Typography variant='h6'>{details.displayName}</Typography>
						</Link>
					</Fab>
				</div>
			);
		else
			return (
				<Button component={RouterLink} to={'/login'} color='inherit'>
					Log in
				</Button>
			);
	};

	return (
		<AppBar
			component='div'
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open
			})}
		>
			<Toolbar>
				{/* Hamburger */}
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={handleDrawerOpen}
					edge='start'
					className={clsx(classes.menuButton, {
						[classes.hide]: open
					})}
				>
					{/* <FontAwesomeIcon icon={faBars} /> */}
					<MenuIcon fontSize='large' />
				</IconButton>

				<Container className={classes.container}>
					<Box display='flex' justifyContent='space-between'>
						<div>
							<Link
								to='/'
								component={RouterLink}
								underline='none'
								color='inherit'
								variant='inherit'
							>
								<Typography variant='h5' style={{ marginTop: 4 }} noWrap>
									Arduino Sensors
								</Typography>
							</Link>
						</div>
						{getLoginLogoutButton()}
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;
