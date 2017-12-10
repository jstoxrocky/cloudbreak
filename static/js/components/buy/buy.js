import React from 'react';
import { connect } from "react-redux";
import Report from '../utils/report';
import BuyGroup from './buy-group';


@connect(({nav, buy}) => {
	return {
		currentPage: nav.currentStage,
		msg: buy.msg,
	}
})
export default class Buy extends React.Component {   

	render() {
  		const {currentPage, msg} = this.props;
  		const onBuyPage = currentPage == 'BUY';
  		return (
	  		<div>
	  			{(onBuyPage) ? <Report msg={msg} /> : <div></div>}
	  			{(onBuyPage) ? <BuyGroup /> : <div></div>}
	  		</div>
  		)
  	}
}


