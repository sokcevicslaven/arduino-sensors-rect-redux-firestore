// Custom theme

import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Material UI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const Theme = ({ dark, children }) => {
	const darkTheme = useSelector(state => state.ui.darkTheme);

	const theme = createMuiTheme({
		// palette: {
		// 	primary: {
		// 		light: '#33c9dc',
		// 		main: '#00bcd4',
		// 		dark: '#008394',
		// 		contrastText: '#fff'
		// 	},
		// 	secondary: {
		// 		light: '#ff6333',
		// 		main: '#ff3d00',
		// 		dark: '#b22a00',
		// 		contrastText: '#fff'
		// 	}
		// },
		palette: {
			type: `${darkTheme ? 'dark' : 'light'}`
			// type: 'dark'
		},
		overrides: {
			MuiButton: {
				text: {
					color: 'inherit'
				}
			}
		}
	});

	// theme.palette.type = `${false ? 'dark' : 'light'}`;
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
