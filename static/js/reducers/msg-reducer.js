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
	BUY_INPUT_FULFILLED,
	BUY_SUBMIT_REJECTED,
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
import {
	ALLOWANCE_APPROVE_SUBMIT_PENDING,
	ALLOWANCE_WITHDRAW_SUBMIT_PENDING,
	ALLOWANCE_APPROVE_SUBMIT_FULFILLED,
	ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED,
	ALLOWANCE_APPROVE_INPUT,
	ALLOWANCE_WITHDRAW_INPUT,
	ALLOWANCE_APPROVE_SUBMIT_REJECTED,
	ALLOWANCE_WITHDRAW_SUBMIT_REJECTED,
} from '../actions/allowance-actions'
import { LOADING } from '../utils/reports'

const initialState = {
	allowance: {
		value:null,
		visible:false,
		level:null,
	},
	buy: {
		value:null,
		visible:false,
		level:null,
	},
	captcha: {
		value:null,
		visible:false,
		level:null,
	},
	player: {
		value:null,
		visible:false,
		level:null,
	},
	upload: {
		value:null,
		visible:false,
		level:null,
	},
	search: {
		value:null,
		visible:false,
		level:null,
	}
}


function msgReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		// BUY
		case BUY_SUBMIT_PENDING:
			var nextState = merge({}, state);
			nextState.buy.value = LOADING;
			nextState.buy.visible = true;
			nextState.buy.level = 'alert-info'
			return nextState
		// CAPTCHA
		case CAPTCHA_GET_PENDING:
		case CAPTCHA_SUBMIT_PENDING:
		case CAPTCHA_SIGN_PENDING:
			var nextState = merge({}, state);
			nextState.captcha.value = LOADING;
			nextState.captcha.visible = true;
			nextState.captcha.level = 'alert-info'
			return nextState
		// STREAM
		case PLAYER_STREAM_PENDING:
		case PLAYER_UPDATE_PENDING:
			var nextState = merge({}, state);
			nextState.player.value = LOADING;
			nextState.player.visible = true;
			nextState.player.level = 'alert-info'
			return nextState
		// UPLOAD
		case UPLOAD_SUBMIT_PENDING:
		case UPLOAD_SIGN_PENDING:
			var nextState = merge({}, state);
			nextState.upload.value = LOADING;
			nextState.upload.visible = true;
			nextState.upload.level = 'alert-info'
			return nextState
		case SEARCH_PENDING:
			var nextState = merge({}, state);
			nextState.search.value = LOADING;
			nextState.search.visible = true;
			nextState.search.level = 'alert-info'
			return nextState
		case ALLOWANCE_APPROVE_SUBMIT_PENDING:
		case ALLOWANCE_WITHDRAW_SUBMIT_PENDING:
			var nextState = merge({}, state);
			nextState.allowance.value = LOADING;
			nextState.allowance.visible = true;
			nextState.allowance.level = 'alert-info'
			return nextState

		// BUY
		case BUY_SUBMIT_REJECTED:
			var nextState = merge({}, state);
			nextState.buy.value = "Transaction Error";
			nextState.buy.visible = true;
			nextState.buy.level = 'alert-danger'
			return nextState
		// BUY
		case ALLOWANCE_APPROVE_SUBMIT_REJECTED:
		case ALLOWANCE_WITHDRAW_SUBMIT_REJECTED:
			var nextState = merge({}, state);
			nextState.allowance.value = "Transaction Error";
			nextState.allowance.visible = true;
			nextState.allowance.level = 'alert-danger'
			return nextState

		// BUY
		case BUY_INPUT_FULFILLED:
		case BUY_SUBMIT_FULFILLED:
			var nextState = merge({}, state);
			nextState.buy.value = action.payload.msg;
			nextState.buy.visible = action.payload.visible;
			nextState.buy.level = action.payload.level
			return nextState
		// CAPTCHA
		case CAPTCHA_GET_FULFILLED:
		case CAPTCHA_SUBMIT_FULFILLED:
		case CAPTCHA_SIGN_FULFILLED:
			var nextState = merge({}, state);
			nextState.captcha.value = action.payload.data.error.msg;
			nextState.captcha.visible = action.payload.data.error.status;
			nextState.captcha.level = action.payload.data.error.status ? 'alert-danger': 'alert-success'
			return nextState
		// STREAM
		case PLAYER_STREAM_FULFILLED:
		case PLAYER_UPDATE_FULFILLED:
			var nextState = merge({}, state);
			nextState.player.value = action.payload.msg;
			nextState.player.visible = action.payload.status;
			nextState.player.level = action.payload.level
			return nextState
		// UPLOAD
		case UPLOAD_SUBMIT_FULFILLED:
		case UPLOAD_SIGN_FULFILLED:
			var nextState = merge({}, state);
			nextState.upload.value = action.payload.data.error.msg;
			nextState.upload.visible = action.payload.data.error.status;
			nextState.upload.level = action.payload.data.error.status ? 'alert-danger': 'alert-success'
			return nextState
		case SEARCH_FULFILLED:
			var nextState = merge({}, state);
			nextState.search.value = action.payload.data.error.msg;
			nextState.search.visible = action.payload.data.error.status;
			nextState.search.level = action.payload.data.error.status ? 'alert-danger': 'alert-success'
			return nextState
		case ALLOWANCE_APPROVE_INPUT:
		case ALLOWANCE_WITHDRAW_INPUT:
		case ALLOWANCE_APPROVE_SUBMIT_FULFILLED:
		case ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED:
		var nextState = merge({}, state);
			nextState.allowance.value = action.payload.msg;
			nextState.allowance.visible = action.payload.visible;
			nextState.allowance.level = action.payload.level
			return nextState
		default:
			return state;
	}
}

export default msgReducer;