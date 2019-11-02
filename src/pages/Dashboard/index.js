// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
	const history = useHistory();
	const login = useSelector(state => state.user.login);

	useEffect(() => {
		if (!login) history.push('/login');
		// eslint-disable-next-line
	}, [login]);

	return (
		<div>
			<h2>Dashboard page</h2>
		</div>
	);
};

export default Dashboard;
