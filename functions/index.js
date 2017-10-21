const functions = require('firebase-functions');
var fetch = require('isomorphic-fetch');
var stream = require('stream');
const cors = require('cors')({origin: true});
const moment = require('moment');

const sandboxBaseUrl = 'driver-admin-dev.yojee.com';
const productionBaseUrl = 'driver-admin.yojee.com';
const sandboxAccessToken = 'Y3Q7PB5NASLWP3O6CGJ40SRDJES8ZSJHBFS9OTGUJUPR2GFE0A1LQT2TL9TH17YA';
const productionAccessToken = 'MZXRBS9TW83W0QN0032BX3BXPBVVMVSQ3WQ6M3H2T0YXO46BPU1VPC1P8WEAA6Y8';

exports.createBooking = functions.https.onRequest((req, res) => {
	cors(req, res, () => {

		if(!['POST','OPTIONS'].includes(req.method)) {
			res.status(405).send('Method Not Allowed');
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

		if(!(customerName && companyName && phoneNumber)) {
			res.status(400).send('Bad Request');
		}

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
				.then(json => res.send(json));
		});

	});
	
});

	