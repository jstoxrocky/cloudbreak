import React from 'react';
import { connect } from "react-redux";
import AllowanceGroup from './allowance-group';


@connect(({nav}) => {
	return {
		currentPage: nav.currentPage,
	}
})
export default class Allowance extends React.Component {   

	render() {
  		const {currentPage} = this.props;
  		const onAllowancePage = currentPage == 'ALLOWANCE';
  		return (
	  		(onAllowancePage) ? <AllowanceGroup /> : <div></div>
  		)
  	}
}


