// Main application

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Hooks
import { useAuthStateChanged } from '../../hooks';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

// Compponents
import Topbar from '../Topbar';
import Routes from '../../Routes';

// Styles
import useStyles from './style';

const App = () => {
	const classes = useStyles();

	// Listen fro firebase authorization change
	useAuthStateChanged();

	return (
		<Router>
			<Topbar />
			<Toolbar />
			<Container className={`${classes.pageContainer} ${classes.marginLeft}`}>
				<Switch>
					<Routes />
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
