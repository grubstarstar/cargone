const functions = require('firebase-functions');
var fetch = require('isomorphic-fetch');
var stream = require('stream');
const cors = require('cors')({origin: true});
const moment = require('moment');

// firebase admin stuff
var admin = require("firebase-admin");
var serviceAccount = require("./cargone-couriers-firebase-adminsdk-5i9c4-19905f465d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cargone-couriers.firebaseio.com"
});

const sandboxBaseUrl = 'driver-admin-dev.yojee.com';
const productionBaseUrl = 'driver-admin.yojee.com';
const sandboxAccessToken = 'Y3Q7PB5NASLWP3O6CGJ40SRDJES8ZSJHBFS9OTGUJUPR2GFE0A1LQT2TL9TH17YA';
const productionAccessToken = 'MZXRBS9TW83W0QN0032BX3BXPBVVMVSQ3WQ6M3H2T0YXO46BPU1VPC1P8WEAA6Y8';

exports.signIn = functions.https.onRequest((req, res) => {
	// get phone number from idToken.
	// try to create customer in Yojee.
});

exports.register = functions.https.onRequest((req, res) => {
	// create a new Yojee customer.
	// get idToken from X-Firebase-Token.
	// store the Yojee accessToken linked to the idToken.
});

exports.createBooking = functions.https.onRequest((req, res) => {
	cors(req, res, () => {

		// Is there an idToken?
			// yes, fetch the customer from Yojee
				// null, 

		console.log('1:res.headersSent', res.headersSent);

		if(!['POST','OPTIONS'].includes(req.method)) {
			res.status(405).json({error:'Method Not Allowed'});
			return;
		}

		console.log('2:res.headersSent', res.headersSent);

		console.log('req.get("X-Firebase-Token")', req.get("X-Firebase-Token"));

		const idToken = req.get("X-Firebase-Token");

		admin.auth().verifyIdToken(idToken)
		.then(function(decodedToken) {
			var uid = decodedToken.uid;
			console.log('DECODED TOKEN', decodedToken);
			console.log('uid', uid);
			// ...
		}).catch(function(error) {
			console.log('error', error);
			// Handle error
		});

		const {
			customerName,
			companyName,
			emailAddress,
			phoneNumber,
			pickupName,
			pickupCompanyName,
			pickupAddress,
			pickupPhoneNumber,
			deliveryName,
			deliveryCompanyName,
			deliveryAddress,
			deliveryPhoneNumber,
			additionalInformation
		} = req.body;

		if(!(customerName && phoneNumber)) {
			res.status(400).json({error:'Bad Request'})
			return;
		}

		console.log('2:res.headersSent', res.headersSent);

		fetch(`https://${sandboxBaseUrl}/api/customer/v1/registration`, {
			method: 'POST',
			headers: {
				'Access-Token': sandboxAccessToken,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				phone: phoneNumber,
				email: emailAddress,
				password: "password",
				billing_address: "",
				name: customerName,
				company_slug: "cargone"
			}),
			cache: 'default'
		})
		.then(res => res.json())
		.then(json => {
			console.log('JSON from registering a customer', json)

			const customerAccessToken = json.accessToken;
			const user = json.user;
			console.log('customerAccessToken', customerAccessToken);
			console.log('user', user);

			// res.end();
			// return;
			let body = {
				items: [
					{
						weight: 4,
						description: additionalInformation
					}
				],
				pickup_hash: {
					// description: additionalInformation,
					address: pickupAddress,
					// unit_number: "",
					from: "10AM",
					to: "12PM",
					perform_date: moment().unix(),
					// latitude: 1.301863,
					// longitude: 103.85867,
					name: pickupName,
					phone: pickupPhoneNumber
				},
				dropoff_hash: {
					// description: additionalInformation,
					address: deliveryAddress,
					// unit_number: "",
					from: "12PM",
					to: "5PM",
					// latitude: 1.321375,
					// longitude: 103.85224590000007,
					name: deliveryName,
					phone: deliveryPhoneNumber
				},
				job_hash: {
					payload_type: "Package",
					description: "Gift",
					delivery_type: "nextday",
					// customer_id: 28
				}
			};
			var options = {
				method: 'POST',
				headers: {
					'Access-Token': customerAccessToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(body),
				cache: 'default',
			};

			console.log(`BOOK:https://${sandboxBaseUrl}/api/customer/v1/deliveries/create`);
			console.log('BOOK:options', options);
			console.log('BOOK:options.body', options.body);
			fetch(`https://${sandboxBaseUrl}/api/customer/v1/deliveries/create`, options)
				.then(response => response.json())
				.then(json => {
					console.log('json', json);
					res.status(200).json(json)
				})
				.catch(err => {
					console.log('err', err);
					res.status(200).end()
				});
		});

	});
	
});


