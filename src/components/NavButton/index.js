// Custom ListItem button

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemButton = (color, text, Inner, to) => (
	<ListItem button component={Link} to={to}>
		<ListItemIcon>
			<Inner color={color || 'primary'} />
		</ListItemIcon>
		<ListItemText primary={text} />
	</ListItem>
);

const NavButton = ({ color, primary, inner: Inner, ...props }) => (
	<Switch>
		<Route exact path={props.to}>
			{ListItemButton(color, primary, Inner, props.to)}
		</Route>
		<Route path='/'>{ListItemButton('action', primary, Inner, props.to)}</Route>
	</Switch>
);

export default NavButton;
