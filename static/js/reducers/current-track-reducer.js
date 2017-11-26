import merge from 'lodash/merge';
import { GET_CURRENT_TRACK_PENDING, GET_CURRENT_TRACK_FULFILLED } from '../actions/actions';

const initialState = {
	currentTrack: null,
	artist: null,
	artistIsVerified: null,
	title: null,
	titleIsVerified: null,
}

function currentTrackReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case GET_CURRENT_TRACK_PENDING:
			return state;
		case GET_CURRENT_TRACK_FULFILLED:
			let nextState = merge({}, state);
			nextState.currentTrack = action.payload.base58TrackHash;;
			nextState.artist = action.payload.artist;;
			nextState.artistIsVerified = action.payload.artistIsVerified;;
			nextState.title = action.payload.title;;
			nextState.titleIsVerified = action.payload.titleIsVerified;;
			return nextState
		default:
			return state;
	}
}

export default currentTrackReducer;

// GET_CURRENT_TRACK_REJECTED