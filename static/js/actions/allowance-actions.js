import {web3} from '../utils/blockchain'
import {Tokens, PLAYER_ADDRESS, BASIC_OPTIONS, NETWORK} from "../utils/contracts"
import {requireNumeric} from '../utils/modifiers'
import {requireMetamask, handleMetamaskRejection} from '../utils/metamask'
import merge from 'lodash/merge';
import {
	tx_success, 
	tx_fail, } from '../utils/reports'

export const ALLOWANCE_WITHDRAW_INPUT = "ALLOWANCE_WITHDRAW_INPUT"
export const ALLOWANCE_WITHDRAW_SUBMIT = "ALLOWANCE_WITHDRAW_SUBMIT"
export const ALLOWANCE_APPROVE_INPUT = "ALLOWANCE_APPROVE_INPUT"
export const ALLOWANCE_APPROVE_SUBMIT = "ALLOWANCE_APPROVE_SUBMIT"

export const ALLOWANCE_WITHDRAW_INPUT_PENDING = "ALLOWANCE_WITHDRAW_INPUT_PENDING"
export const ALLOWANCE_WITHDRAW_SUBMIT_PENDING = "ALLOWANCE_WITHDRAW_SUBMIT_PENDING"
export const ALLOWANCE_APPROVE_INPUT_PENDING = "ALLOWANCE_APPROVE_INPUT_PENDING"
export const ALLOWANCE_APPROVE_SUBMIT_PENDING = "ALLOWANCE_APPROVE_SUBMIT_PENDING"

export const ALLOWANCE_WITHDRAW_INPUT_FULFILLED = "ALLOWANCE_WITHDRAW_INPUT_FULFILLED"
export const ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED = "ALLOWANCE_WITHDRAW_SUBMIT_FULFILLED"
export const ALLOWANCE_APPROVE_INPUT_FULFILLED = "ALLOWANCE_APPROVE_INPUT_FULFILLED"
export const ALLOWANCE_APPROVE_SUBMIT_FULFILLED = "ALLOWANCE_APPROVE_SUBMIT_FULFILLED"

export const ALLOWANCE_WITHDRAW_INPUT_REJECTED = "ALLOWANCE_WITHDRAW_INPUT_REJECTED"
export const ALLOWANCE_WITHDRAW_SUBMIT_REJECTED = "ALLOWANCE_WITHDRAW_SUBMIT_REJECTED"
export const ALLOWANCE_APPROVE_INPUT_REJECTED = "ALLOWANCE_APPROVE_INPUT_REJECTED"
export const ALLOWANCE_APPROVE_SUBMIT_REJECTED = "ALLOWANCE_APPROVE_SUBMIT_REJECTED"

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
const decreaseAllowance = (user, value) => {
	BASIC_OPTIONS.from = user
	return Tokens.methods.decreaseApproval(PLAYER_ADDRESS, value).send(BASIC_OPTIONS);
}

async function approveAndUpdateBalance(tokens) {
	await requireMetamask(NETWORK)
	requireNumeric(tokens)

	let [user] = await getUserAddress();
	let serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	let addAllowance = (serviceAllowance > 0) ? increaseApproval: approve
	let safeAddAllowance = handleMetamaskRejection(addAllowance)
	let receipt = await safeAddAllowance(user, tokens)
	let status = !!web3.utils.hexToNumber(receipt.status)
	let msg = status ? tx_success: tx_fail
	serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	let payload = merge({'serviceAllowance':serviceAllowance}, msg)
	return payload
}

async function withdrawAndUpdateBalance(tokens) {
	await requireMetamask(NETWORK)
	requireNumeric(tokens)

	let [user] = await getUserAddress();
	let safeDecreaseAllowance = handleMetamaskRejection(decreaseAllowance)
	let receipt = await safeDecreaseAllowance(user, tokens)
	let status = !!web3.utils.hexToNumber(receipt.status)
	let msg = status ? tx_success: tx_fail
	let serviceAllowance = await getServiceAllowance(user, PLAYER_ADDRESS);
	let payload = merge({'serviceAllowance':serviceAllowance}, msg)
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
		payload: new Promise((resolve, reject) => {
			requireNumeric(tokens)
			resolve({tokens:tokens})
		}),
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
		payload: new Promise((resolve, reject) => {
			requireNumeric(tokens)
			resolve({tokens:tokens})
		}),
	}
}




