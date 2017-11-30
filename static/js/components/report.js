import React from 'react';
import { connect } from "react-redux";
import Message from './core/message';


@connect((store) => {
	return {
	};
})
export default class Report extends React.Component {   

  	render() {
  		const { msg } = this.props;
		return ( 
			<Message msg={msg} alert_level='alert-danger' />
		)
  	}
}
