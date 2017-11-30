import React from 'react';
import { connect } from "react-redux";
import { getTokenBalance } from '../actions/player-actions'

@connect(({stream}) => {
	return {
		balance: stream.balance,
	};
})
class TokensBalance extends React.Component {

	render() {
		const {balance} = this.props;
		return (
			<h5 className='balance'>{balance} tokens remaining</h5>
		)
	}
};

export default TokensBalance;