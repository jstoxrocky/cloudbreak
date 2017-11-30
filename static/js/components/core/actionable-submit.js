import React from 'react';
import { connect } from "react-redux";

@connect((store) => {
    return {};
})
export default class ActionableSubmit extends React.Component { 

    handleSubmit() {
        this.props.dispatch(this.props.action(this.props.data))
    } 

    render() {
    	return ( 
            <div className="row">
                <div className='col-md-6 col-xs-6'>
                    <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Submit</button>
                </div>
            </div>
    	)
    }
}