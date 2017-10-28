import firebase from 'firebase';

import store from '../store';

var config = {
	apiKey: "AIzaSyD6SSPtNNk4G8DiqJkJamG7Uak7DGtgTrA",
	authDomain: "cargone-couriers.firebaseapp.com",
	databaseURL: "https://cargone-couriers.firebaseio.com",
	projectId: "cargone-couriers",
	storageBucket: "cargone-couriers.appspot.com",
	messagingSenderId: "499533323015"
};

firebase.initializeApp(config);

firebase.auth().languageCode = 'en';

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User is signed in.
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var uid = user.uid;
		var phoneNumber = user.phoneNumber;
		var providerData = user.providerData;
		user.getToken().then(function(idToken) {

			store.dispatch({
				type: 'storeFirebaseIdToken',
				idToken 
			})

			console.log('Signed in');
			console.log('account-details', JSON.stringify({
				displayName: displayName,
				email: email,
				emailVerified: emailVerified,
				phoneNumber: phoneNumber,
				photoURL: photoURL,
				uid: uid,
				idToken: idToken,
				providerData: providerData
			}, null, '  '));
		});
	} else {
		// User is signed out.
		console.log('Signed out');
		store.dispatch({
				type: 'deleteFirebaseIdToken'
			})
	}
}, function(error) {
	console.log('ERR', error);
});

export default firebase;