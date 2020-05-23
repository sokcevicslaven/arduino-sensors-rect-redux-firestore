/**
 * Login page
 */

// React / Redux
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebaseLoginAction } from '../../store/actions';

// Material UI
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Components
import ButtonProgress from '../../components/ButtonProgress';
import PasswordField from '../../components/PasswordField';

// Hooks
import { useRedirect } from '../../hooks';

// Error helpers
import { useErrorSelector, formatErrors } from './helper';

// Custom styles
import useStyles from './style.js';

const Login = () => {
	// console.log('Login -> page');

	// If loggedin, redirect to home page
	useRedirect();

	const classes = useStyles();
	const dispatch = useDispatch();

	// Custom error selector and memoized errors fnc
	const error = useErrorSelector();
	const errors = useMemo(() => formatErrors(error), [error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Get form reference
		const { email, password } = e.target;
		// Dispatch login action
		dispatch(firebaseLoginAction(email.value, password.value));
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
						error={!!errors.email}
						helperText={errors.email}
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
						error={!!errors.password}
						helperText={errors.password}
					/>

					{/* error message */}
					{errors.other && (
						<Typography variant='h6' align='center' color='secondary'>
							{errors.other}
						</Typography>
					)}

					{/* Submit button with progress */}
					<ButtonProgress>Log In</ButtonProgress>

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
