import axios from 'axios'
import {web3, getUserAddress, sign} from '../utils/blockchain'
import {BASE_URL} from '../utils/endpoints'

export const UPLOAD_GET = "UPLOAD_GET";
export const UPLOAD_INPUT_HASH = "UPLOAD_INPUT_HASH"
export const UPLOAD_INPUT_ARTIST = "UPLOAD_INPUT_ARTIST"
export const UPLOAD_INPUT_TITLE = "UPLOAD_INPUT_TITLE"
export const UPLOAD_INPUT_TRANSACTION = "UPLOAD_INPUT_TRANSACTION"
export const UPLOAD_SUBMIT = "UPLOAD_SUBMIT"
export const UPLOAD_SUBMIT_PENDING = "UPLOAD_SUBMIT_PENDING"
export const UPLOAD_SUBMIT_FULFILLED = "UPLOAD_SUBMIT_FULFILLED"
export const UPLOAD_SIGN = "UPLOAD_SIGN"
export const UPLOAD_SIGN_PENDING = "UPLOAD_SIGN_PENDING"
export const UPLOAD_SIGN_FULFILLED = "UPLOAD_SIGN_FULFILLED"

const api = axios.create({
	withCredentials: true
});


export const getUpload = () => {
	return {
		type: UPLOAD_GET, 
	}
}

export const inputUploadHash = (payload) => {
	return {
		type: UPLOAD_INPUT_HASH, 
		payload: {
			trackHash: payload
		}
	}
}

export const inputUploadArtist = (payload) => {
	return {
		type: UPLOAD_INPUT_ARTIST, 
		payload: {
			artist: payload
		}
	}
}

export const inputUploadTitle = (payload) => {
	return {
		type: UPLOAD_INPUT_TITLE, 
		payload: {
			title: payload
		}
	}
}

export const inputUploadTransaction = (payload) => {
	return {
		type: UPLOAD_INPUT_TRANSACTION, 
		payload: {
			txHash: payload
		}
	}
}

export const submitUpload = (payload) => {
	return {
		type: UPLOAD_SUBMIT, 
		payload: api.post(BASE_URL+'/upload', {
			payload: payload,
		})
	}
}

export const signAndSubmitUploadTransaction = (value) => ({
	type: UPLOAD_SIGN,
	payload: getUserAddress().then((receipt) => {
		const user = receipt[0]
		const valueHash = web3.utils.asciiToHex(value)
		return sign(valueHash, user)
	}).then((receipt) => {
		return api.post(BASE_URL+'/tx/upload', {
			payload: {
				txhash: value,
				signature: receipt,
			}
		})
	})
})