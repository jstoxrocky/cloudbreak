import { combineReducers } from "redux";
import playerReducer from "./player-reducer"
import captchaReducer from "./captcha-reducer";
import uploadReducer from "./upload-reducer";
import searchReducer from "./search-reducer";
import navReducer from "./nav-reducer";
import buyReducer from "./buy-reducer";
import msgReducers from "./msg/msg-reducer";
import balanceReducer from "./balance-reducer";
import allowanceReducer from "./allowance-reducer"
 
const reducers = combineReducers({
	player: playerReducer, 
	search: searchReducer,
	captcha: captchaReducer,
	nav: navReducer,
	upload: uploadReducer,
	buy: buyReducer,
	allowance: allowanceReducer,
	msg: msgReducers,
	balance: balanceReducer,
})

export default reducers;