import {web3} from '../utils/blockchain'
import {Tokens, PLAYER_ADDRESS, BASIC_OPTIONS} from "../utils/contracts"

export const APPROVE_INPUT = "APPROVE_INPUT"
export const APPROVE_SUBMIT = "APPROVE_SUBMIT"
export const APPROVE_SUBMIT_PENDING = "APPROVE_SUBMIT_PENDING"
export const APPROVE_SUBMIT_FULFILLED = "APPROVE_SUBMIT_FULFILLED"

const getUserAddress = () => web3.eth.getAccounts()
const getServiceAllowance = (owner, spender) => Tokens.methods.allowance(owner, spender).call()
const approve = (user, value) => {
	BASIC_OPTIONS.from = user
	return Tokens.methods.approve(PLAYER_ADDRESS, value).send(BASIC_OPTIONS);
}

async function approveAndUpdateBalance(value) {
	let users = await getUserAddress();
	let user = users[0];
	let receipt = await approve(user, value)
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
		type: APPROVE_SUBMIT,
		payload: approveAndUpdateBalance(tokens),
	}
}

export const inputApprove = (tokens) => {
	return {
		type: APPROVE_INPUT, 
		payload: tokens,
	}
}




