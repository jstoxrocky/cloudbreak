import { combineReducers } from "redux";
import streamReducer from "./stream-reducer"
import searchResultsReducer from "./search-results-reducer"
 
const reducers = combineReducers({
	stream: streamReducer, 
	searchResults: searchResultsReducer,
})

export default reducers;