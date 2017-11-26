import merge from 'lodash/merge';
import { 
	STREAM_PENDING, 
	STREAM_PENDING_REJECTED,
	STREAM_FULFILLED, 
	STREAM_REJECTED,
	GET_CURRENT_TRACK_PENDING, 
	GET_CURRENT_TRACK_FULFILLED, 
	GET_TOKEN_BALANCE_PENDING, 
	GET_TOKEN_BALANCE_FULFILLED } from '../actions/actions';

const initialState = {
	currentTrack: null,
	artist: null,
	artistIsVerified: null,
	title: null,
	titleIsVerified: null,
	txSuccess: true,
	balance: 0,
}

function streamReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case STREAM_PENDING:
			return state;
		case STREAM_FULFILLED:
			var nextState = merge({}, state);
			nextState.currentTrack = action.payload.base58TrackHash;
			nextState.artist = action.payload.artist;
			nextState.artistIsVerified = action.payload.artistIsVerified;
			nextState.title = action.payload.title;
			nextState.titleIsVerified = action.payload.titleIsVerified;
			nextState.txSuccess = action.payload.txSuccess;
			nextState.balance = action.payload.balance;
			return nextState
		case STREAM_REJECTED:
			var nextState = merge({}, state);
			nextState.txSuccess = false;
			nextState.msg = 'Metamask rejection'
		case STREAM_PENDING_REJECTED:
			var nextState = merge({}, state);
			nextState.txSuccess = false;
			nextState.msg = 'Error streaming track'
		case GET_CURRENT_TRACK_PENDING:
			return state;
		case GET_CURRENT_TRACK_FULFILLED:
			var nextState = merge({}, state);
			nextState.currentTrack = action.payload.base58TrackHash;
			nextState.artist = action.payload.artist;
			nextState.artistIsVerified = action.payload.artistIsVerified;
			nextState.title = action.payload.title;
			nextState.titleIsVerified = action.payload.titleIsVerified;
			return nextState
		case GET_TOKEN_BALANCE_PENDING:
			return state;
		case GET_TOKEN_BALANCE_FULFILLED:
			var nextState = merge({}, state);
			nextState.balance = action.payload;
			return nextState
		default:
			return state;
	}
}

export default streamReducer;