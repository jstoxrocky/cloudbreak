import React from 'react';
import TokensBalance from './tokens-balance'
import Player from './player'
import SearchResults from './search-results'
import Message from './message'
import Search from './search'

const App = () => {
	return (
		<div className="container">
			<h1 className='site-title'>CloudBreak Player</h1>
			<TokensBalance />
			<Player />
			<Message />
			<Search />
			<SearchResults />
		</div>
	)
};

export default App;