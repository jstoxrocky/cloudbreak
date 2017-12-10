import { combineReducers } from "redux";
import streamReducer from "./stream-reducer"
import captchaReducer from "./captcha-reducer";
import uploadReducer from "./upload-reducer";
import searchReducer from "./search-reducer";
import navReducer from "./nav-reducer";
import buyReducer from "./buy-reducer";
 
const reducers = combineReducers({
	stream: streamReducer, 
	search: searchReducer,
	captcha: captchaReducer,
	nav: navReducer,
	upload: uploadReducer,
	buy: buyReducer,
})

export default reducers;