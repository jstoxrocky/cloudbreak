import merge from 'lodash/merge';
import {
	UPLOAD_SUBMIT_PENDING, 
	UPLOAD_SUBMIT_FULFILLED,
	UPLOAD_SIGN_PENDING,
	UPLOAD_SIGN_FULFILLED,
} from '../../actions/upload-actions'
import { LOADING } from '../../utils/reports'

const initialState = {
	value:null,
	visible:false,
	level:null,
}

function msgUploadReducer(state=initialState, action) {
	Object.freeze(state);
	switch (action.type) { 

		case UPLOAD_SUBMIT_PENDING:
		case UPLOAD_SIGN_PENDING:
			var nextState = merge({}, state);
			nextState.value = LOADING;
			nextState.visible = true;
			nextState.level = 'alert-info'
			return nextState

		case UPLOAD_SUBMIT_FULFILLED:
		case UPLOAD_SIGN_FULFILLED:
			var nextState = merge({}, state);
			nextState.value = action.payload.data.msg.value;
			nextState.visible = action.payload.data.msg.visible;
			nextState.level = action.payload.data.msg.level
			return nextState
		default:
			return state;
	}
}


export default msgUploadReducer;