import axios from 'axios'
import {web3, getUserAddress, sign} from '../utils/blockchain'
import {BASE_URL} from '../utils/endpoints'


const api = axios.create({
	withCredentials: true
});


export const getCaptcha = () => {
	return {
		type: "GET_CAPTCHA", 
		payload: api.get(BASE_URL+'/question')
	}
}


export const submitCaptcha = (payload) => {
	return {
		type: "SUBMIT_CAPTCHA", 
		payload: api.post(BASE_URL+'/answer', {
			payload: payload
		})
	}
}


export const inputCaptchaValue1 = (payload) => {
	return {
		type: "INPUT_CAPTCHA_VALUE_1", 
		payload: {
			value_1: payload
		}
	}
}

export const inputCaptchaValue2 = (payload) => {
	return {
		type: "INPUT_CAPTCHA_VALUE_2", 
		payload: {
			value_2: payload
		}
	}
}


export const inputCaptchaTransaction = (payload) => {
	return {
		type: "INPUT_CAPTCHA_TRANSACTION", 
		payload: {
			txHash: payload
		}
	}
}

export const inputCaptchaSignature = (payload) => {
	return {
		type: "INPUT_CAPTCHA_SIGNATURE", 
		payload: {
			signature: payload
		}
	}
}


export const signAndSubmitCaptchaTransaction = (value) => ({
	type: "SIGN_AND_SUBMIT_CAPTCHA",
	payload: getUserAddress().then((receipt) => {
		const user = receipt[0]
		const valueHash = web3.utils.asciiToHex(value)
		return sign(valueHash, user)
	}).then((receipt) => {
		return api.post(BASE_URL+'/tx/captcha', {
			payload: {
				txhash: value,
				signature: receipt,
			}
		})
	})
})