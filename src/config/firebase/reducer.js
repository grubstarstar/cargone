const initialState = {
	idToken: null
};

export default (state = initialState, action) => {
	if(action.type == 'storeFirebaseIdToken') {
		return Object.assign({}, state, {
			idToken: action.idToken
		});
	}
	return state;
};