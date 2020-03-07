// Navigation topbar

import React, { useState, useReducer } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { darkThemeAction, devMenuAction } from '../../redux/actions';

// Local reducer
import { initialState, settingsReducer } from './reducer';
import { SET_LED, SET_FAN, SET_INTERVAL } from './types.js';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

// Material UI icons
import ToysIcon from '@material-ui/icons/Toys';
import BuildIcon from '@material-ui/icons/Build';
import UpdateIcon from '@material-ui/icons/Update';
import OpacityIcon from '@material-ui/icons/Opacity';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

// Hooks
import { useRedirect } from '../../hooks';

// Styles
const useStyles = makeStyles(theme => ({
	root: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));

const Settings = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const settings = useSelector(state => state.ui.settings);

	// Redirect to loggin
	const login = useRedirect();

	// Led state
	// const [ledState, setLedState] = useState(false);

	// Reducer
	const [state, dispatchSettings] = useReducer(settingsReducer, initialState);

	// States
	const [interval, setInterval] = useState({
		allSensors: 60,
		temperature: 60,
		humidity: 60,
		co2: 60
	});

	// On change event handler
	const handleIntervalChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		// const number = value ? Number(value) : '';
		// (number || number === '') && setInterval({ ...interval, [name]: number });
		dispatchSettings({ type: SET_INTERVAL, payload: { name: name, value: value } });
	};

	// On blur event handler
	const handleBlur = e => {
		// const name = e.target.name;
		// const value = e.target.value;
		// value === '' && setInterval({ ...interval, [name]: 0 });
	};

	if (login)
		return (
			<Paper elevation={12} className={classes.root}>
				<List subheader={<ListSubheader>Settings</ListSubheader>}>
					{/* Datk tehem switch */}
					<ListItem>
						<ListItemIcon>
							{(settings.darkTheme && <Brightness4Icon />) || <Brightness7Icon />}
						</ListItemIcon>
						<ListItemText primary='Dark theme' />
						<ListItemSecondaryAction>
							<Switch
								edge='end'
								onChange={() => dispatch(darkThemeAction(!settings.darkTheme))}
								checked={settings.darkTheme}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Dev menu switch */}
					<ListItem>
						<ListItemIcon>
							<BuildIcon />
						</ListItemIcon>
						<ListItemText primary='Developer menu' />
						<ListItemSecondaryAction>
							<Switch
								edge='end'
								onChange={() => dispatch(devMenuAction(!settings.devMenu))}
								checked={settings.devMenu}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>

				<Divider />

				{/* Hardware constrols */}
				<List subheader={<ListSubheader>Control</ListSubheader>}>
					{/* Update interval */}
					<ListItem>
						<ListItemIcon>
							<UpdateIcon />
						</ListItemIcon>
						<ListItemText primary='Update' />
						<ListItemSecondaryAction>
							<TextField
								name='readInterval'
								style={{ maxWidth: 50 }}
								//value={state.sensors.temperature.interval}
								//onChange={handleIntervalChange}
								//onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Led switch */}
					<ListItem>
						<ListItemIcon>
							<WbIncandescentIcon />
						</ListItemIcon>
						<ListItemText primary='Led switch' />
						<ListItemSecondaryAction>
							<Switch
								edge='end'
								onChange={e => dispatchSettings({ type: SET_LED, payload: e.target.checked })}
								// checked={settings.devMenu}
								checked={state.led}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Fan switch */}
					<ListItem>
						<ListItemIcon>
							<ToysIcon />
						</ListItemIcon>
						<ListItemText primary='Fan switch' />
						<ListItemSecondaryAction>
							<Switch
								edge='end'
								onChange={e => dispatchSettings({ type: SET_FAN, payload: e.target.checked })}
								checked={state.fan}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>

				<Divider />

				{/* Sensor controls */}
				<List subheader={<ListSubheader>Sensors</ListSubheader>}>
					{/* Temperature settings */}
					<ListItem>
						<ListItemIcon>
							<WbSunnyIcon />
						</ListItemIcon>
						<ListItemText primary='Temperature' />
					</ListItem>

					{/* Upper limit */}
					<ListItem style={{ paddingLeft: 50 }}>
						<ListItemIcon>
							<VerticalAlignTopIcon />
						</ListItemIcon>
						<ListItemText primary='Upper limit' />
						<ListItemSecondaryAction>
							<TextField
								name='temperature'
								style={{ maxWidth: 50 }}
								value={state.sensors.temperature.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Lower limit */}
					<ListItem style={{ paddingLeft: 50 }}>
						<ListItemIcon>
							<VerticalAlignBottomIcon />
						</ListItemIcon>
						<ListItemText primary='Lower limit' />
						<ListItemSecondaryAction>
							<TextField
								name='temperature'
								style={{ maxWidth: 50 }}
								value={state.sensors.temperature.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Humidity settings */}
					<ListItem>
						<ListItemIcon>
							<OpacityIcon />
						</ListItemIcon>
						<ListItemText primary='Humidity' />
					</ListItem>

					{/* Upper limit */}
					<ListItem style={{ paddingLeft: 50 }}>
						<ListItemIcon>
							<VerticalAlignTopIcon />
						</ListItemIcon>
						<ListItemText primary='Upper limit' />
						<ListItemSecondaryAction>
							<TextField
								name='temperature'
								style={{ maxWidth: 50 }}
								value={state.sensors.temperature.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Lower limit */}
					<ListItem style={{ paddingLeft: 50 }}>
						<ListItemIcon>
							<VerticalAlignBottomIcon />
						</ListItemIcon>
						<ListItemText primary='Lower limit' />
						<ListItemSecondaryAction>
							<TextField
								name='temperature'
								style={{ maxWidth: 50 }}
								value={state.sensors.temperature.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Humidity settings */}
					<ListItem>
						<ListItemIcon>
							<ScatterPlotIcon />
						</ListItemIcon>
						<ListItemText primary='CO2' />
					</ListItem>

					{/* Upper limit */}
					<ListItem style={{ paddingLeft: 50 }}>
						<ListItemIcon>
							<VerticalAlignTopIcon />
						</ListItemIcon>
						<ListItemText primary='Upper limit' />
						<ListItemSecondaryAction>
							<TextField
								name='temperature'
								style={{ maxWidth: 50 }}
								value={state.sensors.temperature.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					{/* Lower limit */}
					<ListItem style={{ paddingLeft: 50 }}>
						<ListItemIcon>
							<VerticalAlignBottomIcon />
						</ListItemIcon>
						<ListItemText primary='Lower limit' />
						<ListItemSecondaryAction>
							<TextField
								name='temperature'
								style={{ maxWidth: 50 }}
								value={state.sensors.temperature.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					<Divider />

					{/* Humidity settings */}
					<ListItem>
						<ListItemIcon>
							<OpacityIcon />
						</ListItemIcon>
						<ListItemText primary='Humidity' />
						<ListItemSecondaryAction>
							<TextField
								//disabled
								name='humidity'
								style={{ maxWidth: 50 }}
								value={state.sensors.humidity.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<ScatterPlotIcon />
						</ListItemIcon>
						<ListItemText primary='CO2' />
						<ListItemSecondaryAction>
							<TextField
								//disabled
								name='co2'
								style={{ maxWidth: 50 }}
								value={state.sensors.co2.interval}
								onChange={handleIntervalChange}
								onBlur={handleBlur}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Paper>
		);
	else return null;
};

export default Settings;
