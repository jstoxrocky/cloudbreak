import React from 'react';
import { connect } from "react-redux";
import {getCurrentTrack} from '../actions/actions'


var web3 = new Web3(Web3.givenProvider);


@connect(({stream}) => {
	return {
		artist: stream.artist,
		artistIsVerified: stream.artistIsVerified,
		title: stream.title,
		titleIsVerified: stream.titleIsVerified,
		currentTrack: stream.currentTrack,
	};
})
class CurrentTrack extends React.Component {


	componentDidMount() {
		this.props.dispatch(getCurrentTrack());
	}		

	render() {
		const {artist, artistIsVerified, title, titleIsVerified} = this.props;
		const artist_class = artistIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		const title_class = titleIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		return (
			<div className="now-playing col-md-6">
				<h5>{artist} <i className={artist_class} aria-hidden="true"></i></h5>
				<h3><strong>{title}</strong> <i className={title_class} aria-hidden="true"></i></h3> 

			</div>
		)
	}
};

export default CurrentTrack;

				// <audio controls ref="audio" controlsList="nodownload">
   	// 				<source src={'https://gateway.ipfs.io/ipfs/'+this.props.isPlaying} type="audio/mp3" />
				// </audio>