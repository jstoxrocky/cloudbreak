import React from 'react';
import { connect } from "react-redux";
import { submitStream } from '../../actions/player-actions'


@connect(({search}) => {
	return {
		availableTracks: search.availableTracks,
	};
})
export default class SearchResults extends React.Component {

	handleStreamClick(trackHash) {
		this.props.dispatch(submitStream(trackHash));
	}

	render() {
		const {availableTracks} = this.props;
		return (
			availableTracks.map((metadata) => {
				let artist_class = metadata.artist.is_verified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
				let title_class = metadata.title.is_verified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
				return (
					<a href='#' key={metadata.keccak_hash}>
						<div className='track-results' onClick={() => this.handleStreamClick(metadata.keccak_hash)} className='track-item'>
							<div className='row'>
								<div className='col-md-2'>
									<div className='row'>
										<div className='col'>
											<div className='artist'>
												{metadata.artist.value} <i className={artist_class} aria-hidden="true"></i>
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col'>
											<div className='title'>
												{metadata.title.value} <i className={title_class} aria-hidden="true"></i>
											</div>
										</div>
									</div>
								</div>
							</div>	
						</div>
					</a>)
			})
		)
	}
};
