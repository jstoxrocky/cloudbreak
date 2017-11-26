import React from 'react';
import TokensBalance from './tokens-balance'
import CurrentTrack from './current-track'
import Address from './address'
import Stream from './stream'

const App = () => {
	return (
		<div className="container">
			<h1 className='site-title'>CloudBreak Player</h1>
			<Address />
			<TokensBalance />
			<CurrentTrack />
			<Stream />
		</div>
	)
};

export default App;