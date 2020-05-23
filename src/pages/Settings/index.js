// Navigation topbar

import React, { useState, useReducer, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
	setDarkThemeAction,
	setDevMenuAction,
	setShowAllErrors,
	setErrorAction,
} from '../../store/actions';

// Reducer
import { initialState, settingsReducer } from './reducer';

// Material UI
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// Material UI icons
import ToysIcon from '@material-ui/icons/Toys';
import ErrorIcon from '@material-ui/icons/Error';
import BuildIcon from '@material-ui/icons/Build';
import RouterIcon from '@material-ui/icons/Router';
import UpdateIcon from '@material-ui/icons/Update';
import OpacityIcon from '@material-ui/icons/Opacity';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

// Custom component
import SensorListItem from './components/SensorListItem';
import SwitchListItem from './components/SwitchListItem';

// Custom styles
import useStyles from './style';

// Firebase
import firebase from '../../firebase/firebase';

// Update arduino settings into database
const updateArduino = async ({ arduino, settings }, dispatch) => {
	try {
		// Update firebase arduino settings
		await firebase.updateDocumentData('settings', arduino, settings);
	} catch (error) {
		dispatch(setErrorAction(error));
	}
};

// Settings component
const Settings = () => {
	// console.log('Settings -> page');

	// Styles
	const classes = useStyles();

	/************************************************************
	 * Redux - global state
	 ************************************************************/

	const dispatch = useDispatch();
	const settingsUi = useSelector((state) => state.ui.settings);
	const themeHandler = (e) => dispatch(setDarkThemeAction(e.target.checked));
	const devMenuHandler = (e) => dispatch(setDevMenuAction(e.target.checked));
	const showAllErrorsHandler = (e) => dispatch(setShowAllErrors(e.target.checked));

	/************************************************************
	 * Sate, reducer - local state
	 ************************************************************/

	// Selected arduino
	const [selected, setSelected] = useState(0);
	const selectChange = (event) => setSelected(event.target.value);

	// Arduionos reducer
	const [state, dispatchReducer] = useReducer(settingsReducer, initialState);

	// Current selected arduino settings
	const { settings: settingsArduino } = state.arduinos[selected];

	// Control switch change
	const switchChangeHandler = (e) => {
		const { name, checked } = e.target;
		dispatchReducer({
			type: 'SET_CONTROL',
			payload: { selected, name, value: checked },
		});
		updateArduino(state.arduinos[selected], dispatchReducer);
		// updateArduino(state.arduinos[selected].arduino, { [name]: true }, dispatchReducer);
	};

	// Handle save button click
	const handleButtonClick = () => {
		dispatchReducer({ type: 'DISABLE_BUTTON' });
		updateArduino(state.arduinos[selected], dispatchReducer);
	};

	// Get arduions settings from database
	useEffect(() => {
		(async () => {
			try {
				const data = await firebase.getArduinoSettings();
				dispatchReducer({ type: 'SET_STATE', payload: data });
			} catch (error) {
				dispatch(setErrorAction(error));
			}
		})();
		// eslint-disable-next-line
	}, []);

	return (
		<Paper elevation={12} className={classes.root}>
			{/* Settings list*/}
			<List subheader={<ListSubheader>Settings</ListSubheader>}>
				{/* Dark theme switch */}
				<SwitchListItem
					Icon={(settingsUi.darkTheme && Brightness4Icon) || Brightness7Icon}
					primary='Dark theme'
					onChange={themeHandler}
					checked={settingsUi.darkTheme}
				/>

				{/* Dev menu switch */}
				<SwitchListItem
					Icon={BuildIcon}
					primary='Developer menu'
					onChange={devMenuHandler}
					checked={settingsUi.devMenu}
				/>

				{/* Show all errors switch */}
				<SwitchListItem
					Icon={ErrorIcon}
					primary='Show all errors'
					onChange={showAllErrorsHandler}
					checked={settingsUi.showAllErrors}
				/>
			</List>

			<Divider />

			{/* Device list */}
			<List subheader={<ListSubheader>Device</ListSubheader>}>
				<ListItem>
					<ListItemIcon>
						<RouterIcon />
					</ListItemIcon>
					<ListItemText primary='Select device' />
					<ListItemSecondaryAction>
						<Select value={selected} onChange={selectChange}>
							{state.arduinos.map((el, i) => (
								<MenuItem key={i} value={i}>
									Arduino {el.arduino}
								</MenuItem>
							))}
						</Select>
					</ListItemSecondaryAction>
				</ListItem>
			</List>

			<Divider />

			{/* Control list*/}
			<List subheader={<ListSubheader>Control</ListSubheader>}>
				{/* Led switch */}
				<SwitchListItem
					Icon={WbIncandescentIcon}
					name='led'
					primary='Led switch'
					checked={!!settingsArduino.led}
					onChange={(e) => switchChangeHandler(e, dispatchReducer)}
				/>

				{/* Fan switch */}
				<SwitchListItem
					Icon={ToysIcon}
					name='fan'
					primary='Fan switch'
					checked={!!settingsArduino.fan}
					onChange={(e) => switchChangeHandler(e, dispatchReducer)}
				/>
			</List>

			<Divider />

			{/* Sensors list*/}
			<List subheader={<ListSubheader>Sensors</ListSubheader>}>
				{/* Update interval */}
				<SensorListItem
					Icon={UpdateIcon}
					name='updateInterval'
					primary='Update interval'
					selected={selected}
					value={settingsArduino.updateInterval}
					dispatch={dispatchReducer}
				/>

				{/* Temperature sensor settings */}
				<SensorListItem
					nested
					Icon={WbSunnyIcon}
					name='temperature'
					primary='Temperature'
					selected={selected}
					upperLimit={settingsArduino.temperature.max}
					lowerLimit={settingsArduino.temperature.min}
					dispatch={dispatchReducer}
				/>

				{/* Humidity sensor settings */}
				<SensorListItem
					nested
					Icon={OpacityIcon}
					name='humidity'
					primary='Humidity'
					selected={selected}
					upperLimit={settingsArduino.humidity.max}
					lowerLimit={settingsArduino.humidity.min}
					dispatch={dispatchReducer}
				/>

				{/* CO2 sensor settings */}
				<SensorListItem
					nested
					Icon={ScatterPlotIcon}
					name='co2'
					primary='CO2'
					selected={selected}
					upperLimit={settingsArduino.co2.max}
					lowerLimit={settingsArduino.co2.min}
					dispatch={dispatchReducer}
				/>

				{/* Save button */}
				<ListItem className={classes.buttonContainer}>
					<Button
						disabled={state.buttonDisabled}
						variant='contained'
						color='primary'
						onClick={handleButtonClick}
					>
						Save
					</Button>
				</ListItem>
			</List>
		</Paper>
	);
};

export default Settings;
