import React from 'react';
import { connect } from "react-redux";
import { dbCall } from '../actions/player-actions'

@connect(({stream}) => {
	return {
	};
})
class Message extends React.Component {


	handleSearch() {
		this.props.dispatch(dbCall())
	}


	render() {
		const {msg} = this.props;
		return (
			<div className="row">
				<div className="col-md-6">
					<div className="input-group">
						<input ref="search" type="text" className="form-control" placeholder="Frank Ocean..." />
						<span className="input-group-btn">
							<button className="btn btn-secondary" type="button" onClick={this.handleSearch.bind(this)}>Search</button>
						</span>
					</div>
				</div>
			</div>
		)
	}
};

export default Message;