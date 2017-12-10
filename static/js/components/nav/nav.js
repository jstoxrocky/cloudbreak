import React from 'react';
import { connect } from "react-redux";
import { navClick } from "../../actions/nav-actions"
import { getCaptcha } from "../../actions/captcha-actions"
import { getUpload } from "../../actions/upload-actions"
import SearchBar from "./nav-search"

@connect(({stream}) => {
	return {
        userBalance: stream.userBalance,
        serviceAllowance: stream.serviceAllowance,
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

    handleBuyClick() {
        this.props.dispatch(navClick("BUY"))
    }

    handleApproveClick() {
        this.props.dispatch(navClick("APPROVE"))
    }
    

  	render() {
        const {userBalance, serviceAllowance} = this.props;
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
                            <a className="nav-link" href='#' onClick={() => this.handleBuyClick()}>Buy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='#' onClick={() => this.handleCaptchaClick()}>Earn</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='#' onClick={() => this.handleApproveClick()}>Approve</a>
                        </li>
                    </ul>
                    <span className="token-balance navbar-text">Tokens: {userBalance}</span>
                    <span className="token-balance navbar-text">Service: {serviceAllowance}</span>
                    <SearchBar />
                </div>
            </div>
		)
  	}
}

