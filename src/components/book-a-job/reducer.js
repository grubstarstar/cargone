const initialState = {
	isSubmitting: false,
	fields: {
		customerName: '',
		companyName: '',
		emailAddress: '',
		phoneNumber: '',
		pickupName: '',
		pickupCompanyName: '',
		pickupAddress: '',
		pickupPhoneNumber: '',
		deliveryName: '',
		deliveryCompanyName: '',
		deliveryAddress: '',
		deliveryPhoneNumber: '',
		additionalInformation: '',
	},
	fieldErrors: {
		customerName: '',
		companyName: '',
		emailAddress: '',
		phoneNumber: '',
		pickupName: '',
		pickupCompanyName: '',
		pickupAddress: '',
		pickupPhoneNumber: '',
		deliveryName: '',
		deliveryCompanyName: '',
		deliveryAddress: '',
		deliveryPhoneNumber: '',
		additionalInformation: '',
	}
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'updateFieldValue':
			return Object.assign({}, state,
				{
					fields: Object.assign({}, state.fields, { [action.field]: action.value })
				}
			);
		case 'createBooking/Start':
			return Object.assign({}, state, { isSubmitting: true });
		case 'createBooking/Success':
			return Object.assign({}, state, { isSubmitting: false });
		default:
			return state;
	}
}