import merge from 'lodash/merge';
import { GET_TOKEN_BALANCE_PENDING, GET_TOKEN_BALANCE_FULFILLED } from '../actions/actions';

const initialState = {
	balance: 0,
}

function tokensReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case GET_TOKEN_BALANCE_PENDING:
			return state;
		case GET_TOKEN_BALANCE_FULFILLED:
			let nextState = merge({}, state);
			const balance = action.payload;
			nextState.balance = balance;
			return nextState
		default:
			return state;
	}
}

export default tokensReducer;

// GET_TOKEN_BALANCE_REJECTED