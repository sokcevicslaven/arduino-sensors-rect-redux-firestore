// Main application

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Hooks
import { useAuthStateChanged } from '../../hooks';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
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
		<div className={classes.root}>
			{/* </div><Router basename={process.env.PUBLIC_URL}> */}
			<Router>
				<Nav />
				<Container component='main' className={`${classes.pageContainer} ${classes.marginLeft}`}>
					<Toolbar />
					<Switch>
						<Routes />
					</Switch>
				</Container>
			</Router>
		</div>
	);
};

export default App;
