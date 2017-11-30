import React from 'react';
import { connect } from "react-redux";

@connect(({stream}) => {
	return {
		msg: stream.msg,
	};
})
class Message extends React.Component {

	render() {
		const {msg} = this.props;
		return (
			<div className="alert alert-info col-md-6" role="alert">{msg}</div>
		)
	}
};

export default Message;