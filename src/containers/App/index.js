// Main application

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Hooks
import { useAuthStateChanged } from '../../hooks';

// Material UI
// import clsx from 'clsx';
// import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

// Compponents
import Nav from '../Nav';
import Routes from '../../Routes';

// Styles
import useStyles from './style';

const App = () => {
	const classes = useStyles();

	// Listen fro firebase authorization change
	useAuthStateChanged();

	return (
		<Router>
			<div className={classes.root}>
				<Nav />
				<Container component='main' className={classes.pageContainer}>
					<div className={classes.toolbarMargin} />
					<Switch>
						<Routes />
					</Switch>
				</Container>
			</div>
		</Router>
	);
};

export default App;
