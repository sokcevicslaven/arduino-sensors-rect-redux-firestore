// Routes with transition effect

import React from 'react';
import { Route } from 'react-router-dom';

// Components
import Copyright from '../components/Copyright';
import PageTransition from '../components/PageTransition';
// import PrivateRoute from '../components/PrivateRoute';

// Pages
import Dev from '../pages/Dev';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/Dashboard';

// Routes => Compoonents
const routes = [
	{ name: 'Dev', path: '/dev', Component: Dev },
	{ name: 'Dashboard', path: '/', Component: Dashboard, privateRoute: true },
	{ name: 'Login', path: '/login', Component: Login },
	{ name: 'Signup', path: '/signup', Component: Signup }
];

const Routes = () => {
	// create routes from array
	return routes.map(({ path, name, Component, privateRoute }) => {
		// if (privateRoute)
		// 	return (
		// 		<PrivateRoute key={path} exact path={path}>
		// 			<PageTransition>
		// 				<Component />
		// 				<Copyright />
		// 			</PageTransition>
		// 		</PrivateRoute>
		// 	);
		// else

		return (
			<Route key={path} exact path={path}>
				{({ match }) => (
					<PageTransition match={match}>
						<Component />
						<Copyright />
					</PageTransition>
				)}
			</Route>
		);
	});
};

export default Routes;

/* <Route key={path} exact path={path}>
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
</Route>; */
