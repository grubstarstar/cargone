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

export const createBooking = () => (dispatch, getState) => {
	const details = getState().bookingForm.fields;
	console.log('details', details);
	dispatch(createBookingStart());

	fetch('http://localhost:5000/cargone-couriers/us-central1/createBooking', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(details),
		mode: 'cors'
	})
	.then(res => res.json())
	.then(json => dispatch(createBookingSuccess(json)));

};

export const updateFieldValue = (field, value) => ({
	type: 'updateFieldValue',
	field, value
})