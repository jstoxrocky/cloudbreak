import { combineReducers } from "redux";
import basicReducer from "./basic-reducer";


const reducers = combineReducers({
	basic: basicReducer,
})

export default reducers;