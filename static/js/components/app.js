import React from 'react';
import Nav from './nav/nav'
import Player from './player/player'
import Captcha from './captcha/captcha'
import Home from './home/home'
import Upload from './upload/upload'
import Search from './search/search'
import Buy from './buy/buy'
import Approve from './approve/approve'

const App = () => {
	return (
		<div>
			<Nav />
			<Home />
			<Captcha />
			<Upload />
			<Search />
			<Buy />
			<Approve />
			<Player />
		</div>
	)
};

export default App;