import { combineReducers } from "redux";
import tokensReducer from "./tokens-reducer";
import userReducer from "./user-reducer";
import currentTrackReducer from "./current-track-reducer"
import streamReducer from "./stream-reducer"
import radioReducer from "./radio-reducer"


const reducers = combineReducers({
	// tokens: tokensReducer,
	user: userReducer,
	// currentTrack: currentTrackReducer,
	stream: streamReducer, 
	radio: radioReducer,
})

export default reducers;