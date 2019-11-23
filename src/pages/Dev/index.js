// Developer page (debug only)

import React, { useState, useRef } from 'react';

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
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

// Components
import DataView from '../../components/DataView';

// Utility
import { logObj } from '../../lib';

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

const Dev = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const settings = useSelector(state => state.ui.settings);
	// const [chart, setChart] = useState([{ y: 0, x: new Date().getTime() }]);

	// Debug add dummy data on interval
	const intervalRef = useRef();
	const [started, setStarted] = useState(false);
	const [state, setState] = useState({ x: new Date().getTime(), y: 0 });
	const startInterval = _ => {
		if (started) {
			clearInterval(intervalRef.current);
			setStarted(false);
		} else {
			intervalRef.current = setInterval(() => {
				const x = new Date().getTime();
				const y = Math.floor(Math.random() * 50) + 1;
				setState({ x: x, y: y });
			}, 2000);
			setStarted(true);
		}
	};

	// const addItem = item => {
	//   setChart([item]);
	// };

	// useEffect(() => {
	//   const labels = document.querySelectorAll(
	//     ".chart-container .axis, .chart-container .chart-label"
	//   );
	//   labels &&
	//     labels.forEach(label => {
	//       if (settings.darkTheme) label.classList.add("fill-white");
	//       else label.classList.remove("fill-white");
	//     });
	// }, [settings.darkTheme]);

	const tempBand = {
		color: green[200],
		from: 10,
		to: 35
	};

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
			<Button
				variant='contained'
				className={classes.button}
				onClick={() => dispatch(devMenuAction(!settings.devMenu))}
			>
				Dev menu
			</Button>
			<Button variant='contained' className={classes.button} onClick={startInterval}>
				{started ? 'Stop' : 'Start'}
			</Button>

			<br />
			<br />

			<div>
				<DataView
					size={300}
					elevation={12}
					title={'Temperature'}
					symbol={176}
					data={state}
					maxItems={10}
					valueError={30}
					priColor={orange[400]}
					secColor={null}
					chartBand={tempBand}
					showChartTitle={false}
				/>
			</div>
		</div>
	);
};

export default Dev;