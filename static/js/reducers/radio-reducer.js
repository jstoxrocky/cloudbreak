import merge from 'lodash/merge';
import { RADIO_OPTION_CHANGE } from '../actions/actions';

const initialState = {
	selectedOption: null,
}

function radioReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case RADIO_OPTION_CHANGE:
			var nextState = merge({}, state);
			nextState.selectedOption = action.payload.selectedOption;
			return nextState
		default:
			return state;
	}
}

export default radioReducer;

// STREAM_PENDING_REJECTED