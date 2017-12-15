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

async function approveAndUpdateBalance(value) {
	let users = await getUserAddress();
	let user = users[0];
	let initialServiceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	let addAllowance = (initialServiceAllowance > 0) ? increaseApproval: approve
	let receipt = await addAllowance(user, value)
	let status = !!web3.utils.hexToNumber(receipt.status)
	let msg = status ? 'Success': 'Transaction failed'
	let serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	return {
		msg: msg,
		serviceAllowance: serviceAllowance,
	}
}

async function withdrawAndUpdateBalance(value) {
	let users = await getUserAddress();
	let user = users[0];
	let receipt = await decreaseApproval(user, value)
	let status = !!web3.utils.hexToNumber(receipt.status)
	let msg = status ? 'Success': 'Transaction failed'
	let serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	return {
		msg: msg,
		serviceAllowance: serviceAllowance,
	}
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
		payload: tokens,
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
		payload: tokens,
	}
}




