import React from 'react';
import { connect } from "react-redux";
import ActionableInput from '../core/actionable-input'

@connect((store) => {
	return {};
})
export default class CaptchaItem extends React.Component {    
  	render() {
  		const { title, src, action, placeholder} = this.props;
		return ( 
			<div className="col-md-6">
				<div className="col-md-9 captcha-square">
					<h3>{title}</h3>
					<audio controls controlsList="nodownload">
			    		<source src={src} type="audio/mp3" />
					</audio>
					<ActionableInput action={action} placeholder={placeholder}/>
				</div>
			</div>
		)
  	}
}