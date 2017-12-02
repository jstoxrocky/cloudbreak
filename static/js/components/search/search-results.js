import React from 'react';
import { connect } from "react-redux";
import { stream } from '../../actions/player-actions'


@connect(({search}) => {
	return {
		availableTracks: search.availableTracks,
	};
})
export default class SearchResults extends React.Component {

	handleStreamClick(trackHash) {
		this.props.dispatch(stream(trackHash));
	}

	render() {
		const {availableTracks} = this.props;
		const artist_class = false ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		const title_class = false ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		return (
			availableTracks.map((metadata) =>
			<div className='track-results' key={metadata.trackHash} onClick={() => this.handleStreamClick(metadata.trackHash)} className='track-item'>
				<a href='#'>
					<div className='row'>
						<div className='col-md-2'>
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
						</div>
						<div className='col-md-6'>
							<div className='artist'>Price per stream: <strong>2</strong></div>
						</div>
					</div>

				</a>
			</div>)
		)
	}
};
