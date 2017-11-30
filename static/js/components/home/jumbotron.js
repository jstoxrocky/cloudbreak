import React from 'react';
import { connect } from "react-redux";

@connect((store) => {
	return {
	};
})
class Jumbotron extends React.Component {  
	render() {
		return (
			<div className="jumbotron jumbotron-fluid">
		        <div className="container text-white text-center">
		            <h1 className="display-3">CloudBreak</h1>
		            <p className="lead">Pay-per-play streaming, User-uploaded-content, Token reward for CAPTCHA completed metadata </p>
		        </div>
		    </div>
		)
	}
}

export default Jumbotron;

