// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
	const history = useHistory();
	const login = useSelector(state => state.user.login);
	const loading = useSelector(state => state.user.loading);

	useEffect(() => {
		if (!login) history.push('/login');
		// eslint-disable-next-line
	}, [login]);

	return <div>{login && <h2>Dashboard page</h2>}</div>;
};

export default Dashboard;
