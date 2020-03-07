// Setings reducer

import { SET_LED, SET_FAN, SET_INTERVAL } from './types.js';

const initialState = {
	led: false,
	fan: false,
	sensors: {
		temperature: {
			interval: 60,
			min: 20,
			max: 40
		},
		humidity: {
			interval: 50,
			min: 20,
			max: 40
		},
		co2: {
			interval: 40,
			min: 20,
			max: 40
		}
	}
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LED:
			// console.log('alert -> action.payload', action.payload);
			return { ...state, led: action.payload };

		case SET_FAN:
			return { ...state, fan: action.payload };

		case SET_INTERVAL:
			const name = action.payload.name;
			const value = Number(action.payload.value);

			if (value)
				return {
					...state,
					sensors: {
						...state.sensors,
						[name]: {
							...state.sensors[name],
							interval: value
						}
					}
				};
			else return state;

		default:
			return state;
	}
};

export { initialState, settingsReducer };
