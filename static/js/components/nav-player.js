import React from 'react';
import { connect } from "react-redux";
import { updatePlayer } from '../actions/player-actions'

@connect(({stream}) => {
    return {
        artist: stream.artist,
        artistIsVerified: stream.artistIsVerified,
        title: stream.title,
        titleIsVerified: stream.titleIsVerified,
        currentTrack: stream.currentTrack,
        userBalance: stream.userBalance,
        trackBalance: stream.trackBalance,
        playCount: stream.playCount,
    };
})
export default class NavPlayer extends React.Component {    

    componentDidMount() {
        this.props.dispatch(updatePlayer());
    }       

  	render() {
        const {artist, artistIsVerified, title, titleIsVerified, currentTrack, userBalance, trackBalance, playCount} = this.props;
        const artist_class = artistIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
        const title_class = titleIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		if (this.refs.audio) {this.refs.audio.load()}
        return ( 
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-md-2">
                            <div className="row">
                                <p className='footer-artist'>{artist} <i className={artist_class} aria-hidden="true"></i></p>
                            </div>
                            <div className="row">
                                <p className='footer-title'><strong>{title}</strong> <i className={title_class} aria-hidden="true"></i></p> 
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="footer-audio">
                                <audio controls ref="audio" controlsList="nodownload">
                                    <source src={'https://gateway.ipfs.io/ipfs/'+currentTrack} type="audio/mp3" />
                                </audio>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="footer-balance">
                                <p className='user-balance'>You: {userBalance}</p>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="footer-audio">
                                <p className='user-balance'>Track: {trackBalance}</p>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="footer-audio">
                                <p className='user-balance'>Streams: {playCount}</p>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </footer>
		)
  	}
}

