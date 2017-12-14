import React from 'react';
import { connect } from "react-redux";
import Report from '../utils/report';
import CaptchaGroup from './captcha-group';
import CaptchaTransaction from './captcha-transaction'


@connect(({nav, captcha, msg}) => {
	return {
		msg: msg.captcha.value,
		currentPage: nav.currentPage,
		lastStageCompleted: captcha.currentStage,
	}
})
export default class Captcha extends React.Component {   

  	render() {
  		const {currentPage, lastStageCompleted, msg} = this.props;
  		const onCaptchaPage = currentPage == 'CAPTCHA';
  		const onPromptAnswerStage = lastStageCompleted == 'QUESTION';
  		const onPromptTransactionStage = lastStageCompleted == 'ANSWER';
  		const onPromptTransactionConfirmationStage = lastStageCompleted == 'TX_CAPTCHA';
  		return (
	  		<div>
	  			{(onCaptchaPage) ? <Report msg={msg} /> : <div></div>}
	  			{(onCaptchaPage && onPromptAnswerStage) ? <CaptchaGroup /> : <div></div>}
	  			{(onCaptchaPage && onPromptTransactionStage) ? <CaptchaTransaction /> : <div></div>}
	  			{(onCaptchaPage && onPromptTransactionConfirmationStage) ? <h3>Thank You!</h3> : <div></div>}
	  		</div>
  		)
  	}
}
