import React from 'react';

class Track extends React.Component {  
	render() {
		if (this.props.artist_is_verified == 'true') {
			var artist_class = 'fa fa-check-circle-o verified'
		} else {
			var artist_class = 'unverified'
		}
		if (this.props.title_is_verified == 'true') {
			var title_class = 'fa fa-check-circle-o verified'
		} else {
			var title_class = 'unverified'
		}
		var src = "/track?filename=".concat(this.props.hash);
		return (
			<div className='track_result'>
				<div className='row'>
					<div className='col'>
						<p className='artist'>
							{this.props.artist} <i className={artist_class} aria-hidden="true"></i>
						</p>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<p className='title'>
							{this.props.title} <i className={title_class}  aria-hidden="true"></i>
						</p>
					</div>
					<div className='col'>
						<audio controls controlsList="nodownload">
				    		<source src={src} type="audio/mp3" />
						</audio>
					</div>
				</div>
			</div>
		)
	}
}

export default Track;