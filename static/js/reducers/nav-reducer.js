import merge from 'lodash/merge';
import { 
	NAV_CAPTCHA, 
	NAV_UPLOAD,
	NAV_HOME, 
	NAV_SEARCH,
	NAV_BUY,
	NAV_ALLOWANCE,} from '../actions/nav-actions';

const initialCaptcha = {
	currentPage: 'HOME',
}

export default function navReducer(state=initialCaptcha, action) {
	Object.freeze(state);
	switch (action.type) { 
		case NAV_CAPTCHA: {
			let nextState = merge({}, state, {
				currentPage: 'CAPTCHA',
			});
			return nextState
		}
		case NAV_UPLOAD: {
			let nextState = merge({}, state, {
				currentPage: 'UPLOAD',
			});
			return nextState
		}
		case NAV_HOME: {
			let nextState = merge({}, state, {
				currentPage: 'HOME',
			});
			return nextState
		}
		case NAV_SEARCH: {
			let nextState = merge({}, state, {
				currentPage: 'HOME',
			});
			return nextState
		} 
		case NAV_BUY: {
			let nextState = merge({}, state, {
				currentPage: 'BUY',
			});
			return nextState
		} 
		case NAV_ALLOWANCE: {
			let nextState = merge({}, state, {
				currentPage: 'ALLOWANCE',
			});
			return nextState
		} 
		default:
			return state
	}
}