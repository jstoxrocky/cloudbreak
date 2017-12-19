import React from 'react';
import { connect } from "react-redux";
import BuyGroup from './buy-group';


@connect(({nav, buy, msg}) => {
	return {
		currentPage: nav.currentPage,
	}
})
export default class Buy extends React.Component {   

	render() {
  		const {currentPage, msg, msgIsVisible} = this.props;
  		const onBuyPage = currentPage == 'BUY';
  		return (
	  		(onBuyPage) ? <BuyGroup /> : <div></div>
  		)
  	}
}


