// Developer page (debug only)

import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
	loginAction,
	logoutAction,
	setErrorAction,
	darkThemeAction,
	devMenuAction
} from '../../redux/actions';

// Firebase
import firebase from '../../firebase/firebase';

// Material UI
import Button from '@material-ui/core/Button';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import purple from '@material-ui/core/colors/purple';
// import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import Fade from '@material-ui/core/Fade';

// Components
import DataView from '../../components/DataView';

// Utility
import { logObj, formatTime } from '../../lib';

// Custom styles
import useStyles from './style';

const createUser = async () => {
	try {
		await firebase.signin('IB', 'ivan1.brajkovic@icloud.com', '123456789');
		getCurrenUserHandler();
	} catch (err) {
		console.log('logoutHandler -> err', err);
	}
};

const getCurrenUserHandler = () => {
	const user = firebase.getCurrentUser();
	console.log(
		'Currently logged user:',
		user ? (user.displayName ? user.displayName : user.email) : 'none'
	);
};

const addData = async dispatch => {
	try {
		await firebase.addData('sensors', null);
	} catch (err) {
		logObj(err);
		dispatch(setErrorAction(err));
	}
};

const timeout = 1000;

const Dev = () => {
	const classes = useStyles();
	const [progress, setProgress] = useState([0]);
	const dispatch = useDispatch();
	const settings = useSelector(state => state.ui.settings);
	// const darkTheme = useSelector(state => state.ui.darkTheme);
	// const minWidthSM = useMediaQuery('(min-width:600px)');

	useEffect(() => {
		const labels = document.querySelectorAll(
			'.chart-container .axis, .chart-container .chart-label'
		);
		labels &&
			labels.forEach(label => {
				if (settings.darkTheme) label.classList.add('fill-white');
				else label.classList.remove('fill-white');
			});

		// return () => {
		// 	labels = null;
		// };
	}, [settings.darkTheme]);

	return (
		<div>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(loginAction('ivan.brajkovic@icloud.com', '123456789'))}
			>
				Login
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(logoutAction())}
			>
				Logout
			</Button>
			<Button variant='contained' className={classes.button} onClick={getCurrenUserHandler}>
				Get user
			</Button>
			<Button variant='contained' className={classes.button} onClick={createUser}>
				New user
			</Button>
			<Button variant='contained' className={classes.button} onClick={() => addData(dispatch)}>
				Add data
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(darkThemeAction(!settings.darkTheme))}
			>
				Dark teme
			</Button>
			<Button variant='contained' className={classes.button} onClick={() => {}}>
				Update chart
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => setProgress(state => [state[0] + 10])}
			>
				Progress +
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => setProgress(state => [state[0] - 10])}
			>
				Progress -
			</Button>
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(devMenuAction(!settings.devMenu))}
			>
				Dev menu
			</Button>

			<br />
			<br />

			{/* <Fade in={true} timeout={timeout}> */}
			<div>
				<DataView
					size={250}
					elevation={12}
					title={'Temperature'}
					values={progress}
					//{/* labels={formatTime([{ seconds: new Date().getTime() / 1000 }])} */}
					labels={'test'}
					valueError={50}
					maxItems={10}
					colors={[cyan[600]]}
				/>
			</div>
			{/* </Fade> */}

			{/* <Fade in={true} timeout={timeout} style={{ transitionDelay: '250ms' }}>
				<div>
					<DataView
						size={250}
						elevation={12}
						title={'Temperature'}
						values={[progress]}
						labels={formatTime([{ seconds: new Date().getTime() / 1000 }])}
						valueError={50}
						maxItems={10}
						colors={[cyan[600]]}
					/>
				</div>
			</Fade> */}

			{/* <DataView
				size={250}
				elevation={12}
				title={'Humidity'}
				label={formatTime()}
				value={progress}
				valueError={50}
				maxItems={10}
				colors={[blue[400]]}
			/>

			<DataView
				size={250}
				elevation={12}
				title={'CO2'}
				label={formatTime()}
				value={progress}
				valueError={50}
				maxItems={10}
				colors={[purple[400]]}
			/> */}
		</div>
	);
};

export default Dev;
