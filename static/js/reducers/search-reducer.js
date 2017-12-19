import merge from 'lodash/merge';
import { SEARCH_PENDING, SEARCH_FULFILLED } from '../actions/search-actions';

const initialState = {
	availableTracks:[],
}

function searchResultsReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case SEARCH_FULFILLED:
			var nextState = merge({}, state);
			nextState.availableTracks = action.payload.data.data
			return nextState
		default:
			return state;
	}
}

export default searchResultsReducer;