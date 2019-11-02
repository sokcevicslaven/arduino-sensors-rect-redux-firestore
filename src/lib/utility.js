// Log object to console
export const logObj = object => console.log('TCL: object', JSON.stringify(object, null, 2));

// Check if object is empty
export const isEmptyObj = object => !Object.keys(object).length;
