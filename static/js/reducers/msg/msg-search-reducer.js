import merge from 'lodash/merge';
import {
	SEARCH_PENDING,
	SEARCH_FULFILLED, 
} from '../../actions/search-actions';
import { LOADING } from '../../utils/reports'

const initialState = {
	value:null,
	visible:false,
	level:null,
}

function msgSearchReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		case SEARCH_PENDING:
			var nextState = merge({}, state);
			nextState.value = LOADING;
			nextState.visible = true;
			nextState.level = 'alert-info'
			return nextState

		case SEARCH_FULFILLED:
			var nextState = merge({}, state);
			nextState.value = action.payload.data.msg.value;
			nextState.visible = action.payload.data.msg.visible;
			nextState.level = action.payload.data.msg.level
			return nextState
		default:
			return state;
	}
}


export default msgSearchReducer;