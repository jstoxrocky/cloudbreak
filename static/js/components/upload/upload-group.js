import React from 'react';
import { connect } from "react-redux";
import ActionableInput from '../utils/actionable-input';
import ActionableSubmit from '../utils/actionable-submit';
import { inputUploadHash, inputUploadArtist, inputUploadTitle, submitUpload } from "../../actions/upload-actions"


@connect(({upload}) => {
	return {
		submission: upload.submission,
	};
})
export default class UploadGroup extends React.Component {  

	render() {
		const {submission} = this.props;
		return (
			<div className="container">
				<div className="row top-buffer">
					<h3>Enter Your Track's Metadata and IPFS Hash</h3>
				</div>
				<div className="row top-buffer">
					<div className="col-md-9">
						<ActionableInput action={inputUploadHash} placeholder={'IPFS Hash'} />
						<ActionableInput action={inputUploadArtist} placeholder={'Artist'} />
						<ActionableInput action={inputUploadTitle} placeholder={'Title'} />
						<ActionableSubmit action={submitUpload} data={submission} />
					</div>
				</div>
            </div>
		)
	}
}