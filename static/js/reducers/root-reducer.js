import { combineReducers } from "redux";
import playerReducer from "./player-reducer"
import captchaReducer from "./captcha-reducer";
import uploadReducer from "./upload-reducer";
import searchReducer from "./search-reducer";
import navReducer from "./nav-reducer";
import buyReducer from "./buy-reducer";
import msgReducer from "./msg-reducer";
import balanceReducer from "./balance-reducer";
import approveReducer from "./approve-reducer"
 
const reducers = combineReducers({
	player: playerReducer, 
	search: searchReducer,
	captcha: captchaReducer,
	nav: navReducer,
	upload: uploadReducer,
	buy: buyReducer,
	approve: approveReducer,
	msg: msgReducer,
	balance: balanceReducer,
})

export default reducers;