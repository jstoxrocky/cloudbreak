import React from 'react';
import { connect } from "react-redux";
import { getSearch } from "../../actions/search-actions"
import { navClick } from "../../actions/nav-actions"

@connect((store) => {
	return {};
})
export default class SearchBar extends React.Component {  

	getInputValue() {
    	return this.refs.input.value
  	}

	handleClick(e) {
		e.preventDefault()
		var query = this.getInputValue();
		this.props.dispatch(getSearch(query))
		this.props.dispatch(navClick("SEARCH_CLICK"))
	}

	render() {
		return (	
			<form className="form-inline my-1 my-lg-0">
                <input ref='input' className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button onClick={(e) => this.handleClick(e)} className="btn btn-outline-success my-2 my-sm-0">Search</button>
            </form>
		)
	}
}