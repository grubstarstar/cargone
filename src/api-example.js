require('isomorphic-fetch');

const sandboxBaseUrl = "driver-admin-dev.yojee.com";
const liveBaseUrl = "driver-admin.yojee.com";

fetch(`https://${sandboxBaseUrl}/api/customer/v1/deliveries/create`, {
	method: 'POST',
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Access-Token": "Y3Q7PB5NASLWP3O6CGJ40SRDJES8ZSJHBFS9OTGUJUPR2GFE0A1LQT2TL9TH17YA"
	},
	body: {
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
			"address": "235 Balestier Rd, Singapore",
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
	}
})
.then(res => {
	console.log('status', res.status)
	console.log('headers', res.headers)
	return res.json()
})
.then(console.log)
.catch(console.log);
