// Routes with transition effect

import React from './node_modules/react';
// import { Route, Redirect } from 'react-router-dom';
import { Route } from './node_modules/react-router-dom';
import { CSSTransition } from './node_modules/react-transition-group';

// Components
import Copyright from '../Copyright/Copyright';

// Pages
import Home from '../pages/auth/Home';
import Login from '../../pages/auth/Login';
import Signup from '../../pages/auth/Signup';
import Dashboard from '../pages/dashboard/Dashboard';

// Styles
import useStyles from './style.js';

// Routes => Compoonents
const routes = [
	{ name: 'Home', path: '/', Component: Home },
	{ name: 'Login', path: '/login', Component: Login },
	{ name: 'Signup', path: '/signup', Component: Signup },
	{ name: 'Dashboard', path: '/dashboard', Component: Dashboard }
];

// const Routes = ({ authenticated }) => {
const Routes = () => {
	const classes = useStyles();

	// If user is authenticated,
	// change login and signup route to home page
	// const serRedirect = name => {
	// 	if (authenticated && (name == 'Login' || 'Signup')) return true;
	// 	return false;
	// };

	// create routes from array
	return routes.map(({ path, name, Component }) => (
		<Route key={path} exact path={path}>
			{({ match }) => (
				<CSSTransition
					in={match != null}
					timeout={300}
					unmountOnExit
					classNames={{
						enter: classes.pageEnter,
						enterActive: classes.pageEnterActive,
						exit: classes.pageExit,
						exitActive: classes.pageExitActive
					}}
				>
					<div className={classes.page}>
						<Component />
						<Copyright />
					</div>
				</CSSTransition>
			)}
		</Route>
	));
};

export default Routes;
