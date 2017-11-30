import React from 'react';
import { connect } from "react-redux";

@connect((store) => {
	return {};
})
export default class ActionableInput extends React.Component {  

	onInput() {
		const {action} = this.props;
		this.props.dispatch(action(this.refs.input.value))
	}

	render() {
		const {placeholder} = this.props;
		return (
            <div className="input-group">
                <input onChange={this.onInput.bind(this)} ref='input' type="text" className="form-control" placeholder={placeholder}></input>
            </div>
		)
	}
}