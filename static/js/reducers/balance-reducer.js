import merge from 'lodash/merge';
import { 
	PLAYER_UPDATE_FULFILLED,
	PLAYER_STREAM_FULFILLED, 
} from '../actions/player-actions';
import {
	BUY_SUBMIT_FULFILLED
} from '../actions/buy-actions';
import {
	ALLOWANCE_APPROVE_SUBMIT_FULFILLED,
	ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED,
} from '../actions/allowance-actions';

const initialState = {
	userBalance: 0,
	serviceAllowance: 0,
	trackBalance: 0,
	playCount: 0,
}

function balanceReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		case BUY_SUBMIT_FULFILLED:
			var nextState = merge({}, state);
			nextState.userBalance = action.payload.userBalance;
			return nextState
		case ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED:
		case ALLOWANCE_APPROVE_SUBMIT_FULFILLED:
			var nextState = merge({}, state);
			nextState.serviceAllowance = action.payload.serviceAllowance;
			return nextState
		case PLAYER_STREAM_FULFILLED:
		case PLAYER_UPDATE_FULFILLED:
			var nextState = merge({}, state);
			nextState.userBalance = action.payload.userBalance;
			nextState.serviceAllowance = action.payload.serviceAllowance;
			nextState.trackBalance = action.payload.trackBalance;
			nextState.playCount = action.payload.playCount;
			return nextState
		default:
			return state;
	}
}

export default balanceReducer;