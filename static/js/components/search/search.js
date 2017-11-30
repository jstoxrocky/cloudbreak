import React from 'react';
import { connect } from "react-redux";
import Report from '../report';
import SearchGroup from './search-group';


@connect(({nav, captcha}) => {
	return {
		currentStage: nav.currentStage,
	}
})
export default class Search extends React.Component {   

  	render() {
  		const {currentStage} = this.props;
  		const visible = currentStage == 'SEARCH';
  		return (
	  		<div>
	  			{(visible) ? <SearchGroup /> : <div></div>}
	  		</div>
  		)
  	}
}