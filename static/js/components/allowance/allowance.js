import React from 'react';
import { connect } from "react-redux";
import Report from '../utils/report';
import AllowanceGroup from './allowance-group';


@connect(({nav, approve, msg}) => {
	return {
		currentPage: nav.currentPage,
		msg: msg.approve.value,
	}
})
export default class Allowance extends React.Component {   

	render() {
  		const {currentPage, msg} = this.props;
  		const onAllowancePage = currentPage == 'ALLOWANCE';
  		return (
	  		<div>
	  			{(onAllowancePage) ? <Report msg={msg} /> : <div></div>}
	  			{(onAllowancePage) ? <AllowanceGroup /> : <div></div>}
	  		</div>
  		)
  	}
}


