import Track from './track';
import React from 'react';
import { connect } from "react-redux";

@connect((store) => {
	return {
		tracks: store.search.matching_tracks,
	};
})
export default class MatchingTracks extends React.Component {    
  	render() {
  		const {tracks} = this.props;
  		var newTracks = tracks.map((d) => <Track key={d.hash} hash={d.hash} artist={d.artist.value} title={d.title.value} artist_is_verified={d.artist.is_verified} title_is_verified={d.title.is_verified} />);
  		if (tracks.length) {
			return ( 
				<div className="container">
					<div>Tracks:</div>
					{newTracks}
				</div>
			)
    	} else {
    		return (
    			<div className="container">
					<div>Tracks:</div>
					No results
				</div>
    		)
    	}
  	}
}


