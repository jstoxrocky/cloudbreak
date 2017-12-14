import {web3} from '../utils/blockchain'
import {Crowdsale, Tokens, Constants, BASIC_OPTIONS} from "../utils/contracts"

export const BUY_INPUT = "BUY_INPUT"
export const BUY_INPUT_PENDING = "BUY_INPUT_PENDING";
export const BUY_INPUT_FULFILLED = "BUY_INPUT_FULFILLED";
export const BUY_SUBMIT = "BUY_SUBMIT"
export const BUY_SUBMIT_PENDING = "BUY_SUBMIT_PENDING";
export const BUY_SUBMIT_FULFILLED = "BUY_SUBMIT_FULFILLED";

const getUserAddress = () => web3.eth.getAccounts()
const getUserBalance = (user) => Tokens.methods.balanceOf(user).call()
const getWeiPerTokens = () => Constants.methods.weiPerTokens().call()
const buyTokens = (user, wei) => {
	BASIC_OPTIONS.from = user
	BASIC_OPTIONS.value = wei
	return Crowdsale.methods.buyTokens(user).send(BASIC_OPTIONS)
}

async function convertEthToTokens(eth) {
	let wei = (eth !== '') ? web3.utils.toWei(eth, 'ether'): 0
	let weiPerTokens = await getWeiPerTokens()
	let tokensPerEth = 1000000000000000000 / weiPerTokens;
	let tokens = tokensPerEth*eth;
	return {
		tokens:tokens,
		wei:wei,
	}
}

async function buyAndUpdateBalance(wei) {
	let users = await getUserAddress()
	let user = users[0]
	let receipt = await buyTokens(user, wei)
	let status = !!web3.utils.hexToNumber(receipt.status)
	let msg = status ? 'Success': 'Transaction failed'
	let balance = await getUserBalance(user)
	return {
		msg: msg,
		userBalance: balance,
	}
}

export const inputBuy = (eth) => ({
	type: BUY_INPUT, 
	payload: convertEthToTokens(eth)
})

export const submitBuy = (wei) => ({
	type: BUY_SUBMIT,
	payload: buyAndUpdateBalance(wei),
})






