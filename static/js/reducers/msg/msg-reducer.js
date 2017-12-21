import merge from 'lodash/merge';
import { combineReducers } from "redux";
import msgPlayerReducer from './msg-player-reducer'
import msgBuyReducer from './msg-buy-reducer'
import msgCaptchaReducer from './msg-captcha-reducer'
import msgUploadReducer from './msg-upload-reducer'
import msgSearchReducer from './msg-search-reducer'
import msgAllowanceReducer from './msg-allowance-reducer'

const msgReducers = combineReducers({
	player:msgPlayerReducer,
	buy:msgBuyReducer,
	captcha:msgCaptchaReducer,
	upload:msgUploadReducer,
	search:msgSearchReducer,
	allowance:msgAllowanceReducer,
})

export default msgReducers;