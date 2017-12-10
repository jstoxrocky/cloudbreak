import merge from 'lodash/merge';

const initialCaptcha = {
	currentStage: 'HOME',
}

export default function navReducer(state=initialCaptcha, action) {
	Object.freeze(state);
	switch (action.type) { 
		case "CAPTCHA": {
			let nextState = merge({}, state, {
				currentStage: 'CAPTCHA',
			});
			return nextState
		}
		case "UPLOAD": {
			let nextState = merge({}, state, {
				currentStage: 'UPLOAD',
			});
			return nextState
		}
		case "HOME": {
			let nextState = merge({}, state, {
				currentStage: 'HOME',
			});
			return nextState
		}
		case "SEARCH": {
			let nextState = merge({}, state, {
				currentStage: 'SEARCH',
			});
			return nextState
		} 
		case "BUY": {
			let nextState = merge({}, state, {
				currentStage: 'BUY',
			});
			return nextState
		} 
		case "APPROVE": {
			let nextState = merge({}, state, {
				currentStage: 'APPROVE',
			});
			return nextState
		} 
		default:
			return state
	}
}