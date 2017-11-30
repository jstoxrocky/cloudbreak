import React from 'react';

export default class Artist extends React.Component {  
	render() {
		return (
			<div className='artist_result'>
				<div className='row'>
					<div className='col'>
						<p className='lone_artist'>
							{this.props.artist}
						</p>
					</div>
				</div>
			</div>
		)
	}
}