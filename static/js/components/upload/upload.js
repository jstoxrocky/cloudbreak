import React from 'react';
import { connect } from "react-redux";
import UploadGroup from './upload-group';
import UploadTransaction from './upload-transaction'


@connect(({nav, upload}) => {
	return {
		currentPage: nav.currentPage,
		lastStageCompleted: upload.currentStage,
	}
})
export default class Upload extends React.Component {   

	render() {
  		const {currentPage, lastStageCompleted} = this.props;
  		const onUploadPage = currentPage == 'UPLOAD';
  		const onPromptUploadStage = lastStageCompleted == 'UPLOAD_PAGE_LANDED';
  		const onPromptTransactionStage = lastStageCompleted == 'UPLOAD';
  		const onPromptTransactionConfirmationStage = lastStageCompleted == 'TX_UPLOAD';
  		return (
	  		<div>
	  			{(onUploadPage && onPromptUploadStage) ? <UploadGroup /> : <div></div>}
	  			{(onUploadPage && onPromptTransactionStage) ? <UploadTransaction /> : <div></div>}
	  			{(onUploadPage && onPromptTransactionConfirmationStage) ? <h3>Thank You!</h3> : <div></div>}
	  		</div>
  		)
  	}
}

