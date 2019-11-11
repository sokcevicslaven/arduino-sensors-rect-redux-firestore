// User interface actions

import { CLEAR_ERROR, SET_ERROR, SET_DARK_THEME, SET_DEV_MENU } from '../types';

export const clearErrorsAction = () => dispatch => dispatch({ type: CLEAR_ERROR });

export const setErrorAction = error => dispatch => dispatch({ type: SET_ERROR, payload: error });

export const darkThemeAction = value => dispatch =>
	dispatch({ type: SET_DARK_THEME, payload: value });

export const devMenuAction = value => dispatch => dispatch({ type: SET_DEV_MENU, payload: value });
