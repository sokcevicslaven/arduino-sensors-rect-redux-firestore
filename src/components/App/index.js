import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// MUI
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
// Compponents
import Topbar from '../Topbar';
import Routes from '../Routes';
// Styles
import useStyles from './style.js';

function App() {
	const classes = useStyles();

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
}

export default App;
