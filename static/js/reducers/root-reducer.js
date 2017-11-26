import { combineReducers } from "redux";
import tokensReducer from "./tokens-reducer";
import userReducer from "./user-reducer";
import currentTrackReducer from "./current-track-reducer"
import streamReducer from "./stream-reducer"


const reducers = combineReducers({
	// tokens: tokensReducer,
	user: userReducer,
	// currentTrack: currentTrackReducer,
	stream: streamReducer, 
})

export default reducers;