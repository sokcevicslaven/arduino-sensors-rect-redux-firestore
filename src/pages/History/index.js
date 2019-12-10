// History page

import React, { useState, useEffect, useRef } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';
import Fade from '@material-ui/core/Fade';

// Components
import DataView from '../../components/DataView';

// Firebase
import firebase from '../../firebase/firebase';

// Hooks
import { useRedirect } from '../../hooks';

// Animation timeout
const timeout = 1000;

const History = () => {
	const dataAddListener = useRef();
	const [data, setData] = useState({});

	const { arduino, temperature, humidity, co2, date } = data;

	// Redirect to loggin
	const login = useRedirect();

	useEffect(() => {
		if (login) {
			dataAddListener.current = firebase.fire
				.collection('sensors')
				.orderBy('date', 'desc')
				.limit(10)
				.onSnapshot(
					snapshot => {
						snapshot.docChanges().forEach(change => {
							if (change.type === 'added') {
								const rec = change.doc.data();
								setData({
									arduino: rec.arduino,
									temperature: rec.temperature,
									humidity: rec.humidity,
									co2: rec.co2,
									date: rec.date
								});
							}
						});
					}
					// error => console.log('TCL: Dashboard -> childAddedListener -> error:', error)
				);
		}

		return () => {
			if (dataAddListener.current) dataAddListener.current();
		};
		// eslint-disable-next-line
	}, [login]);

	return (
		<>
			{date && (
				<Fade in={true} timeout={timeout} style={{ transitionDelay: '500ms' }}>
					<Grid item>
						<DataView
							size={300}
							elevation={12}
							title={'Temperature'}
							symbol={176}
							data={{ x: date.seconds * 1000, y: temperature }}
							priColor={orange[600]}
							maxItems={10}
							valueError={30}
							chartBand={{
								color: green[200],
								from: 18,
								to: 35
							}}
						/>
					</Grid>
				</Fade>
			)}
		</>
	);
};

export default History;
