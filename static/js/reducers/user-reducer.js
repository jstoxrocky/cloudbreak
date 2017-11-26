import merge from 'lodash/merge';
import { GET_USER_ADDRESS_PENDING, GET_USER_ADDRESS_FULFILLED } from '../actions/actions';

const initialState = {
	address: null,
}

function userReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case GET_USER_ADDRESS_PENDING:
			return state;
		case GET_USER_ADDRESS_FULFILLED:
			let nextState = merge({}, state);
			const address = action.payload[0];
			nextState.address = address;
			return nextState
		default:
			return state;
	}
}

export default userReducer;