import merge from 'lodash/merge';
import {
	CAPTCHA_GET_FULFILLED, 
	CAPTCHA_INPUT_VALUE_1,
	CAPTCHA_INPUT_VALUE_2,
	CAPTCHA_INPUT_TRANSACTION,
	CAPTCHA_SUBMIT_FULFILLED,
	CAPTCHA_SIGN_FULFILLED,} from '../actions/captcha-actions';

const initialCaptcha = {
	data: {
        'captcha_key': null,
        'question': null,
        'answer': null,
        'tx_captcha': null,
    },
    submission: {
    	value_1: null,
    	value_2: null,
    },
    transaction: {
    	txHash: null,
    },
	currentStage: null,
}

export default function captchaReducer(state=initialCaptcha, action) {
	Object.freeze(state);
	switch (action.type) {
		case CAPTCHA_GET_FULFILLED: {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				currentStage: 'QUESTION',
			});
			return nextState
		}
		case CAPTCHA_INPUT_VALUE_1: {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case CAPTCHA_INPUT_VALUE_2: {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case CAPTCHA_INPUT_TRANSACTION: {
			let nextState = merge({}, state);
			nextState.transaction = merge({}, nextState.transaction, action.payload)
			return nextState
		}
		
		case CAPTCHA_SUBMIT_FULFILLED: {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				currentStage: action.payload.data.data.answer ? 'ANSWER' : 'QUESTION',
			});
			return nextState
		}
		case CAPTCHA_SIGN_FULFILLED: {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				currentStage: action.payload.data.data.tx_captcha ? 'TX_CAPTCHA' : 'ANSWER',
			});
			return nextState
		}
		default:
			return state
	}
}


