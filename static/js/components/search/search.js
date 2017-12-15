import React from 'react';
import { connect } from "react-redux";
import SearchGroup from './search-group'
import Report from '../utils/report';

@connect(({search, nav, msg}) => {
	return {
		msg: msg.search.value,
		currentPage: nav.currentPage,
		availableTracks: search.availableTracks,
	};
})
export default class Search extends React.Component {

	handleStreamClick(trackHash) {
		this.props.dispatch(stream(trackHash));
	}

	render() {
		const {currentPage, availableTracks, msg} = this.props;
		const onSearchPage = currentPage == 'SEARCH';
		let hasResults = availableTracks.length > 0;
		return (
			<div className="container">
				{(onSearchPage) ? <Report msg={msg} /> : <div></div>}
				{(onSearchPage && hasResults) ? <SearchGroup /> : <div></div>}
			</div> 
		)
	}
};
