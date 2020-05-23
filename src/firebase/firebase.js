// Firebase App (the core Firebase SDK) is always required and
import * as app from 'firebase/app';
// Firebase services
import 'firebase/auth';
import 'firebase/firestore';
// import 'firebase/database';

// Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDRNscvyAJWG8BtnpCBw3tCpYEWem2jSAw',
	authDomain: 'arduino-sensors-754e5.firebaseapp.com',
	databaseURL: 'https://arduino-sensors-754e5.firebaseio.com',
	projectId: 'arduino-sensors-754e5',
	storageBucket: 'arduino-sensors-754e5.appspot.com',
	messagingSenderId: '940139731983',
	appId: '1:940139731983:web:3f15975a429e3d9ad7577a',
};

class Firebase {
	constructor() {
		// console.log('TCL: Firebase -> constructor');

		// Initialize Firebase
		app.initializeApp(firebaseConfig);
		// The Firebase Auth service interface
		this.auth = app.auth();
		// The Firebase Firestore service interface
		this.fire = app.firestore();
		// Timestamp class
		this.timestamp = app.firestore.Timestamp;
	}

	/**
	 * Login user
	 * * Return promise
	 * @param {string} email The registration email
	 * @param {string} password The registration password
	 */
	login = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	/**
	 * Login user with custom token
	 * * Return promise
	 * @param {string} token Custom token
	 */
	loginWithCustomToken = (token) => this.auth.signInWithCustomToken(token);

	/**
	 * Logout user
	 * * Return promise
	 */
	logout = () => this.auth.signOut();

	/**
	 * Sign user, create new user
	 * * Return promise (void)
	 * @param {string} initials User display name
	 * @param {string} email The registration email
	 * @param {string} password The registration password
	 */
	signup = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

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

	/**
	 * Add a new document to this collection with the specified data
	 * * Return Promise<DocumentReference>
	 * @param collection Collections
	 * @param data Data
	 */
	addData = (collection, data) => this.fire.collection(collection).add(data);

	/**
	 * Add a new document to this collection with the specified data
	 * * Return Promise<void>
	 * @param collection Document collections
	 * @param document Document to add/set data
	 * @param data Data
	 */
	addDocumentData = (collection, document, data) =>
		this.fire.collection(collection).doc(document).set(data);

	/**
	 * Update document to this collection with the specified data
	 * @param collection Document collections
	 * @param document Document to retreive
	 * @param data Data
	 * @returns Promise void or error
	 */
	updateDocumentData = (collection, document, data) =>
		this.fire.collection(collection).doc(document).update(data);

	/**
	 * Reads the document
	 * * Return Promise<DocumentSnapshot>
	 * @param collection Document collections
	 * @param document Document to retreive
	 */
	getDocumentData = (collection, document) =>
		new Promise((resolve, reject) => {
			this.fire
				.collection(collection)
				.doc(document)
				.get()
				.then((doc) => {
					if (!doc.exists) resolve(null);
					else resolve(doc.data());
				})
				.catch((error) => reject(error));
		});

	/**
	 * Reads all arduinos settings
	 * @returns Promise with arduino settings or error
	 */
	getArduinoSettings = () =>
		new Promise((resolve, reject) => {
			this.fire
				.collection('settings')
				.get()
				.then((querySnapshot) => {
					const data = [];
					querySnapshot.forEach((doc) =>
						data.push({
							arduino: doc.id,
							settings: doc.data(),
						})
					);
					resolve(data);
				})
				.catch((error) => reject(error));
		});

	// /**
	//  * Reads the username document
	//  * * Return Promise<DocumentSnapshot>
	//  */
	// getByUsername = (username) => this.fire.collection('users').doc(username).get();

	/**
	 * Get all arduino data between dates
	 * @param {object} Dates From date and to date
	 * @returns Arrys of data arrays
	 */
	getHistoryChart = (date) =>
		new Promise((resolve, reject) => {
			const dateFrom = new Date(date.from);
			const dateTo = new Date(date.to);
			dateTo.setDate(dateTo.getDate() + 1);

			// Check for valid range
			if (dateFrom > new Date() || dateTo < dateFrom) resolve(null);

			const temperature = [];
			const humidity = [];
			const co2 = [];

			this.fire
				.collection('sensors')
				.where('date', '>', dateFrom)
				.where('date', '<', dateTo)
				.orderBy('date', 'asc')
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						const data = doc.data();
						const date = data.date.seconds * 1000;
						temperature.push([date, +data.temperature]);
						humidity.push([date, +data.humidity]);
						co2.push([date, +data.co2]);
					});

					// Call callback fnc
					resolve([temperature, humidity, co2]);
				})
				.catch((error) => reject(error));
		});
}

export default new Firebase();
