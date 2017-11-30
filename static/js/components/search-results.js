import React from 'react';
import { connect } from "react-redux";
import { stream } from '../actions/player-actions'


@connect(({search}) => {
	return {
		availableTracks: search.availableTracks,
	};
})
class SearchResults extends React.Component {

	handleStreamClick(trackHash) {
		this.props.dispatch(stream(trackHash));
	}

	render() {
		const {availableTracks} = this.props;
		const artist_class = false ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		const title_class = false ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		const searchResults = availableTracks.map((metadata) =>
			<div className='track-results' key={metadata.trackHash} onClick={() => this.handleStreamClick(metadata.trackHash)} className='track-item'>
				<a href='#'>
					<div className='row'>
						<div className='col'>
							<div className='artist'>
								{metadata.artist} <i className={artist_class} aria-hidden="true"></i>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className='title'>
								{metadata.title} <i className={artist_class} aria-hidden="true"></i>
							</div>
						</div>
					</div>
				</a>
			</div>
		);

		return (
			<div>
				<h3>{(searchResults.length > 0) ? "Results": ""}</h3>
				{searchResults}
			</div> 
		)
	}
};

export default SearchResults;
