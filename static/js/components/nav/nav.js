import React from 'react';
import { connect } from "react-redux";
import { navClick } from "../../actions/nav-actions"
import { getCaptcha } from "../../actions/captcha-actions"
import { getUpload } from "../../actions/upload-actions"
import SearchBar from "./nav-search"

@connect(({stream}) => {
	return {
        userBalance: stream.userBalance,
    };
})
export default class Nav extends React.Component {    

	handleCaptchaClick() {
        this.props.dispatch(navClick("CAPTCHA"))
        this.props.dispatch(getCaptcha())
  	}

  	handleUploadClick() {
  		this.props.dispatch(navClick("UPLOAD"))
      this.props.dispatch(getUpload())
  	}

    handleHomeClick() {
        this.props.dispatch(navClick("HOME"))
    }
    

  	render() {
        const {userBalance} = this.props;
		return ( 
            <div id="nav-btns" className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href='#' onClick={() => this.handleHomeClick()}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => this.handleUploadClick()}>Upload</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='#' onClick={() => this.handleCaptchaClick()}>CAPTCHA</a>
                        </li>
                    </ul>
                    <span className="token-balance navbar-text">Tokens: {userBalance}</span>
                    <SearchBar />
                </div>
            </div>
		)
  	}
}

