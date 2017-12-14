import {web3} from '../utils/blockchain'
import {Tokens, PLAYER_ADDRESS, GAS, GAS_PRICE} from "../utils/contracts"

export const APPROVE_INPUT = "APPROVE_INPUT"
export const APPROVE_SUBMIT = "APPROVE_SUBMIT"
export const APPROVE_SUBMIT_PENDING = "APPROVE_SUBMIT_PENDING"
export const APPROVE_SUBMIT_FULFILLED = "APPROVE_SUBMIT_FULFILLED"

const getUserAddress = () => web3.eth.getAccounts()
const getServiceApproved = (owner, spender) => Tokens.methods.allowance(owner, spender).call()

async function approveTokens(value) {
	let users = await getUserAddress();
	let user = users[0];
	const options = {
		gas: GAS,
		gasPrice: GAS_PRICE,
		from: user,
	}
	let receipt = await Tokens.methods.approve(PLAYER_ADDRESS, value).send(options);
	let serviceAllowance = await getServiceApproved(user, PLAYER_ADDRESS);
	return {
		receipt: receipt,
		serviceAllowance: serviceAllowance,
	}
}

export const submitApprove = (tokens) => {
	return {
		type: APPROVE_SUBMIT,
		payload: approveTokens(tokens),
	}
}

export const inputApprove = (tokens) => {
	return {
		type: APPROVE_INPUT, 
		payload: tokens,
	}
}




