function fakeFetch(url, options, makeItSucceed = true) {
	console.log('FAKE FETCH', url, options);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const fn = makeItSucceed ? resolve : reject;
			fn({ json: { one: 1 }})
		}, 2000);
	});
}

const createBookingStart = () => ({
	type: 'createBooking/Start'
})

const createBookingSuccess = (json) => ({
	type: 'createBooking/Success',
	json
})

const createBookingFailure = (json) => ({
	type: 'createBooking/Failure',
	json
})

export const createBooking = () => (dispatch, getState) => {
	const details = getState().bookingForm.fields;
	const idToken = getState().firebase.idToken;
	console.log('details', details);
	dispatch(createBookingStart());

	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};
	if(idToken) {
		headers['X-Firebase-Token'] = idToken;
	}

	fetch('http://localhost:5000/cargone-couriers/us-central1/createBooking', {
		method: 'POST',
		headers,
		body: JSON.stringify(details),
		mode: 'cors'
	})
	.then(res => res.json())
	.then(json => {
		if(json && json.message) {
			dispatch(createBookingSuccess(json))
		} else {
			dispatch(createBookingFailure(json))
		}
	});

};

export const updateFieldValue = (field, value) => ({
	type: 'updateFieldValue',
	field, value
})