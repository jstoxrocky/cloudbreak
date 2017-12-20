import merge from 'lodash/merge';
import {
	BUY_INPUT_FULFILLED, } from '../actions/buy-actions';

const initialState = {
	wei:null,
	eth:0,
}

function buyReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case BUY_INPUT_FULFILLED: {
			let nextState = merge({}, state);
			nextState.eth = action.payload.eth;
			nextState.wei = action.payload.wei;
			return nextState
		}
		default:
			return state;
	}
}

export default buyReducer;