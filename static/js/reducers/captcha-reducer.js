import merge from 'lodash/merge';

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
	msg: null,
	currentStage: null,
}

export default function captchaReducer(state=initialCaptcha, action) {
	Object.freeze(state);
	switch (action.type) {
		// INPUT
		case "INPUT_CAPTCHA_VALUE_1": {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case "INPUT_CAPTCHA_VALUE_2": {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case "INPUT_CAPTCHA_TRANSACTION": {
			let nextState = merge({}, state);
			nextState.transaction = merge({}, nextState.transaction, action.payload)
			return nextState
		}
		// QUESTION
		case "GET_CAPTCHA_PENDING": {
			let nextState = merge({}, state, {
				msg: "Loading...",
				currentStage: 'LOADING',
			});
			return nextState
		}
		case "GET_CAPTCHA_FULFILLED": {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				msg: action.payload.data.msg,
				currentStage: 'QUESTION',
			});
			return nextState
		}
		// ANSWER
		case "SUBMIT_CAPTCHA_PENDING": {
			let nextState = merge({}, state, {
				msg: "Checking CAPTCHA...",
			});
			return nextState
		}
		case "SUBMIT_CAPTCHA_FULFILLED": {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				msg: action.payload.data.msg,
				currentStage: action.payload.data.data.answer ? 'ANSWER' : 'QUESTION',
			});
			return nextState
		}
		// TX
		case "SIGN_AND_SUBMIT_CAPTCHA_PENDING": {
			let nextState = merge({}, state, {
				msg: "Loading...",
			});
			return nextState
		}
		case "SIGN_AND_SUBMIT_CAPTCHA_FULFILLED": {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				msg: action.payload.data.msg,
				currentStage: action.payload.data.data.tx_captcha ? 'TX_CAPTCHA' : 'ANSWER',
			});
			return nextState
		}
		default:
			return state
	}
}


