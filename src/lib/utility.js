// Log object to console
export const logObj = object => console.log('TCL: object', JSON.stringify(object, null, 2));

// Check if object is empty
export const isEmptyObj = object => !Object.keys(object).length;

// Format local datetime
export const formatDatetime = date => {
	const d = date || new Date();
	return d.toLocaleTimeString('hr-HR', {
		year: 'numeric',
		// month: 'short',
		month: '2-digit',
		day: '2-digit',
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	});
};

// Format local time
export const formatTime = seconds => {
	const date = (seconds && new Date(seconds * 1000)) || new Date();
	return date.toLocaleTimeString('hr-HR', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	});
};

// Random number from 0 to N
export const randomNum = N => Math.floor(Math.random() * N);
