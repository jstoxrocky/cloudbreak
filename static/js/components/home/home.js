import React from 'react';
import { connect } from "react-redux";
import Jumbotron from './jumbotron'

@connect(({nav}) => {
	return {
		currentStage: nav.currentStage,
	};
})
class Home extends React.Component {  
	render() {
		const {currentStage} = this.props;
		const visible = currentStage == 'HOME';
		return (
			<div>
	  			{(visible) ? <Jumbotron /> : <div></div>}
	  		</div>
  		)
	}
}

export default Home;

