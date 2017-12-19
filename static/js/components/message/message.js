import React from 'react';
import { connect } from "react-redux";
import MessageGroup from './message-group'

const BUY = 'BUY';
const CAPTCHA = 'CAPTCHA';
const ALLOWANCE = 'ALLOWANCE';
const PLAYER = 'PLAYER'
const SEARCH = 'SEARCH'
const UPLOAD = 'UPLOAD'

@connect(({msg, nav}) => {
    return {
    	msg:msg,
    	currentPage: nav.currentPage,
    };
})
export default class Message extends React.Component {

	getMessage() {
		const {currentPage, msg} = this.props;
		switch (currentPage) { 
	  		case BUY:
	  			return {
	  				value:msg.buy.value,
	  				visible:msg.buy.visible,
	  				level:msg.buy.level,
	  			}
	  		case CAPTCHA:
	  			return {
	  				value:msg.captcha.value,
	  				visible:msg.captcha.visible,
	  				level:msg.captcha.level,
	  			}
	  		case ALLOWANCE:
	  			return {
	  				value:msg.allowance.value,
	  				visible:msg.allowance.visible,
	  				level:msg.allowance.level,
	  			}
	  		case SEARCH:
	  			return {
	  				value:msg.search.value,
	  				visible:msg.search.visible,
	  				level:msg.search.level,
	  			}
	  		case UPLOAD:
	  			return {
	  				value:msg.upload.value ,
	  				visible:msg.upload.visible,
	  				level:msg.upload.level,
	  			}
	  		default:
	  			return {
	  				value:null,
	  				visible:false,
	  				level:null,
	  			}
	  	}
	}

	render() {	
  		let {value, visible, level} = this.getMessage()
		return (
			visible ? <MessageGroup msg={value} level={level}/>: <div></div>
		)
	}
};