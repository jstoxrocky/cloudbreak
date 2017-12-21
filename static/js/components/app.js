import React from 'react';
import Nav from './nav/nav'
import Player from './player/player'
import Captcha from './captcha/captcha'
import Home from './home/home'
import Upload from './upload/upload'
import Search from './search/search'
import Buy from './buy/buy'
import Allowance from './allowance/allowance'
import Message from './message/message'
import PlayerMessage from './message/player-message'

const App = () => {
	return (
		<div>
			<Nav />
			<PlayerMessage />
			<Home />
			<Message />
			<Captcha />
			<Upload />
			<Search />
			<Buy />
			<Allowance />
			<Player />
		</div>
	)
};

export default App;