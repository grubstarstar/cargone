const functions = require('firebase-functions');
var fetch = require('node-fetch');
var FetchError = require('node-fetch/lib/fetch-error');
console.log('fetch', fetch);
console.log('FetchError', FetchError);
var HttpError = require("http-error");
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

function createBooking(customerJson, {
	pickupAddress,
	pickupName,
	pickupPhoneNumber,
	additionalInformation,
	deliveryAddress,
	deliveryName,
	deliveryPhoneNumber
}) {
	console.log('customerJson.accessToken', customerJson.accessToken)
	let body = {
		items: [
			{
				weight: 4,
				description: additionalInformation
			}
		],
		pickup_hash: {
			description: additionalInformation,
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
			description: additionalInformation,
			address: deliveryAddress,
			// unit_number: "",
			from: "4PM",
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
			'Access-Token': customerJson.accessToken,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(body),
		cache: 'default',
	};

	return fetch(`https://${sandboxBaseUrl}/api/customer/v1/deliveries/create`, options)
		.then(response => response.json())
		// .then(json => {
		// 	console.log('json', json);
		// 	res.status(200).json(json)
		// })
}

function getCustomer(idToken) {
	return Promise.resolve();
	// ask Wai
}

function createCustomer(customerData) {
	return fetch(`https://${sandboxBaseUrl}/api/customer/v1/registration`, {
		method: 'POST',
		headers: {
			'Access-Token': sandboxAccessToken,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(customerData),
		cache: 'default'
	})
	.then(res => res.json());
}


// { result: 'problem',
//   code: 'EmailTaken',
//   message: 'There is already an account with this email' }

exports.createBooking = functions.https.onRequest((req, res) => {
	cors(req, res, () => {

		// Verify request

		if(!['POST','OPTIONS'].includes(req.method)) {
			res.status(405).json({error:'Method Not Allowed'});
			return;
		}

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

		if(!(
			customerName
			&& phoneNumber
			&& pickupAddress
			&& pickupName
			&& pickupPhoneNumber
			&& additionalInformation
			&& deliveryAddress
			&& deliveryName
			&& deliveryPhoneNumber
		)) {
			console.log('HERERERERERERERERER')
			res.status(400).json({error:'Bad Request'})
			return;
		}

		const idToken = req.get("X-Firebase-Token");
		console.log('idToken', idToken);

		new Promise(function(resolve, reject) {
			if(idToken) {
				return admin.auth().verifyIdToken(idToken)
				.then(function(firebaseUser) {
					return firebaseUser;
				}).catch(function(error) {
					console.log('error', error);
					reject(error);
				})
				.then(resolve);
			} else {
				resolve();
			}
		})		
		.then(function(firebaseUser) {
			console.log('Got fierbase User', firebaseUser);
			if(firebaseUser) {
				return getCustomer(idToken)
				.then(function(customerJson) {
					if(!customerJson) {
						throw new HttpError.BadRequest("Couldn't find the customer in Yojee")
					}
					return customerJson;
				})
			} else {
				// no, create user in Yojee
				return createCustomer({
					phone: phoneNumber,
					email: emailAddress,
					password: "password",
					billing_address: "",
					name: customerName,
					company_slug: "cargone"
				})
				.then(function(customerJson) {
					// error? throw
					if(customerJson.result == 'problem') {
						console.log('HERE');
						console.log(customerJson);
						throw new HttpError.BadRequest(customerJson.message)
					}
					return customerJson;
				});
			}
		})
		.then(function(customerJson) {
			console.log('customerJson', customerJson);
			return createBooking(customerJson, {
				// booking data
				pickupAddress,
				pickupName,
				pickupPhoneNumber,
				deliveryAddress,
				deliveryName,
				deliveryPhoneNumber
			})
			.then(function(json) {
				switch(json.status) {
					case '422':
						throw new HttpError.UnprocessableEntity(json.error);
						break;
					case '400':
						throw new HttpError.BadRequest(json.error);
						break;
				}
				return json;
			})
		})
		.then(function(json) {
			console.log('BOOKING', json);
			return res.status(200).json(json);
		})
		.catch(function(ex) {
			if(ex instanceof FetchError) {
				return res.status(500).json({ "error": "I don't know what happened" });
			} else if(ex instanceof HttpError.BadRequest) {
				return res.status(ex.code).json({ "error": ex.message });
			} else if(ex instanceof HttpError.UnprocessableEntity) {
				return res.status(ex.code).json({ "error": ex.message });
			} else {
				console.log('UNCAUGHT ex', ex)
			}
		});

	});
	
});