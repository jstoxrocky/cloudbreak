import React from 'react';
import { connect } from "react-redux";
import InputWritesToStore from './input-writes-to-store';

@connect((store) => {
  return {
  };
})
export default class SignSmartBtns extends React.Component { 

  handleSubmit() {
    this.props.dispatch(this.props.data.dispatchSubmit(this.props.data.valueToSubmit, this.props.data.submitType))
  } 

  handleSign(valueToSign) {
    this.props.dispatch(this.props.data.dispatchSign(this.props.data.valueToSign, this.props.data.signType))
  } 

  render() {
      if (this.props.data.is_signed) {
      		return ( 
                <div>
                  <div className="row">
                    <div className='col-md-6 col-xs-6'>
                      <button onClick={() => this.handleSubmit()} className="btn btn-default">Submit</button>
                    </div>
                  </div>
                </div>
      		)
      } else {
          return (
              <div className='col-md-6 col-xs-6'>
                <button onClick={() => this.handleSign()} className="btn btn-default">Submit</button>
              </div>
          )
      }
  }
}


 // <InputWritesToStore dispatcher={this.props.data.dispatchInput} keytype={'txhash'} placeholder={'0x46fna9...'}/>

                  // <div className="row top-buffer">
                  //   <h3>Transaction Hash</h3>
                  // </div>
