import React from 'react';
import { connect } from "react-redux";
import { search } from "../../actions/player-actions"
import { navClick } from "../../actions/nav-actions"

@connect((store) => {
	return {};
})
export default class SearchBar extends React.Component {  

	componentDidMount() {
        this.handleSearch.bind(this)
    }   

	handleSearch(e) {
		e.preventDefault()
		this.props.dispatch(search(this.refs.input.value))
		this.props.dispatch(navClick("HOME"))
	}

	render() {

		return (	
			<form className="form-inline my-1 my-lg-0">
            	<input ref='input' className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            	<button onClick={(e) => this.handleSearch(e)} className="btn btn-outline-success my-2 my-sm-0">Search</button>
			</form>
		)
	}
}