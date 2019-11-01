// Sign up page

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { signupAction } from '../../redux/actions/userActions';
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

const Signup = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const loading = useSelector(state => state.ui.loading);
	const errors = useSelector(state => state.ui.errors);
	const [state, setState] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const widthMaxXS = useMediaQuery('(max-width:599.99px)');

	const handleChange = (id, value) => {
		setState(state => ({ ...state, [id]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();

		// Dispatch signup action
		dispatch(signupAction(state, history));
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
								value={state.firstName}
								onChange={e => handleChange(e.target.id, e.target.value)}
								error={errors.firstName ? true : false}
								helperText={errors.firstName}
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
								value={state.lastName}
								onChange={e => handleChange(e.target.id, e.target.value)}
								error={errors.lastName ? true : false}
								helperText={errors.lastName}
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
						value={state.username}
						onChange={e => handleChange(e.target.id, e.target.value)}
						error={errors.username ? true : false}
						helperText={errors.username}
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
						value={state.email}
						onChange={e => handleChange(e.target.id, e.target.value)}
						error={errors.email ? true : false}
						helperText={errors.email}
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
						value={state.password}
						onChange={e => handleChange(e.target.id, e.target.value)}
						error={errors.password ? true : false}
						helperText={errors.password}
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
						value={state.confirmPassword}
						onChange={e => handleChange(e.target.id, e.target.value)}
						error={errors.confirmPassword ? true : false}
						helperText={errors.confirmPassword}
					/>

					{/* error message */}
					<Typography variant='h6' align='center' color='secondary'>
						{errors.error}
					</Typography>

					{/* Submit button with progress */}
					<ButtonProgress loading={loading}>Sign up</ButtonProgress>

					{/* Info text */}
					<div item className={classes.info}>
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
