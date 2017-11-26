import React from 'react';
import TokensBalance from './tokens-balance'
import CurrentTrack from './current-track'
import Address from './address'
import Stream from './stream'
import Radio from './radio'

const App = () => {
	return (
		<div className="container">
			<h1 className='site-title'>CloudBreak Player</h1>
			<Address />
			<TokensBalance />
			<CurrentTrack />
			<Radio />
			<Stream />
		</div>
	)
};

export default App;