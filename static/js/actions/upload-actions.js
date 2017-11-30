import axios from 'axios'
import {web3, getUserAddress, sign} from '../utils/blockchain'

const api = axios.create({
	withCredentials: true
});


export const getUpload = () => {
	return {
		type: "GET_UPLOAD", 
	}
}

export const inputUploadHash = (payload) => {
	return {
		type: "INPUT_UPLOAD_HASH", 
		payload: {
			trackHash: payload
		}
	}
}

export const inputUploadArtist = (payload) => {
	return {
		type: "INPUT_UPLOAD_ARTIST", 
		payload: {
			artist: payload
		}
	}
}

export const inputUploadTitle = (payload) => {
	return {
		type: "INPUT_UPLOAD_TITLE", 
		payload: {
			title: payload
		}
	}
}

export const inputUploadTransaction = (payload) => {
	return {
		type: "INPUT_UPLOAD_TRANSACTION", 
		payload: {
			txHash: payload
		}
	}
}

export const submitUpload = (payload) => {
	return {
		type: "SUBMIT_UPLOAD", 
		payload: api.post('http://localhost:5000/upload', {
			payload: payload,
		})
	}
}

export const signAndSubmitUploadTransaction = (value) => ({
	type: "SIGN_AND_SUBMIT_UPLOAD",
	payload: getUserAddress().then((receipt) => {
		const user = receipt[0]
		const valueHash = web3.utils.asciiToHex(value)
		return sign(valueHash, user)
	}).then((receipt) => {
		return api.post('http://localhost:5000/tx/upload', {
			payload: {
				txhash: value,
				signature: receipt,
			}
		})
	})
})