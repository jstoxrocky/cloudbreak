import axios from 'axios'
import {web3, getUserAddress, sign} from '../utils/blockchain'
import {BASE_URL} from '../utils/endpoints'


export const CAPTCHA_GET = "CAPTCHA_GET";
export const CAPTCHA_GET_PENDING = "CAPTCHA_GET_PENDING";
export const CAPTCHA_GET_FULFILLED = "CAPTCHA_GET_FULFILLED";
export const CAPTCHA_SUBMIT = "CAPTCHA_SUBMIT"
export const CAPTCHA_SUBMIT_PENDING = "CAPTCHA_SUBMIT_PENDING"
export const CAPTCHA_SUBMIT_FULFILLED = "CAPTCHA_SUBMIT_FULFILLED"
export const CAPTCHA_INPUT_VALUE_1 = "CAPTCHA_INPUT_VALUE_1"
export const CAPTCHA_INPUT_VALUE_2 = "CAPTCHA_INPUT_VALUE_2"
export const CAPTCHA_INPUT_TRANSACTION = "CAPTCHA_INPUT_TRANSACTION"
export const CAPTCHA_INPUT_SIGNATURE = "CAPTCHA_INPUT_SIGNATURE"
export const CAPTCHA_SIGN = "CAPTCHA_SIGN"
export const CAPTCHA_SIGN_PENDING = "CAPTCHA_SIGN_PENDING"
export const CAPTCHA_SIGN_FULFILLED = "CAPTCHA_SIGN_FULFILLED"


const api = axios.create({
	withCredentials: true
});


export const getCaptcha = () => {
	return {
		type: CAPTCHA_GET, 
		payload: api.get(BASE_URL+'/question')
	}
}


export const submitCaptcha = (payload) => {
	return {
		type: CAPTCHA_SUBMIT, 
		payload: api.post(BASE_URL+'/answer', {
			payload: payload
		})
	}
}


export const inputCaptchaValue1 = (payload) => {
	return {
		type: CAPTCHA_INPUT_VALUE_1, 
		payload: {
			value_1: payload
		}
	}
}

export const inputCaptchaValue2 = (payload) => {
	return {
		type: CAPTCHA_INPUT_VALUE_2, 
		payload: {
			value_2: payload
		}
	}
}


export const inputCaptchaTransaction = (payload) => {
	return {
		type: CAPTCHA_INPUT_TRANSACTION, 
		payload: {
			txHash: payload
		}
	}
}


export const signAndSubmitCaptchaTransaction = (value) => ({
	type: CAPTCHA_SIGN,
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