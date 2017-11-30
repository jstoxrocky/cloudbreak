import Artist from './artist';
import React from 'react';
import { connect } from "react-redux";

@connect((store) => {
	return {
		artists: store.search.matching_artists,
	};
})
export default class MatchingArtists extends React.Component {    
  	render() {
  		const {artists} = this.props;
  		var newArtists = artists.map((d) => <Artist key={d.id} artist={d.artist} />);
  		if (artists.length) {
			return ( 
				<div className="container">
					<div>Artists:</div>
					{newArtists}
				</div>
			)
    	} else {
    		return (
    			<div className="container">
					<div>Artists:</div>
					No results
				</div>
    		)
    	}
  	}
}


