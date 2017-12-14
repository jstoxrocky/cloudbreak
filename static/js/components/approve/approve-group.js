import React from 'react';
import { connect } from "react-redux";
import ActionableInput from '../utils/actionable-input';
import ActionableSubmit from '../utils/actionable-submit';
import { inputApprove, submitApprove } from "../../actions/approve-actions"
import {web3} from '../../utils/blockchain'


@connect(({approve}) => {
	return {
		tokens: approve.tokens,
	};
})
export default class ApproveGroup extends React.Component {  

	render() {
		const {tokens} = this.props;
		return (
			<div className="container">
				<div className="row top-buffer">
					<h3>Approve Tokens</h3>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputApprove} placeholder={'ETH'} />
						<ActionableSubmit action={submitApprove} data={tokens} />
					</div>
				</div>
            </div>
		)
	}
}