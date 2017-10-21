const functions = require('firebase-functions');
var fetch = require('isomorphic-fetch');
var stream = require('stream');
const cors = require('cors')({origin: true});

const sandboxBaseUrl = 'driver-admin-dev.yojee.com';
const productionBaseUrl = 'driver-admin.yojee.com';
const sandboxAccessToken = 'Y3Q7PB5NASLWP3O6CGJ40SRDJES8ZSJHBFS9OTGUJUPR2GFE0A1LQT2TL9TH17YA';
const productionAccessToken = 'MZXRBS9TW83W0QN0032BX3BXPBVVMVSQ3WQ6M3H2T0YXO46BPU1VPC1P8WEAA6Y8';

exports.createBooking = functions.https.onRequest((req, res) => {
	cors(req, res, () => {

		console.log('req.method', req.method);

		if(!['POST','OPTIONS'].includes(req.method)) {
			res.status(405).send('Method Not Allowed');
		}

		console.log('REQ', req.body);
		res.end('{"one":23}');
		return;

		const {
			customerName,
			companyName,
			emailAddress,
			phoneNumber,
			pickupName,
			pickupCompanyName,
			pickupAddress,
			deliveryName,
			deliveryCompanyName,
			deliveryAddress
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
			body: {
				"phone": phoneNumber,
				"email": "test@mail.com",
				"password": "password",
				"billing_address": "51 Cuppage Rd, Singapore 229469",
				"name": customerName
			},
			cache: 'default'
		});

		let body = {
			"items": [
				{
					"weight": 4,
					"description": "Package"
				}
			],
			"pickup_hash": {
				"description": "Test",
				"address": "106 Arab St, Singapore 199802",
				"unit_number": "",
				"from": "10AM",
				"to": "12PM",
				"perform_date": 1487564821,
				"latitude": 1.301863,
				"longitude": 103.85867,
				"name": "Test",
				"phone": "+6599999999"
			},
			"dropoff_hash": {
				"description": "Test",
				"address": deliveryAddress,
				"unit_number": "",
				"from": "10AM",
				"to": "12PM",
				"latitude": 1.321375,
				"longitude": 103.85224590000007,
				"name": "A",
				"phone": "+6590880725"
			},
			"job_hash": {
				"payload_type": "Package",
				"description": "Gift",
				"delivery_type": "nextday",
				"customer_id": 28
			}
		};
		var options = {
			method: req.method,
			headers: {
				'Access-Token': sandboxAccessToken,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			cache: 'default',
		};
		if(body) {
			options['body'] = body;
		}
		console.log(`https://${sandboxBaseUrl}${req.path}`);
		console.log('options', options);
		fetch(`https://${sandboxBaseUrl}${req.path}`, options)
			.then(response => response.json())
			.then(json => res.send(json));
	
	});
	
});

	