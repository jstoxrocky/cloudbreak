import React from 'react';
import TokensBalance from './tokens-balance'
import Player from './player'
import SearchResults from './search-results'
import Message from './message'
// import Search from './search'
import Nav from './nav'
// import Search from './search/search'
import Captcha from './captcha/captcha'
import Home from './home/home'
import Upload from './upload/upload'

const App = () => {
	return (
		<div>
			<Nav />
			<Home />
			<Captcha />
			<Upload />
		</div>
	)
};

export default App;

			// <h1 className='site-title'>CloudBreak Player</h1>
			// <TokensBalance />
			// <Player />
			// <Message />
			// <Search />
			// <SearchResults />