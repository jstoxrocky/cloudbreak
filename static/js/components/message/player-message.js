import React from 'react';
import { connect } from "react-redux";
import MessageGroup from './message-group'

@connect(({msg}) => {
    return {
		value:msg.player.value,
		visible:msg.player.visible,
		level:msg.player.level,
    };
})
export default class PlayerMessage extends React.Component {
	render() {	
		const {value, visible, level} = this.props;
		return (
			visible ? <MessageGroup msg={value} level={level}/>: <div></div>
		)
	}
};