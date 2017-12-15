import React from 'react';
import { connect } from "react-redux";
import ActionableInput from '../utils/actionable-input';
import ActionableSubmit from '../utils/actionable-submit';
import { inputApprove, inputWithdraw, submitApprove, submitWithdraw } from "../../actions/allowance-actions"
import {web3} from '../../utils/blockchain'


@connect(({allowance}) => {
	return {
		approval: allowance.approval,
		withdrawl: allowance.withdrawl,
	};
})
export default class AllowanceGroup extends React.Component {  

	render() {
		const {approval, withdrawl} = this.props;
		return (
			<div className="container">
				<div className="row top-buffer">
					<h3>Approve Tokens</h3>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputApprove} placeholder={'ETH'} />
						<ActionableSubmit action={submitApprove} data={approval} />
					</div>
				</div>
				<div className="row top-buffer">
					<h3>Withdraw Tokens</h3>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputWithdraw} placeholder={'ETH'} />
						<ActionableSubmit action={submitWithdraw} data={withdrawl} />
					</div>
				</div>
            </div>
		)
	}
}