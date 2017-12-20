import {web3} from '../utils/blockchain'
import {Crowdsale, Tokens, Constants, BASIC_OPTIONS} from "../utils/contracts"

export const BUY_INPUT = "BUY_INPUT"
export const BUY_INPUT_PENDING = "BUY_INPUT_PENDING";
export const BUY_INPUT_FULFILLED = "BUY_INPUT_FULFILLED";
export const BUY_SUBMIT = "BUY_SUBMIT"
export const BUY_SUBMIT_PENDING = "BUY_SUBMIT_PENDING";
export const BUY_SUBMIT_FULFILLED = "BUY_SUBMIT_FULFILLED";
export const BUY_SUBMIT_REJECTED = "BUY_SUBMIT_REJECTED"

const getUserAddress = () => web3.eth.getAccounts()
const getUserBalance = (user) => Tokens.methods.balanceOf(user).call()
const getWeiPerTokens = () => Constants.methods.weiPerTokens().call()
const buyTokens = (user, wei) => {
	BASIC_OPTIONS.from = user
	BASIC_OPTIONS.value = wei
	return Crowdsale.methods.buyTokens(user).send(BASIC_OPTIONS)
}

async function convertEthToTokens(tokens) {

	let payload = {
		eth:0,
		wei:0,
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

	let weiPerTokens = await getWeiPerTokens()
	let wei = tokens*weiPerTokens
	let eth = web3.utils.fromWei(wei.toString())

	payload.wei = wei
	payload.eth = eth
	return payload
}

async function buyAndUpdateBalance(wei) {

	let users = await getUserAddress()
	let user = users[0]
	let balance = await getUserBalance(user)
	let payload = {
		userBalance: balance,
	}

	if (isNaN(wei)) {
		payload.visible = true
		payload.msg = "Value must be numeric"
		payload.level = 'alert-warning'
		return payload
	}

	if (wei == "" || wei == null || wei <= 0) {
		payload.visible = true
		payload.msg = "Value must be non-zero"
		payload.level = 'alert-warning'
		return payload
	} 

	try {
		let receipt = await buyTokens(user, wei)
		let status = !!web3.utils.hexToNumber(receipt.status)
		payload.visible = true
		payload.msg = status ? 'Success': 'Transaction failed'
		payload.level = status ? 'alert-success': 'alert-danger'
	} catch(err) {
		payload.visible = true
		payload.msg = 'Transaction rejected by user'
		payload.level = 'alert-danger'
	}
	balance = await getUserBalance(user)
	payload.userBalance = balance

	return payload
}

export const inputBuy = (eth) => ({
	type: BUY_INPUT, 
	payload: convertEthToTokens(eth)
})

export const submitBuy = (wei) => ({
	type: BUY_SUBMIT,
	payload: buyAndUpdateBalance(wei),
})






