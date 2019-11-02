// Firebase App (the core Firebase SDK) is always required and
import * as app from 'firebase/app';
// Firebase services
import 'firebase/auth';
import 'firebase/firestore';

// Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDRNscvyAJWG8BtnpCBw3tCpYEWem2jSAw',
	authDomain: 'arduino-sensors-754e5.firebaseapp.com',
	databaseURL: 'https://arduino-sensors-754e5.firebaseio.com',
	projectId: 'arduino-sensors-754e5',
	storageBucket: 'arduino-sensors-754e5.appspot.com',
	messagingSenderId: '940139731983',
	appId: '1:940139731983:web:3f15975a429e3d9ad7577a'
};

class Firebase {
	constructor() {
		console.log('TCL: Firebase -> constructor -> constructor');
		// Initialize Firebase
		app.initializeApp(firebaseConfig);
		// The Firebase Auth service interface
		this.auth = app.auth();
		// The Firebase Firestore service interface
		this.db = app.firestore();
	}

	/**
	 * Login user
	 * * Return promise
	 * @param email The registration email
	 * @param password The registration password
	 */
	login = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	/**
	 * Logout user
	 * * Return promise
	 */
	logout = () => this.auth.signOut();

	/**
	 * Sign user, create new user
	 * * Return promise (void)
	 * @param initials User display name
	 * @param email The registration email
	 * @param password The registration password
	 */
	signup = (displayName, email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);
	//.then(result => result.user.updateProfile({ displayName: displayName }));
	// 	return result.user.updateProfile({ displayName: displayName });
	// } catch (err) {
	// 	throw err;
	// }

	/**
	 * Get current user
	 * * Return currently logged user object
	 */
	getCurrentUser = () => this.auth.currentUser;

	// Add data
	addData = (collection, data) => {
		// Add a new document in collection "cities"
		return this.db.collection(collection).add({
			arduino: 3,
			co2: 9,
			date: new Date(),
			humidity: 33,
			temperature: 39
		});
		// .then(function() {
		// 	console.log('Document successfully written!');
		// })
		// .catch(function(error) {
		// 	console.error('Error writing document: ', error);
		// });
	};
}

export default new Firebase();
