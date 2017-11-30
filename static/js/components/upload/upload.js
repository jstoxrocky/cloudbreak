import React from 'react';
import { connect } from "react-redux";
import Report from '../utils/report';
import UploadGroup from './upload-group';
import UploadTransaction from './upload-transaction'


@connect(({nav, upload}) => {
	return {
		msg: upload.msg,
		currentPage: nav.currentStage,
		lastStageCompleted: upload.currentStage,
	}
})
export default class Upload extends React.Component {   

	render() {
  		const {currentPage, lastStageCompleted, msg} = this.props;
  		const onUploadPage = currentPage == 'UPLOAD';
  		const onPromptUploadStage = lastStageCompleted == 'UPLOAD_PAGE_LANDED';
  		const onPromptTransactionStage = lastStageCompleted == 'UPLOAD';
  		const onPromptTransactionConfirmationStage = lastStageCompleted == 'TX_UPLOAD';
  		return (
	  		<div>
	  			{(onUploadPage) ? <Report msg={msg} /> : <div></div>}
	  			{(onUploadPage && onPromptUploadStage) ? <UploadGroup /> : <div></div>}
	  			{(onUploadPage && onPromptTransactionStage) ? <UploadTransaction /> : <div></div>}
	  			{(onUploadPage && onPromptTransactionConfirmationStage) ? <h3>Thank You!</h3> : <div></div>}
	  		</div>
  		)
  	}
}

