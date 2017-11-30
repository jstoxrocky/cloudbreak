import React from 'react';
import MatchingArtists from './matching-artists';
import MatchingTracks from './matching-tracks';
import { connect } from "react-redux";

@connect(({ nav, search }) => {
	return {
	};
})
export default class SearchGroup extends React.Component {    
  	render() {
		return ( 
			<div>
				<MatchingTracks />
				<MatchingArtists />
			</div>
		)
  	}
}