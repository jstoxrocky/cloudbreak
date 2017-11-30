import merge from 'lodash/merge';

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
	msg: null,
	currentStage: null,
}

export default function uploadReducer(state=initialUpload, action) {
	Object.freeze(state);
	switch (action.type) {
		case "INPUT_UPLOAD_HASH": {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case "INPUT_UPLOAD_ARTIST": {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case "INPUT_UPLOAD_TITLE": {
			let nextState = merge({}, state);
			nextState.submission = merge({}, nextState.submission, action.payload)
			return nextState
		}
		case "INPUT_UPLOAD_TRANSACTION": {
			let nextState = merge({}, state);
			nextState.transaction = merge({}, nextState.transaction, action.payload)
			return nextState
		}
		case "GET_UPLOAD": {
			let nextState = merge({}, state, {
				currentStage: 'UPLOAD_PAGE_LANDED',
			});
			return nextState
		}
		case "SUBMIT_UPLOAD_PENDING": {
			let nextState = merge({}, state, {
				msg: "Checking Upload...",
			});
			return nextState
		}
		case "SUBMIT_UPLOAD_FULFILLED": {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				msg: action.payload.data.msg,
				currentStage: action.payload.data.data.upload ? 'UPLOAD' : 'UPLOAD_PAGE_LANDED',
			});
			return nextState
		}
		case "SIGN_AND_SUBMIT_UPLOAD_PENDING": {
			let nextState = merge({}, state, {
				msg: "Loading...",
			});
			return nextState
		}
		case "SIGN_AND_SUBMIT_UPLOAD_FULFILLED": {
			let nextState = merge({}, state, {
				data: action.payload.data.data,
				msg: action.payload.data.msg,
				currentStage: action.payload.data.data.tx_upload ? 'TX_UPLOAD' : 'UPLOAD',
			});
			return nextState
		}
		default:
			return state
	}
}