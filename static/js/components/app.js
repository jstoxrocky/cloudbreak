import React from 'react';
import TokensBalance from './tokens-balance'
import Player from './player'
import Stream from './stream'
import SearchResults from './search-results'

const App = () => {
	return (
		<div className="container">
			<h1 className='site-title'>CloudBreak Player</h1>
			<TokensBalance />
			<Player />
			<SearchResults />
			<Stream />
		</div>
	)
};

export default App;