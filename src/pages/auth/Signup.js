// Sign up page

// React
import React, { useState, useEffect as useLayoutEffect, useMemo } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signupAction, clearErrorsAction } from '../../redux/actions';

// Components
import ButtonProgress from '../../components/ButtonProgress';

// Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Custom styles
import useStyles from './style.js';

// Utility
import { isEmptyObj } from '../../lib';

// Get control that caused error
const getErrorControl = code => {
	console.log('TCL: getErrorControl');
	let username, email, password, other;
	if (code)
		if (/username/.test(code)) username = true;
		else if (/email/.test(code)) email = true;
		else if (/password/.test(code)) password = true;
		else other = true;
	return [username, email, password, other];
};

const Signup = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const error = useSelector(state => state.ui.error);
	const loading = useSelector(state => state.ui.loading);
	const widthMaxXS = useMediaQuery('(max-width:599.99px)');
	const [fromErrors, setFormErrors] = useState({});
	const [usernameError, emailError, passwordError, otherError] = useMemo(
		() => getErrorControl(error.code),
		[error.code]
	);

	useLayoutEffect(() => {
		dispatch(clearErrorsAction());
		// eslint-disable-next-line
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		// Form input fields
		const form = e.target;
		const firstName = form.firstName.value;
		const lastName = form.lastName.value;
		const username = form.username.value;
		const email = form.email.value;
		const password = form.password.value;
		const confirmPassword = form.confirmPassword.value;

		// Error messages
		const required = 'Field is required';
		const mismatch = 'Password mismatch';

		// Check if all field are provided
		const errors = {};
		!firstName && (errors.firstName = required);
		!lastName && (errors.lastName = required);
		!username && (errors.username = required);
		!email && (errors.email = required);
		!password && (errors.password = required);
		!confirmPassword && (errors.confirmPassword = required);
		if (password !== confirmPassword) {
			errors.password = mismatch;
			errors.confirmPassword = mismatch;
		}

		// Check if there are errors
		if (!isEmptyObj(errors)) return setFormErrors(errors);
		else setFormErrors({});

		// If all field are provided, procceed with signup
		dispatch(
			signupAction(
				{
					firstName,
					lastName,
					username,
					email,
					password
				},
				history
			)
		);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>

				{/* sign up form */}
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<Grid container spacing={widthMaxXS ? 0 : 2}>
						{/* first name */}
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='firstName'
								label='First Name'
								id='firstName'
								autoComplete='fname'
								autoFocus
								error={!!fromErrors.firstName}
								helperText={fromErrors.firstName}
							/>
						</Grid>

						{/* last name */}
						<Grid item xs={12} sm={6}>
							<TextField
								margin='normal'
								variant='outlined'
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								error={!!fromErrors.lastName}
								helperText={fromErrors.lastName}
							/>
						</Grid>
					</Grid>

					{/* username */}
					<TextField
						margin='normal'
						variant='outlined'
						required
						fullWidth
						id='username'
						name='username'
						label='Username'
						autoComplete='username'
						error={!!fromErrors.username || usernameError}
						helperText={fromErrors.username || (usernameError && error.message)}
					/>

					{/* email address */}
					<TextField
						margin='normal'
						variant='outlined'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						error={!!fromErrors.email || emailError}
						helperText={fromErrors.email || (emailError && error.message)}
					/>

					{/* password */}
					<TextField
						margin='normal'
						variant='outlined'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						error={!!fromErrors.password || passwordError}
						helperText={fromErrors.password || (passwordError && error.message)}
					/>

					{/* confirm password */}
					<TextField
						margin='normal'
						variant='outlined'
						required
						fullWidth
						name='confirmPassword'
						label='Confirm Password'
						type='password'
						id='confirmPassword'
						error={!!fromErrors.confirmPassword}
						helperText={fromErrors.confirmPassword}
					/>

					{/* error message */}
					<Typography variant='h6' align='center' color='secondary'>
						{otherError && error.message}
					</Typography>

					{/* Submit button with progress */}
					<ButtonProgress loading={loading}>Sign up</ButtonProgress>

					{/* Info text */}
					<div className={classes.info}>
						<Link component={RouterLink} to='/login' variant='body2'>
							Already have an account? Log in
						</Link>
					</div>
				</form>
			</div>
		</Container>
	);
};

export default Signup;
