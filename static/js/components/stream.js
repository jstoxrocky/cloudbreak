import React from 'react';
import { connect } from "react-redux";
import { stream } from '../actions/actions'

@connect(({stream, radio}) => {
	return {
		txSuccess: stream.txSuccess,
		selectedOption: radio.selectedOption,
	};
})
class Stream extends React.Component {


	handleStreamClick() {
		this.props.dispatch(stream(this.props.selectedOption));
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