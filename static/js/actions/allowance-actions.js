import {web3} from '../utils/blockchain'
import {Tokens, PLAYER_ADDRESS, BASIC_OPTIONS} from "../utils/contracts"

export const ALLOWANCE_APPROVE_INPUT = "ALLOWANCE_APPROVE_INPUT"
export const ALLOWANCE_WITHDRAW_INPUT = "ALLOWANCE_WITHDRAW_INPUT"
export const ALLOWANCE_APPROVE_SUBMIT = "ALLOWANCE_APPROVE_SUBMIT"
export const ALLOWANCE_APPROVE_SUBMIT_PENDING = "ALLOWANCE_APPROVE_SUBMIT_PENDING"
export const ALLOWANCE_APPROVE_SUBMIT_FULFILLED = "ALLOWANCE_APPROVE_SUBMIT_FULFILLED"
export const ALLOWANCE_WITHDRAW_SUBMIT = "ALLOWANCE_WITHDRAW_SUBMIT"
export const ALLOWANCE_WITHDRAW_SUBMIT_PENDING = "ALLOWANCE_WITHDRAW_SUBMIT_PENDING"
export const ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED = "ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED"
export const ALLOWANCE_APPROVE_SUBMIT_REJECTED = "ALLOWANCE_APPROVE_SUBMIT_REJECTED"
export const ALLOWANCE_WITHDRAW_SUBMIT_REJECTED = "ALLOWANCE_APPROVE_SUBMIT_REJECTED"

const getUserAddress = () => web3.eth.getAccounts()
const getServiceAllowance = (owner, spender) => Tokens.methods.allowance(owner, spender).call()
const approve = (user, value) => {
	BASIC_OPTIONS.from = user
	return Tokens.methods.approve(PLAYER_ADDRESS, value).send(BASIC_OPTIONS);
}
const increaseApproval = (user, value) => {
	BASIC_OPTIONS.from = user
	return Tokens.methods.increaseApproval(PLAYER_ADDRESS, value).send(BASIC_OPTIONS);
}
const decreaseApproval = (user, value) => {
	BASIC_OPTIONS.from = user
	return Tokens.methods.decreaseApproval(PLAYER_ADDRESS, value).send(BASIC_OPTIONS);
}

function checkNumeric(tokens) {

	let payload = {
		tokens:tokens,
	}

	if (isNaN(tokens)) {
		payload.visible = true
		payload.msg = "Value must be numeric"
		payload.level = 'alert-warning'
		return payload
	} 

	if (tokens == "") {
		payload.visible = false
		payload.msg = null
		payload.level = 'alert-warning'
		return payload
	} 

	return payload
}

async function approveAndUpdateBalance(value) {

	let users = await getUserAddress();
	let user = users[0];
	let serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	let addAllowance = (serviceAllowance > 0) ? increaseApproval: approve
	let payload = {
		serviceAllowance: serviceAllowance,
	}

	if (isNaN(value)) {
		payload.visible = true
		payload.msg = "Value must be numeric"
		payload.level = 'alert-warning'
		return payload
	}

	if (value == "" || value == null || value <= 0) {
		payload.visible = true
		payload.msg = "Value must be non-zero"
		payload.level = 'alert-warning'
		return payload
	} 
	
	try {
		let receipt = await addAllowance(user, value)
		let status = !!web3.utils.hexToNumber(receipt.status)
		payload.visible = true
		payload.msg = status ? 'Successful approval': 'Transaction failed'
		payload.level = status ? 'alert-success': 'alert-danger'
	} catch(err) {
		payload.visible = true
		payload.msg = 'Transaction rejected by user'
		payload.level = 'alert-danger'
	}
	serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	payload.serviceAllowance = serviceAllowance
	return payload
}

async function withdrawAndUpdateBalance(value) {

	console.log(value)

	let users = await getUserAddress();
	let user = users[0];
	let serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	let payload = {
		serviceAllowance: serviceAllowance,
	}

	if (isNaN(value)) {
		payload.visible = true
		payload.msg = "Value must be numeric"
		payload.level = 'alert-warning'
		return payload
	}

	if (value == "" || value == null || value <= 0) {
		payload.visible = true
		payload.msg = "Value must be non-zero"
		payload.level = 'alert-warning'
		return payload
	} 

	try {
		let receipt = await decreaseApproval(user, value)
		let status = !!web3.utils.hexToNumber(receipt.status)
		payload.visible = true
		payload.msg = status ? 'Successful withdrawl': 'Transaction failed'
		payload.level = status ? 'alert-success': 'alert-danger'
	} catch(err) {
		payload.visible = true
		payload.msg = 'Transaction rejected by user'
		payload.level = 'alert-danger'
	}

	serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	payload.serviceAllowance = serviceAllowance
	return payload
}

export const submitApprove = (tokens) => {
	return {
		type: ALLOWANCE_APPROVE_SUBMIT,
		payload: approveAndUpdateBalance(tokens),
	}
}

export const inputApprove = (tokens) => {
	return {
		type: ALLOWANCE_APPROVE_INPUT, 
		payload: checkNumeric(tokens),
	}
}

export const submitWithdraw = (tokens) => {
	return {
		type: ALLOWANCE_WITHDRAW_SUBMIT,
		payload: withdrawAndUpdateBalance(tokens),
	}
}

export const inputWithdraw = (tokens) => {
	return {
		type: ALLOWANCE_WITHDRAW_INPUT, 
		payload: checkNumeric(tokens),
	}
}




