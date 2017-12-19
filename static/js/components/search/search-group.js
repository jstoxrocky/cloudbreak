import React from 'react';
import { connect } from "react-redux";
import SearchResults from './search-results'


@connect((store) => {
	return {
	};
})
export default class SearchGroup extends React.Component {

	render() {
		return (
			<div className="container">
				<h3>Top Results</h3>
				<SearchResults />
			</div>
		)
	}
};
