import merge from 'lodash/merge';
import { 
	STREAM_PENDING, 
	STREAM_PENDING_REJECTED,
	STREAM_FULFILLED, 
	STREAM_REJECTED,
	UPDATE_PLAYER,
	UPDATE_PLAYER_PENDING, 
	UPDATE_PLAYER_FULFILLED } from '../actions/actions';

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
			nextState.currentTrack = action.payload.currentTrack;
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
		case UPDATE_PLAYER_PENDING:
			return state;
		case UPDATE_PLAYER_FULFILLED:
			var nextState = merge({}, state);
			nextState.currentTrack = action.payload.currentTrack;
			nextState.artist = action.payload.artist;
			nextState.artistIsVerified = action.payload.artistIsVerified;
			nextState.title = action.payload.title;
			nextState.titleIsVerified = action.payload.titleIsVerified;
			nextState.balance = action.payload.balance;
			return nextState
		default:
			return state;
	}
}

export default streamReducer;