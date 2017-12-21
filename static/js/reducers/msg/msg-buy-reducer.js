import merge from 'lodash/merge';
import {
	BUY_SUBMIT_PENDING,
	BUY_SUBMIT_FULFILLED, 
	BUY_INPUT_FULFILLED,
	BUY_SUBMIT_REJECTED,
	BUY_INPUT_REJECTED,
} from '../../actions/buy-actions';
import { LOADING } from '../../utils/reports'

const initialState = {
	value:null,
	visible:false,
	level:null,
}

function msgBuyReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		case BUY_SUBMIT_PENDING:
			var nextState = merge({}, state);
			nextState.value = LOADING;
			nextState.visible = true;
			nextState.level = 'alert-info'
			return nextState

		case BUY_INPUT_REJECTED:
		case BUY_SUBMIT_REJECTED:
			var nextState = merge({}, state);
			nextState.value = action.payload.msg;
			nextState.visible = action.payload.visible;
			nextState.level = action.payload.level
			return nextState


		case BUY_INPUT_FULFILLED:
		case BUY_SUBMIT_FULFILLED:
			var nextState = merge({}, state);
			nextState.value = action.payload.msg;
			nextState.visible = action.payload.visible;
			nextState.level = action.payload.level
			return nextState
		default:
			return state;
	}
}


export default msgBuyReducer;