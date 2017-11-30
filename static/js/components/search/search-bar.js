import React from 'react';
import { connect } from "react-redux";
import { search } from "../../actions/player-actions"
import { navClick } from "../../actions/nav-actions"

@connect((store) => {
	return {};
})
export default class SearchBar extends React.Component {  

	handleSearch() {
		this.props.dispatch(search(this.refs.input.value))
	}

	render() {
		return (	
			<div>
            	<input ref='input' className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            	<button onClick={this.handleSearch.bind(this)} className="btn btn-outline-success my-2 my-sm-0">Search</button>
			</div>
		)
	}
}