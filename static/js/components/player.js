import React from 'react';
import { connect } from "react-redux";
import { updatePlayer } from '../actions/actions'


@connect(({stream}) => {
	return {
		artist: stream.artist,
		artistIsVerified: stream.artistIsVerified,
		title: stream.title,
		titleIsVerified: stream.titleIsVerified,
		currentTrack: stream.currentTrack,
	};
})
class Player extends React.Component {


	componentDidMount() {
		this.props.dispatch(updatePlayer());
	}		

	onTrackChange(source) {
       console.log(source)
	}

	render() {
		const {artist, artistIsVerified, title, titleIsVerified, currentTrack} = this.props;
		const artist_class = artistIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		const title_class = titleIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		if (this.refs.audio) {this.refs.audio.load()}
		return (
			<div className="now-playing col-md-6">
				<h5>{artist} <i className={artist_class} aria-hidden="true"></i></h5>
				<h3><strong>{title}</strong> <i className={title_class} aria-hidden="true"></i></h3> 
				<audio controls ref="audio" controlsList="nodownload" onChange={this.onTrackChange.bind(this)}>
   					<source src={'https://gateway.ipfs.io/ipfs/'+currentTrack} type="audio/mp3" />
				</audio>
			</div>
		)
	}
};

export default Player;

