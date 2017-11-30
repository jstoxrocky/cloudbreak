import merge from 'lodash/merge';

const initialCaptcha = {
	currentStage: 'HOME',
}

export default function navReducer(state=initialCaptcha, action) {
	Object.freeze(state);
	switch (action.type) { 
		case "CAPTCHA_CLICK": {
			let nextState = merge({}, state, {
				currentStage: 'CAPTCHA',
			});
			return nextState
		}
		case "UPLOAD_CLICK": {
			let nextState = merge({}, state, {
				currentStage: 'UPLOAD',
			});
			return nextState
		}
		case "HOME_CLICK": {
			let nextState = merge({}, state, {
				currentStage: 'HOME',
			});
			return nextState
		}
		case "SEARCH_CLICK": {
			let nextState = merge({}, state, {
				currentStage: 'SEARCH',
			});
			return nextState
		} 
		default:
			return state
	}
}