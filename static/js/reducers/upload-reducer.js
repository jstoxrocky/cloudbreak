import merge from 'lodash/merge';
import {
	UPLOAD_INPUT_HASH,
	UPLOAD_INPUT_ARTIST,
	UPLOAD_INPUT_TITLE,
	UPLOAD_INPUT_TRANSACTION,
	UPLOAD_GET,
	UPLOAD_SUBMIT_FULFILLED,
	UPLOAD_SIGN_FULFILLED,
} from '../actions/upload-actions'

const initialUpload = {
	data: { 
		upload: null,
		tx_upload: null,
	},
	submission: {
		trackHash: null,
		artist: null,
		title: null,
    },
    transaction: {
    	txHash: null,
    },
	currentStage: null,
}

export default function uploadReducer(state=initialUpload, action) {
	Object.freeze(state);
	switch (action.type) {
		case UPLOAD_INPUT_HASH: {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case UPLOAD_INPUT_ARTIST: {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case UPLOAD_INPUT_TITLE: {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case UPLOAD_INPUT_TRANSACTION: {
			let nextState = merge({}, state);
			nextState.transaction = merge({}, nextState.transaction, action.payload)
			return nextState
		}
		case UPLOAD_GET: {
			let nextState = merge({}, state, {
				currentStage: 'UPLOAD_PAGE_LANDED',
			});
			return nextState
		}
		case UPLOAD_SUBMIT_FULFILLED: {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				currentStage: action.payload.data.data.upload ? 'UPLOAD' : 'UPLOAD_PAGE_LANDED',
			});
			return nextState
		}
		case UPLOAD_SIGN_FULFILLED: {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				currentStage: action.payload.data.data.tx_upload ? 'TX_UPLOAD' : 'UPLOAD',
			});
			return nextState
		}
		default:
			return state
	}
}