import React from 'react';

const MessageGroup = ({msg, level}) => (
	<div className="container">
		<div className="row top-buffer">
			<div className={level + ' alert'} >{msg}</div>
		</div>
	</div>
);

export default MessageGroup;