import React from 'react';
import { connect } from "react-redux";
import Report from '../utils/report';
import ApproveGroup from './approve-group';


@connect(({nav, approve, msg}) => {
	return {
		currentPage: nav.currentPage,
		msg: msg.approve.value,
	}
})
export default class Buy extends React.Component {   

	render() {
  		const {currentPage, msg} = this.props;
  		const onApprovePage = currentPage == 'APPROVE';
  		return (
	  		<div>
	  			{(onApprovePage) ? <Report msg={msg} /> : <div></div>}
	  			{(onApprovePage) ? <ApproveGroup /> : <div></div>}
	  		</div>
  		)
  	}
}


