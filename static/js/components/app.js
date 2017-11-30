import React from 'react';
import SearchResults from './search-results'
import Message from './message'
// import Search from './search'
import Nav from './nav'
import NavPlayer from './nav-player'
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
			<NavPlayer />
		</div>
	)
};

export default App;

			// <Search />
			// <SearchResults />