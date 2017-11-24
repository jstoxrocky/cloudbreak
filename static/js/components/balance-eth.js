import React from 'react';
import { default as Web3} from 'web3';

var web3 = new Web3(Web3.givenProvider);

class BalanceETH extends React.Component {

	constructor() {
		super();
		this.state = {balanceETH: 0};
	}

	componentDidMount() {
		
		web3.eth.getAccounts()
			.then(receipt => {
				const user = receipt[0];
				this.setState({user: user});
				return web3.eth.getBalance(this.state.user)
			})
			.then(receipt => {
				var balanceETH = web3.utils.fromWei(receipt);
				this.setState({balanceETH: balanceETH});
			})
		}

	render() {
		return (
			<h3>ETH Balance: {this.state.balanceETH}</h3>
		)
	}
};

export default BalanceETH;