import merge from 'lodash/merge';
import {
	ALLOWANCE_APPROVE_INPUT_FULFILLED, 
	ALLOWANCE_WITHDRAW_INPUT_FULFILLED,
} from '../actions/allowance-actions';

const initialState = {
	approval:0,
	withdrawl:0,
}

function allowanceReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case ALLOWANCE_APPROVE_INPUT_FULFILLED: {
			console.log(action.payload)
			let nextState = merge({}, state);
			nextState.approval = action.payload.tokens;
			return nextState
		}
		case ALLOWANCE_WITHDRAW_INPUT_FULFILLED: {
			let nextState = merge({}, state);
			nextState.withdrawl = action.payload.tokens;
			return nextState
		}
		default:
			return state;
	}
}

export default allowanceReducer;