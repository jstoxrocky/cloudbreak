import React from 'react';
import { connect } from "react-redux";
import Jumbotron from './jumbotron'
import Explanation from './explanation'

@connect(({nav}) => {
	return {
		currentPage: nav.currentPage,
	};
})
class Home extends React.Component {  

	render() {
		const {currentPage} = this.props;
		const visible = currentPage == 'HOME';
		return (
			<div>
	  			{(visible) ? <Jumbotron /> : <div></div>}
	  			{(visible) ? <Explanation /> : <div></div>}
	  		</div>
  		)
	}
}

export default Home;

