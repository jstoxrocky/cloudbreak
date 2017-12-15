import React from 'react';
import { connect } from "react-redux";
import { navClick } from "../../actions/nav-actions"
import { getCaptcha } from "../../actions/captcha-actions"
import { getUpload } from "../../actions/upload-actions"
import SearchBar from "./nav-search"
import { 
    NAV_CAPTCHA, 
    NAV_UPLOAD,
    NAV_HOME, 
    NAV_BUY,
    NAV_ALLOWANCE,} from '../../actions/nav-actions';

@connect(({stream, balance}) => {
	return {
        userBalance: balance.userBalance,
        serviceAllowance: balance.serviceAllowance,
    };
})
export default class Nav extends React.Component {    

	handleCaptchaClick() {
        this.props.dispatch(navClick(NAV_CAPTCHA))
        this.props.dispatch(getCaptcha())
  	}

  	handleUploadClick() {
  		this.props.dispatch(navClick(NAV_UPLOAD))
      this.props.dispatch(getUpload())
  	}

    handleHomeClick() {
        this.props.dispatch(navClick(NAV_HOME))
    }

    handleBuyClick() {
        this.props.dispatch(navClick(NAV_BUY))
    }

    handleApproveClick() {
        this.props.dispatch(navClick(NAV_ALLOWANCE))
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
                    <span className="token-balance navbar-text"><strong>{serviceAllowance}</strong>/{userBalance} Tokens</span>
                    <SearchBar />
                </div>
            </div>
		)
  	}
}

