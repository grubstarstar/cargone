const initialState = {
	idToken: null
};

export default (state = initialState, action) => {
	if(action.type == 'storeFirebaseIdToken') {
		return Object.assign({}, state, {
			idToken: action.idToken
		});
	}
	else if(action.type == 'deleteFirebaseIdToken') {
		return Object.assign({}, state, {
			idToken: null
		});
	}
	return state;
};