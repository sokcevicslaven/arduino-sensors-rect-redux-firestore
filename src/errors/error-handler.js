/**
 * Error handler
 */

import errorMessages from './error-messages';

const formatError = (props) => ({
	code: props.code || 'unexpected',
	message: props.message || 'unexpected',
	details: props.details || [],
});

const parseError = (error) => {
	switch (error.code) {
		case 'auth/invalid-email':
			return formatError(errorMessages.AUTH_INVALID_EMAIL);
		case 'auth/user-disabled':
			return formatError(errorMessages.AUTH_USER_DISABLED);
		case 'auth/user-not-found':
			return formatError(errorMessages.AUTH_USER_NOT_FOUND);
		case 'auth/wrong-password':
			return formatError(errorMessages.AUTH_WRONG_PASSWORD);
		case 'auth/custom-token-mismatch':
			return formatError(errorMessages.AUTH_CUSTOM_TOKEN_MISMATCH);
		case 'auth/invalid-custom-token':
			return formatError(errorMessages.AUTH_INVALID_CUSTOM_TOKEN);
		default:
			// return formatError(errorMessages.UNEXPECTED);
			return error;
	}
};

export { formatError, parseError };
