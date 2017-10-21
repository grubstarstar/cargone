import { connect } from 'react-redux';

import Presentation from './presentation';
import { createBooking, updateFieldValue } from './actions';

export default connect(
	state => ({
		form: state.bookingForm.fields,
		isSubmitting: state.bookingForm.isSubmitting
	}),
	dispatch => ({
		onChange: (field, value) => dispatch(updateFieldValue(field, value)),
		submit: form => dispatch(createBooking(form))
	})
)(Presentation);