// Login page

// React
import React, { useEffect, useMemo } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, clearErrorsAction } from '../../redux/actions';

// Components
import ButtonProgress from '../../components/ButtonProgress';
import PasswordField from '../../components/PasswordField';

// Material UI
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Custom styles
import useStyles from './style.js';

// Get control that caused error
const getErrorControl = code => {
	let email, password, other;
	if (code)
		if (/email/.test(code) || /user/.test(code)) email = true;
		else if (/password/.test(code)) password = true;
		else other = true;
	return [email, password, other];
};

const Login = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const login = useSelector(state => state.user.login);
	const loading = useSelector(state => state.ui.loading);
	const error = useSelector(state => state.ui.error);
	const [emailError, passwordError, otherError] = useMemo(() => getErrorControl(error.code), [
		error.code
	]);

	useEffect(() => {
		dispatch(clearErrorsAction());
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// if (login) history.push('/');
		if (login) history.goBack();
		// eslint-disable-next-line
	}, [login]);

	// const handleChange = (id, value) => {
	// 	setState(state => ({ ...state, [id]: value }));
	// };

	const handleSubmit = e => {
		e.preventDefault();

		// Get form reference
		const form = e.target;

		// Dispatch login action
		dispatch(loginAction(form.email.value, form.password.value));
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>

				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					{/* email */}
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						//value={state.email}
						//{/* onChange={e => handleChange(e.target.id, e.target.value)} */}
						error={emailError}
						helperText={emailError && error.message}
					/>

					<PasswordField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						// type='password'
						id='password'
						autoComplete='current-password'
						//value={state.password}
						//{/* onChange={e => handleChange(e.target.id, e.target.value)} */}
						error={passwordError}
						helperText={passwordError && error.message}
					/>

					{/* error message */}
					<Typography variant='h6' align='center' color='secondary'>
						{otherError && error.message}
					</Typography>

					{/* Submit button with progress */}
					<ButtonProgress loading={loading}>Log In</ButtonProgress>

					{/* Info text */}
					<div className={classes.info}>
						<Link component={RouterLink} to='/signup' variant='body2'>
							Don't have an account? Sign Up
						</Link>
					</div>
				</form>
			</div>
		</Container>
	);
};

export default Login;
