import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyD6SSPtNNk4G8DiqJkJamG7Uak7DGtgTrA",
	authDomain: "cargone-couriers.firebaseapp.com",
	databaseURL: "https://cargone-couriers.firebaseio.com",
	projectId: "cargone-couriers",
	storageBucket: "cargone-couriers.appspot.com",
	messagingSenderId: "499533323015"
};

firebase.initializeApp(config);

return firebase;