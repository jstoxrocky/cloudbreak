import {web3} from '../utils/blockchain'
import {Crowdsale, Tokens, Constants, GAS, GAS_PRICE, ZERO_HEX} from "../utils/contracts"


export const BUY_INPUT = "BUY_INPUT"
export const BUY_INPUT_PENDING = "BUY_INPUT_PENDING";
export const BUY_INPUT_FULFILLED = "BUY_INPUT_FULFILLED";
export const BUY_SUBMIT = "BUY_SUBMIT"
export const BUY_SUBMIT_PENDING = "BUY_SUBMIT_PENDING";
export const BUY_SUBMIT_FULFILLED = "BUY_SUBMIT_FULFILLED";


export const inputBuy = (eth) => {
	let wei = 0
	if (eth !== '') {
		wei = web3.utils.toWei(eth, 'ether')
	}
	return {
		type: BUY_INPUT, 
		payload: Constants.methods.weiPerTokens().call().then(weiPerTokens => {
			let tokensPerEth = 1000000000000000000 / weiPerTokens;
			let tokens = tokensPerEth*eth;
			return {
				eth: eth,
				wei: wei,
				tokens: tokens,
			}
		})
	}
}

const _getUserAddress = () => web3.eth.getAccounts()
const _weiPerTokens = () => Constants.methods.weiPerTokens().call()
const _getUserBalance = (user) => Tokens.methods.balanceOf(user).call()

const _buyTokens = (user, wei) => {
	const options = {
		gas: GAS,
		gasPrice: GAS_PRICE,
		from: user,
		value: wei,
	}
	return Crowdsale.methods.buyTokens(user).send(options)
		.catch(function(error){
		    return {'status':'0x0'}
		});
}

export const submitBuy = (wei) => ({
	type: BUY_SUBMIT,
	payload: _submitBuy(wei),
})



const _submitBuy = (wei) => {
	let user = _getUserAddress()
	let purchase = user.then((receipt) => {
		const _user = receipt[0]
		return _buyTokens(_user, wei)
	})
	let userBalance = purchase.then(() => {
		let _user = user.value()[0]
		return _getUserBalance(_user)
	})
	return userBalance.then(() => {
		let purchaseReceipt = purchase.value()
		let status = !!web3.utils.hexToNumber(purchaseReceipt.status)
		let msg = 'Success'
		if (!status) {
			msg = 'Transaction failed'
		}
		let newBalance = userBalance.value()
		let payload = {
			msg:msg,
			userBalance:newBalance,
		}
		return new Promise((resolve, reject) => resolve(payload))
	})
}




