import merge from 'lodash/merge';
import {
	APPROVE_INPUT, } from '../actions/approve-actions';

const initialState = {
	tokens:0,
}

function approveReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case APPROVE_INPUT: {
			let nextState = merge({}, state);
			nextState.tokens = action.payload;
			return nextState
		}
		default:
			return state;
	}
}

export default approveReducer;