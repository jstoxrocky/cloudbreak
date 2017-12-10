import React from 'react';
import { connect } from "react-redux";
import ActionableInput from '../utils/actionable-input';
import ActionableSubmit from '../utils/actionable-submit';
import { inputBuy, submitBuy } from "../../actions/buy-actions"
import {web3} from '../../utils/blockchain'


@connect(({buy}) => {
	return {
		wei: buy.wei,
		tokens: buy.tokens,
	};
})
export default class BuyGroup extends React.Component {  

	render() {
		const {wei, tokens} = this.props;
		return (
			<div className="container">
				<div className="row top-buffer">
					<h3>Buy Tokens</h3>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputBuy} placeholder={'ETH'} />
						<ActionableSubmit action={submitBuy} data={wei} />
						{Math.floor(tokens)} Tokens 
					</div>
				</div>
            </div>
		)
	}
}