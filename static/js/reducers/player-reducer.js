import merge from 'lodash/merge';
import {
	PLAYER_STREAM_FULFILLED, 
	PLAYER_UPDATE_FULFILLED } from '../actions/player-actions';

import { LOADING } from '../utils/reports'

const initialState = {
	currentTrack: null,
	artist: null,
	artistIsVerified: null,
	title: null,
	titleIsVerified: null,
}

function playerReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 
		case PLAYER_STREAM_FULFILLED:
			var nextState = merge({}, state);
			nextState.currentTrack = action.payload.currentTrack;
			nextState.artist = action.payload.artist;
			nextState.artistIsVerified = action.payload.artistIsVerified;
			nextState.title = action.payload.title;
			nextState.titleIsVerified = action.payload.titleIsVerified;
			return nextState
		case PLAYER_UPDATE_FULFILLED:
			var nextState = merge({}, state);
			nextState.currentTrack = action.payload.currentTrack;
			nextState.artist = action.payload.artist;
			nextState.artistIsVerified = action.payload.artistIsVerified;
			nextState.title = action.payload.title;
			nextState.titleIsVerified = action.payload.titleIsVerified;
			return nextState
		default:
			return state;
	}
}

export default playerReducer;