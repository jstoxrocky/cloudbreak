import React from 'react';
import { connect } from "react-redux";
import ActionableSubmit from '../core/actionable-submit'
import ActionableInput from '../core/actionable-input'
import { inputCaptchaTransaction, inputCaptchaSignature,  } from "../../actions/captcha-actions"
import { signAndSubmitCaptchaTransaction } from "../../actions/captcha-actions"

@connect(({captcha}) => {
	return {
		txHash: captcha.transaction.txHash,
	}
})
export default class CaptchaTransaction extends React.Component {   

  	render() {  
  		const {txHash} = this.props;
  		return (
	  		<div className="container">
				<div className="row top-buffer">
					<h3>CAPTCHA was correct</h3>
				</div>
				<div className="row">
					<p>To earn tokens you must submit the data to the network by means of a transaction</p>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputCaptchaTransaction} placeholder={'Transaction Hash'}/>
						<ActionableSubmit action={signAndSubmitCaptchaTransaction} data={txHash} />
					</div>
				</div>
			</div>
  		)
  	}
}