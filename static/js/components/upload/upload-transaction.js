import React from 'react';
import { connect } from "react-redux";
import ActionableSubmit from '../core/actionable-submit'
import ActionableInput from '../core/actionable-input'
import { inputUploadTransaction, inputUploadSignature, signAndSubmitUploadTransaction } from "../../actions/upload-actions"

@connect(({upload}) => {
	return {
		txHash: upload.transaction.txHash,
	}
})
export default class UploadTransaction extends React.Component {   

  	render() {  
  		const {txHash} = this.props;
  		return (
	  		<div className="container">
				<div className="row top-buffer">
					<h3>Upload metadata met was OK</h3>
				</div>
				<div className="row">
					<p>To complete the upload you must send the metadata to the network by means of a transaction</p>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputUploadTransaction} placeholder={'Transaction Hash'}/>
						<ActionableSubmit action={signAndSubmitUploadTransaction} data={txHash} />
					</div>
				</div>
			</div>
  		)
  	}
}