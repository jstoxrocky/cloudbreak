import React from 'react';
import { connect } from "react-redux";
import ActionableInput from '../utils/actionable-input';
import ActionableSubmit from '../utils/actionable-submit';
import { inputBuy, submitBuy } from "../../actions/buy-actions"
import {web3} from '../../utils/blockchain'


@connect(({buy}) => {
	return {
		wei: buy.wei,
		eth: buy.eth,
	};
})
export default class BuyGroup extends React.Component {  

	render() {
		const {wei, eth} = this.props;
		return (
			<div className="container">
				<div className="row top-buffer">
					<h3>Buy Tokens</h3>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputBuy} placeholder={'Number of tokens'} />
						<ActionableSubmit action={submitBuy} data={wei} />
						{eth} ETH 
					</div>
				</div>
            </div>
		)
	}
}