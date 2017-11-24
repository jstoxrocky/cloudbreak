import React from 'react';
import BalanceETH from './balance-eth'
import BalanceTokens from './balance-tokens'
import CurrentTrack from './current-track'

const App = () => {
	return (
		<div>
			<h1>CloudBreak Player</h1>
			<BalanceETH />
			<BalanceTokens />
			<CurrentTrack />
		</div>
	)
};

export default App;