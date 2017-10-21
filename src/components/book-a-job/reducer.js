const initialState = {
	isSubmitting: false,
	fields: {
		customerName: 'ggggp',
		companyName: '',
		emailAddress: '',
		phoneNumber: '',
		pickupName: '',
		pickupCompanyName: '',
		pickupAddress: '',
		deliveryName: '',
		deliveryCompanyName: '',
		deliveryAddress: '',
	},
	fieldErrors: {
		customerName: '',
		companyName: '',
		emailAddress: '',
		phoneNumber: '',
		pickupName: '',
		pickupCompanyName: '',
		pickupAddress: '',
		deliveryName: '',
		deliveryCompanyName: '',
		deliveryAddress: '',
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