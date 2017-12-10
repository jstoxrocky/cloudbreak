import merge from 'lodash/merge';

const initialState = {
	msg:null,
	eth:null,
	wei:null,
	tokens:0,
}

function buyReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case "INPUT_BUY_PENDING": {
			return state
		} 
		case "INPUT_BUY_FULFILLED": {
			let nextState = merge({}, state);
			nextState.eth = action.payload.eth;
			nextState.wei = action.payload.wei;
			nextState.tokens = action.payload.tokens;
			return nextState
		}
		default:
			return state;
	}
}

export default buyReducer;