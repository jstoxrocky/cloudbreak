import merge from 'lodash/merge';
import { DB_CALL_PENDING, DB_CALL_FULFILLED } from '../actions/player-actions';

const initialState = {
	availableTracks:[],
}

function searchResultsReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case DB_CALL_PENDING:
			return state
		case DB_CALL_FULFILLED:
			var nextState = merge({}, state);
			nextState.availableTracks = action.payload
			return nextState
		default:
			return state;
	}
}

export default searchResultsReducer;