exports.createBooking = functions.https.onRequest((req, res) => {
	cors(req, res, () => {

		// Is there an idToken?
			// yes, fetch the customer from Yojee
				// null, 

		console.log('1:res.headersSent', res.headersSent);

		if(!['POST','OPTIONS'].includes(req.method)) {
			res.status(405).json({error:'Method Not Allowed'});
			return;
		}

		console.log('2:res.headersSent', res.headersSent);

		console.log('req.get("X-Firebase-Token")', req.get("X-Firebase-Token"));

		const idToken = req.get("X-Firebase-Token");

		admin.auth().verifyIdToken(idToken)
		.then(function(decodedToken) {
			var uid = decodedToken.uid;
			console.log('DECODED TOKEN', decodedToken);
			console.log('uid', uid);
			// ...
		}).catch(function(error) {
			console.log('error', error);
			// Handle error
		});

		const {
			customerName,
			companyName,
			emailAddress,
			phoneNumber,
			pickupName,
			pickupCompanyName,
			pickupAddress,
			pickupPhoneNumber,
			deliveryName,
			deliveryCompanyName,
			deliveryAddress,
			deliveryPhoneNumber,
			additionalInformation
		} = req.body;

		if(!(customerName && phoneNumber)) {
			res.status(400).json({error:'Bad Request'})
			return;
		}

		console.log('2:res.headersSent', res.headersSent);

		fetch(`https://${sandboxBaseUrl}/api/customer/v1/registration`, {
			method: 'POST',
			headers: {
				'Access-Token': sandboxAccessToken,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"phone": phoneNumber,
				"email": emailAddress,
				"password": "password",
				"billing_address": "",
				"name": customerName
			}),
			cache: 'default'
		})
		.then(res => res.json())
		.then(json => {
			console.log('JSON from registering a customer', json)

			const customerAccessToken = json.accessToken;
			const user = json.user;
			console.log('customerAccessToken', customerAccessToken);
			console.log('user', user);

			// res.end();
			// return;
			let body = {
				"items": [
					{
						"weight": 4,
						"description": additionalInformation
					}
				],
				"pickup_hash": {
					// "description": additionalInformation,
					"address": pickupAddress,
					// "unit_number": "",
					"from": "10AM",
					"to": "12PM",
					"perform_date": moment().unix(),
					// "latitude": 1.301863,
					// "longitude": 103.85867,
					"name": pickupName,
					"phone": pickupPhoneNumber
				},
				"dropoff_hash": {
					// "description": additionalInformation,
					"address": deliveryAddress,
					// "unit_number": "",
					"from": "12PM",
					"to": "5PM",
					// "latitude": 1.321375,
					// "longitude": 103.85224590000007,
					"name": deliveryName,
					"phone": deliveryPhoneNumber
				},
				"job_hash": {
					"payload_type": "Package",
					"description": "Gift",
					"delivery_type": "nextday",
					// "customer_id": 28
				}
			};
			var options = {
				method: 'POST',
				headers: {
					'Access-Token': customerAccessToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(body),
				cache: 'default',
			};

			console.log(`BOOK:https://${sandboxBaseUrl}/api/customer/v1/deliveries/create`);
			console.log('BOOK:options', options);
			console.log('BOOK:options.body', options.body);
			fetch(`https://${sandboxBaseUrl}/api/customer/v1/deliveries/create`, options)
				.then(response => response.json())
				.then(json => {
					console.log('json', json);
					res.status(200).json(json)
				})
				.catch(err => {
					console.log('err', err);
					res.status(200).end()
				});
		});

	});
	
});
	