import merge from 'lodash/merge';
import { 
	PLAYER_STREAM_PENDING, 
	PLAYER_STREAM_FULFILLED,
	PLAYER_UPDATE_PENDING, 
	PLAYER_UPDATE_FULFILLED, 
	PLAYER_STREAM_REJECTED,
	PLAYER_UPDATE_REJECTED,
} from '../../actions/player-actions';
import { LOADING } from '../../utils/reports'

const initialState = {
	value:null,
	visible:false,
	level:null,
}

function msgPlayerReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		case PLAYER_STREAM_PENDING:
		case PLAYER_UPDATE_PENDING:
			var nextState = merge({}, state);
			nextState.value = LOADING;
			nextState.visible = true;
			nextState.level = 'alert-info'
			return nextState

		case PLAYER_STREAM_REJECTED:
		case PLAYER_UPDATE_REJECTED:
			var nextState = merge({}, state);
			nextState.value = action.payload.msg;
			nextState.visible = action.payload.visible;
			nextState.level = action.payload.level;
			return nextState

		case PLAYER_STREAM_FULFILLED:
		case PLAYER_UPDATE_FULFILLED:
			var nextState = merge({}, state);
			nextState.value = action.payload.msg;
			nextState.visible = action.payload.visible;
			nextState.level = action.payload.level
			return nextState
		default:
			return state;
	}
}


export default msgPlayerReducer;