import React from 'react';
import SearchResults from './search-results'
import Message from './message'
import Nav from './nav'
import NavPlayer from './nav-player'
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
			<SearchResults />
			<NavPlayer />
		</div>
	)
};

export default App;