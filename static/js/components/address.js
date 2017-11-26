import React from 'react';
import { connect } from "react-redux";
import { getUserAddress } from '../actions/actions'

@connect(({user}) => {
	return {
		address: user.address,
	};
})
class Address extends React.Component {

	componentDidMount() {
		this.props.dispatch(getUserAddress());
	}

	render() {
		return (
			<div></div>
		)
	}
};

export default Address;