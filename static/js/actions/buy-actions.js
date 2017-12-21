import {web3} from '../utils/blockchain'
import {Crowdsale, Tokens, Constants, BASIC_OPTIONS, NETWORK} from "../utils/contracts"
import {requireNumeric} from '../utils/modifiers'
import {requireMetamask, handleMetamaskRejection} from '../utils/metamask'
import merge from 'lodash/merge';
import {
	tx_success, 
	tx_fail, } from '../utils/reports'

export const BUY_INPUT = "BUY_INPUT"
export const BUY_INPUT_PENDING = "BUY_INPUT_PENDING";
export const BUY_INPUT_FULFILLED = "BUY_INPUT_FULFILLED";
export const BUY_SUBMIT = "BUY_SUBMIT"
export const BUY_SUBMIT_PENDING = "BUY_SUBMIT_PENDING";
export const BUY_SUBMIT_FULFILLED = "BUY_SUBMIT_FULFILLED";
export const BUY_SUBMIT_REJECTED = "BUY_SUBMIT_REJECTED"
export const BUY_INPUT_REJECTED = "BUY_INPUT_REJECTED"

const getUserAddress = () => web3.eth.getAccounts()
const getUserBalance = (user) => Tokens.methods.balanceOf(user).call()
const getWeiPerTokens = () => Constants.methods.weiPerTokens().call()
const buyTokens = (user, wei) => {
	BASIC_OPTIONS.from = user
	BASIC_OPTIONS.value = wei
	return Crowdsale.methods.buyTokens(user).send(BASIC_OPTIONS)
}

async function convertEthToTokens(tokens) {
	requireNumeric(tokens)
	let weiPerTokens = await getWeiPerTokens()
	let wei = tokens*weiPerTokens
	let eth = web3.utils.fromWei(wei.toString())
	return {
		wei:wei,
		eth:eth,
	}
}

async function buyAndUpdateBalance(wei) {
	await requireMetamask(NETWORK)
	requireNumeric(wei)

	let [user] = await getUserAddress()
	let safeBuyTokens = handleMetamaskRejection(buyTokens)
	let receipt = await safeBuyTokens(user, wei)
	let status = !!web3.utils.hexToNumber(receipt.status)
	let msg = status ? tx_success: tx_fail
	let userBalance = await getUserBalance(user)
	let payload = merge({'userBalance':userBalance}, msg)
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






