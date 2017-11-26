import React from 'react';
import { connect } from "react-redux";
import { getTokenBalance } from '../actions/actions'

@connect(({stream}) => {
	return {
		balance: stream.balance,
	};
})
class TokensBalance extends React.Component {

	componentDidMount() {	
		this.props.dispatch(getTokenBalance());
	}

	render() {
		const {balance} = this.props;
		return (
			<h5 className='balance'>{balance} tokens remaining</h5>
		)
	}
};

export default TokensBalance;