import React from 'react';
import { connect } from "react-redux";

@connect(({balance}) => {
	return {
		userBalance: balance.userBalance,
		serviceAllowance: balance.serviceAllowance,
	};
})
class Explanation extends React.Component {  
	render() {
		const {userBalance, serviceAllowance} = this.props;
		return (
			<div className="container">
				<div className="row">
					You own {userBalance} token{(userBalance!=1) ? 's': ''}, 
					and Cloudbreak is approved to spend {serviceAllowance} of them.
				</div>
				<div className="row">
					To stream tracks you need pay with tokens.
				</div>
				<div className="row">
					Cloudbreak can allow withdraw tokens from your account that you've approved it to spend.
				</div>
				<div className="row"> 
					You can earn tokens by completing CAPTCHA problems about music,
					or you can buy tokens from the Cloudbreak. 
				</div>
				<div className="row"> 
					We've given you one free track below.
				</div>
		    </div>
		)
	}
}

export default Explanation;

