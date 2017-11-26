import { combineReducers } from "redux";
import streamReducer from "./stream-reducer"
import radioReducer from "./radio-reducer"
 
const reducers = combineReducers({
	stream: streamReducer, 
	radio: radioReducer,
})

export default reducers;