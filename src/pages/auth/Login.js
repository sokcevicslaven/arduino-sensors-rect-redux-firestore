// Login page

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { loginAction } from '../../redux/actions/userActions';
import ButtonProgress from '../../components/ButtonProgress';

// Material UI
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Custom styles
import useStyles from './style.js';

const Login = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const login = useSelector(state => state.user.login);
	const loading = useSelector(state => state.ui.loading);
	const errors = useSelector(state => state.ui.errors);
	const [state, setState] = useState({ email: '', password: '' });

	useEffect(() => {
		if (login) history.push('/dashboard');
		// eslint-disable-next-line
	}, []);

	const handleChange = (id, value) => {
		setState(state => ({ ...state, [id]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();

		// Dispatch login action
		dispatch(loginAction(state, history));
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
						onChange={e => handleChange(e.target.id, e.target.value)}
						error={errors.email ? true : false}
						helperText={errors.email}
					/>

					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						value={state.password}
						onChange={e => handleChange(e.target.id, e.target.value)}
						error={errors.password ? true : false}
						helperText={errors.password}
					/>

					{/* error message */}
					<Typography variant='h6' align='center' color='secondary'>
						{errors.error}
					</Typography>

					{/* Submit button with progress */}
					<ButtonProgress loading={loading}>Log In</ButtonProgress>

					{/* Info text */}
					<div item className={classes.info}>
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
