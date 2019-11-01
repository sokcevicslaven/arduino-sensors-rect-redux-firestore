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
	signin = async (initials, email, password) => {
		const result = await this.auth.createUserWithEmailAndPassword(email, password);
		return result.user.updateProfile({ displayName: initials });
	};

	/**
	 * Logout user
	 * * Return currently logged user object
	 */
	getCurrentUser = () => this.auth.currentUser;
}

export default new Firebase();
