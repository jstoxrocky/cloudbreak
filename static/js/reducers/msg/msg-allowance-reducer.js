import merge from 'lodash/merge';
import {
	ALLOWANCE_APPROVE_SUBMIT_PENDING,
	ALLOWANCE_WITHDRAW_SUBMIT_PENDING,
	ALLOWANCE_APPROVE_SUBMIT_FULFILLED,
	ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED,
	ALLOWANCE_APPROVE_INPUT,
	ALLOWANCE_WITHDRAW_INPUT,
	ALLOWANCE_WITHDRAW_INPUT_REJECTED,
	ALLOWANCE_WITHDRAW_SUBMIT_REJECTED,
	ALLOWANCE_APPROVE_INPUT_REJECTED,
	ALLOWANCE_APPROVE_SUBMIT_REJECTED,
} from '../../actions/allowance-actions'
import { LOADING } from '../../utils/reports'

const initialState = {
	value:null,
	visible:false,
	level:null,
}

function msgAllowanceReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		case ALLOWANCE_APPROVE_SUBMIT_PENDING:
		case ALLOWANCE_WITHDRAW_SUBMIT_PENDING:
			var nextState = merge({}, state);
			nextState.value = LOADING;
			nextState.visible = true;
			nextState.level = 'alert-info'
			return nextState

		case ALLOWANCE_WITHDRAW_INPUT_REJECTED:
		case ALLOWANCE_WITHDRAW_SUBMIT_REJECTED:
		case ALLOWANCE_APPROVE_INPUT_REJECTED:
		case ALLOWANCE_APPROVE_SUBMIT_REJECTED:
			var nextState = merge({}, state);
			nextState.value = action.payload.msg;
			nextState.visible = action.payload.visible;
			nextState.level = action.payload.level
			return nextState

		case ALLOWANCE_APPROVE_INPUT:
		case ALLOWANCE_WITHDRAW_INPUT:
		case ALLOWANCE_APPROVE_SUBMIT_FULFILLED:
		case ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED:
		var nextState = merge({}, state);
			nextState.value = action.payload.msg;
			nextState.visible = action.payload.visible;
			nextState.level = action.payload.level
			return nextState
		default:
			return state;
	}
}


export default msgAllowanceReducer;