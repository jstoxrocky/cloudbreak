import React from 'react';
import { default as Web3} from 'web3';

var web3 = new Web3(Web3.givenProvider);
const TOKENS_ADDRESS = '0x3346d5163d5101ccc5a0d600d0d1d48b08907310'
const TOKENS_ABI = [{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"incrementTokenBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setPlayerAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"decrementTokenBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var Tokens = new web3.eth.Contract(TOKENS_ABI, TOKENS_ADDRESS)

class BalanceTokens extends React.Component {

	constructor() {
		super();
		this.state = {balanceTokens: 0};
	}

	componentDidMount() {
		
		web3.eth.getAccounts()
			.then(receipt => {
				const user = receipt[0];
				this.setState({user: user});
				return Tokens.methods.getTokenBalance(this.state.user).call()
			})
			.then(receipt => {
				var balanceTokens = receipt;
				this.setState({balanceTokens: balanceTokens});
			})
		}

	render() {
		return (
			<h3>Token Balance: {this.state.balanceTokens}</h3>
		)
	}
};

export default BalanceTokens;