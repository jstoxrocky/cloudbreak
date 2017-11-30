import React from 'react';
import Nav from './nav/nav'
import NavPlayer from './nav/nav-player'
import Captcha from './captcha/captcha'
import Home from './home/home'
import Upload from './upload/upload'
import Search from './search/search'

const App = () => {
	return (
		<div>
			<Nav />
			<Home />
			<Captcha />
			<Upload />
			<Search />
			<NavPlayer />
		</div>
	)
};

export default App;