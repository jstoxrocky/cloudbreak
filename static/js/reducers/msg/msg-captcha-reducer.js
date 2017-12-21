import merge from 'lodash/merge';
import {
	CAPTCHA_GET_PENDING,
	CAPTCHA_GET_FULFILLED, 
	CAPTCHA_SUBMIT_PENDING, 
    CAPTCHA_SUBMIT_FULFILLED, 
    CAPTCHA_SIGN_PENDING,
    CAPTCHA_SIGN_FULFILLED, 
} from '../../actions/captcha-actions';
import { LOADING } from '../../utils/reports'

const initialState = {
	value:null,
	visible:false,
	level:null,
}

function msgCaptchaReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		case CAPTCHA_GET_PENDING:
		case CAPTCHA_SUBMIT_PENDING:
		case CAPTCHA_SIGN_PENDING:
			var nextState = merge({}, state);
			nextState.value = LOADING;
			nextState.visible = true;
			nextState.level = 'alert-info'
			return nextState

		case CAPTCHA_GET_FULFILLED:
		case CAPTCHA_SUBMIT_FULFILLED:
		case CAPTCHA_SIGN_FULFILLED:
			var nextState = merge({}, state);
			nextState.value = action.payload.data.msg.value;
			nextState.visible = action.payload.data.msg.visible;
			nextState.level = action.payload.data.msg.level
			return nextState
		default:
			return state;
	}
}


export default msgCaptchaReducer;