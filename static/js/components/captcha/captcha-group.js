import React from 'react';
import { connect } from "react-redux";
import CaptchaItem from './captcha-item'
import { submitCaptcha, inputCaptchaValue1, inputCaptchaValue2 } from '../../actions/captcha-actions'
import ActionableSubmit from '../core/actionable-submit'

@connect(({captcha}) => {
	return {
    	captchaKey: captcha.data.captcha_key,
    	submission: captcha.submission,
	};
})
export default class CaptchaGroup extends React.Component {   

  	render() {
  		const {captchaKey, submission} = this.props;	
		return ( 
			<div className="container">
				<div className="row top-buffer">
					<h3>Please identify the <strong>{captchaKey}</strong> of the follow tracks.</h3>
				</div>
				<div className="row top-buffer">
					<CaptchaItem title='Track 1' action={inputCaptchaValue1} placeholder={captchaKey} src="http://localhost:5000/track?filename=track_1" />
					<CaptchaItem title='Track 2' action={inputCaptchaValue2} placeholder={captchaKey} src="http://localhost:5000/track?filename=track_2" />
				</div>
				<div className="row top-buffer">
					<ActionableSubmit action={submitCaptcha} data={submission} />
				</div>
			</div>
		)
  	}
}