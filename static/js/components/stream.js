import React from 'react';
import { connect } from "react-redux";
import { stream } from '../actions/actions'

@connect(({stream}) => {
	return {
		txSuccess: stream.txSuccess,
	};
})
class Stream extends React.Component {


	handleStreamClick() {
		this.props.dispatch(stream());
	}

	render() {
		const {txSuccess} = this.props;
		let msg = txSuccess ? "": "Error"
		return (
			<div>
				<button onClick={this.handleStreamClick.bind(this)} className='btn btn-primary'>Stream</button>
				<p>{msg}</p>
			</div>
		)
	}
};

export default Stream;