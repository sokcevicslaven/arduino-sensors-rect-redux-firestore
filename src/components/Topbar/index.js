import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actions/userActions';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
// Styles
import useStyle from './style';

const Topbar = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const login = useSelector(state => state.user.login);
	// const loading = useSelector(state => state.ui.loading);
	const details = useSelector(state => state.user.details);

	const getLoginLogoutButton = login => {
		if (login)
			return (
				<Button color='inherit' onClick={() => dispatch(logoutAction())}>
					Log out
				</Button>
			);
		else
			return (
				<Button component={RouterLink} to={'/login'} color='inherit'>
					Log in
				</Button>
			);
	};

	return (
		<AppBar>
			<Toolbar className={classes.toolbar}>
				<div>
					<Link to='/' component={RouterLink} underline='none' color='inherit' variant='inherit'>
						<Typography variant='h5' style={{ marginTop: 4 }} noWrap>
							Arduino Sensors
						</Typography>
					</Link>
				</div>
				<div>{getLoginLogoutButton(login)}</div>
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;
