import merge from 'lodash/merge';
import { 
	PLAYER_STREAM_PENDING, 
	PLAYER_STREAM_FULFILLED,
	PLAYER_UPDATE_PENDING, 
	PLAYER_UPDATE_FULFILLED, 
} from '../actions/player-actions';
import {
	BUY_SUBMIT_PENDING,
	BUY_SUBMIT_FULFILLED, 
} from '../actions/buy-actions';
import {
	CAPTCHA_GET_PENDING,
	CAPTCHA_GET_FULFILLED, 
	CAPTCHA_SUBMIT_PENDING, 
    CAPTCHA_SUBMIT_FULFILLED, 
    CAPTCHA_SIGN_PENDING,
    CAPTCHA_SIGN_FULFILLED, 
} from '../actions/captcha-actions';
import {
	UPLOAD_SUBMIT_PENDING, 
	UPLOAD_SUBMIT_FULFILLED,
	UPLOAD_SIGN_PENDING,
	UPLOAD_SIGN_FULFILLED,
} from '../actions/upload-actions'
import {
	SEARCH_PENDING,
	SEARCH_FULFILLED, 
} from '../actions/search-actions';
import { LOADING } from '../utils/reports'

const initialState = {
	approve: {
		value: null,
	},
	buy: {
		value: null,
	},
	captcha: {
		value: null,
	},
	stream: {
		value: null,
	},
	upload: {
		value: null,
	},
	search: {
		value: null,
	}
}


function msgReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		// BUY
		case BUY_SUBMIT_PENDING:
			var nextState = merge({}, state);
			nextState.buy.value = LOADING;
			return nextState
		// CAPTCHA
		case CAPTCHA_GET_PENDING:
		case CAPTCHA_SUBMIT_PENDING:
		case CAPTCHA_SIGN_PENDING:
			var nextState = merge({}, state);
			nextState.captcha.value = LOADING;
			return nextState
		// STREAM
		case PLAYER_STREAM_PENDING:
		case PLAYER_UPDATE_PENDING:
			var nextState = merge({}, state);
			nextState.stream.value = LOADING;
			return nextState
		// UPLOAD
		case UPLOAD_SUBMIT_PENDING:
		case UPLOAD_SIGN_PENDING:
			var nextState = merge({}, state);
			nextState.upload.value = LOADING;
			return nextState
		case SEARCH_PENDING:
			var nextState = merge({}, state);
			nextState.search.value = LOADING;
			return nextState


		// BUY
		case BUY_SUBMIT_FULFILLED:
			var nextState = merge({}, state);
			nextState.buy.value = action.payload.msg;
			return nextState
		// CAPTCHA
		case CAPTCHA_GET_FULFILLED:
		case CAPTCHA_SUBMIT_FULFILLED:
		case CAPTCHA_SIGN_FULFILLED:
			var nextState = merge({}, state);
			nextState.captcha.value = action.payload.data.msg;
			return nextState
		// STREAM
		case PLAYER_STREAM_FULFILLED:
		case PLAYER_UPDATE_FULFILLED:
			var nextState = merge({}, state);
			nextState.stream.value = action.payload.msg;
			return nextState
		// UPLOAD
		case UPLOAD_SUBMIT_FULFILLED:
		case UPLOAD_SIGN_FULFILLED:
			var nextState = merge({}, state);
			nextState.upload.value = action.payload.data.msg;
			return nextState
		case SEARCH_FULFILLED:
			var nextState = merge({}, state);
			nextState.search.value = action.payload.data.msg;
			return nextState

		default:
			return state;
	}
}

export default msgReducer;