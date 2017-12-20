import React from 'react';
import { connect } from "react-redux";
import BuyGroup from './buy-group';


@connect(({nav}) => {
	return {
		currentPage: nav.currentPage,
	}
})
export default class Buy extends React.Component {   

	render() {
  		const {currentPage} = this.props;
  		const onBuyPage = currentPage == 'BUY';
  		return (
	  		(onBuyPage) ? <BuyGroup /> : <div></div>
  		)
  	}
}


