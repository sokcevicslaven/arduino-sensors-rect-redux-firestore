// Redirect if not logged in

// React
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const useRedirect = () => {
	const history = useHistory();
	const login = useSelector(state => state.user.login);

	useEffect(() => {
		if (!login) history.push('/login');
		// eslint-disable-next-line
	}, [login]);

	return login;
};

export default useRedirect;
