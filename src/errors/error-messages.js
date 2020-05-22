/**
 * Error messages
 */

export default {
	AUTH_INVALID_EMAIL: {
		code: 'auth_invalid_email',
		message: 'Invalid email',
		details: [{ msg: 'Invalid email', param: 'email' }],
	},

	AUTH_USER_DISABLED: {
		code: 'auth_user_disabled',
		message: 'User disabled',
		details: [{ msg: 'User disabled', param: 'email' }],
	},

	AUTH_USER_NOT_FOUND: {
		code: 'auth_user_not_found',
		message: 'User not found',
		details: [{ msg: 'User not found', param: 'email' }],
	},

	AUTH_WRONG_PASSWORD: {
		code: 'auth_wrong_password',
		message: 'Wrong password',
		details: [{ msg: 'Wrong password', param: 'password' }],
	},

	AUTH_CUSTOM_TOKEN_MISMATCH: {
		code: 'auth_custom_token_mismatch',
		message: 'Token mistmatch',
		// details: [{ msg: 'Wrong password', param: 'password' }],
	},

	AUTH_INVALID_CUSTOM_TOKEN: {
		code: 'auth_invalid_custom_token',
		message: 'Invalid token',
		// details: [{ msg: 'Invalid token', param: 'token' }],
	},

	UNEXPECTED: {
		code: 'unexpected',
		message: 'unexpected',
		details: [],
	},
};
